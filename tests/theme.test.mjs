import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import vm from 'node:vm'
import ts from 'typescript'

const key = 'vinith-portfolio-theme'
const bootstrap = readFileSync(new URL('../index.html', import.meta.url), 'utf8').match(/<script>([\s\S]*?)<\/script>/)[1]
const source = ts.transpileModule(readFileSync(new URL('../src/lib/theme.ts', import.meta.url), 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText

function page({ dark = false, saved = null, blockedStorage = false } = {}) {
  const values = new Map(saved === null ? [] : [[key, saved]])
  const listeners = new Map()
  const mediaListeners = new Set()
  const root = { dataset: {}, style: {} }
  const meta = {}
  const storage = {
    getItem(name) {
      if (blockedStorage) throw new Error('Storage disabled')
      return values.get(name) ?? null
    },
    setItem(name, value) {
      if (blockedStorage) throw new Error('Storage disabled')
      values.set(name, value)
    },
  }
  const media = {
    matches: dark,
    addEventListener: (_, callback) => mediaListeners.add(callback),
    removeEventListener: (_, callback) => mediaListeners.delete(callback),
  }
  const window = {
    localStorage: storage,
    matchMedia: () => media,
    addEventListener(name, callback) {
      if (!listeners.has(name)) listeners.set(name, new Set())
      listeners.get(name).add(callback)
    },
    removeEventListener: (name, callback) => listeners.get(name)?.delete(callback),
    dispatchEvent: (event) => listeners.get(event.type)?.forEach((callback) => callback(event)),
  }
  let unsubscribe
  const exports = {}
  const context = vm.createContext({
    window,
    document: { documentElement: root, querySelector: () => ({ setAttribute: (name, value) => { meta[name] = value } }) },
    localStorage: storage,
    matchMedia: window.matchMedia,
    Event: class { constructor(type) { this.type = type } },
    exports,
    require: () => ({
      useSyncExternalStore(subscribe, snapshot) {
        unsubscribe ??= subscribe(() => {})
        return snapshot()
      },
    }),
  })
  vm.runInContext(bootstrap, context)
  const initial = root.dataset.theme
  vm.runInContext(source, context)
  return {
    initial,
    theme: () => exports.useTheme().theme,
    toggle: () => exports.useTheme().toggleTheme(),
    system(value) {
      media.matches = value
      mediaListeners.forEach((callback) => callback({ matches: value }))
    },
    otherTab(value) {
      if (value === null) values.delete(key)
      else values.set(key, value)
      window.dispatchEvent({ type: 'storage', key })
    },
    saved: () => values.get(key),
    meta,
    unmount() {
      unsubscribe()
      assert.equal(mediaListeners.size, 0)
      for (const callbacks of listeners.values()) assert.equal(callbacks.size, 0)
    },
  }
}

test('system preference sets the initial theme before React and follows changes', () => {
  for (const dark of [true, false]) {
    const app = page({ dark })
    assert.equal(app.initial, dark ? 'dark' : 'light')
    assert.equal(app.theme(), dark ? 'dark' : 'light')
    app.system(!dark)
    assert.equal(app.theme(), dark ? 'light' : 'dark')
    app.unmount()
  }
})

test('manual choice persists across reloads and takes priority over the system', () => {
  const app = page()
  app.toggle()
  assert.equal(app.theme(), 'dark')
  assert.equal(app.saved(), 'dark')
  assert.equal(app.meta.content, '#000000')
  app.system(true)
  app.system(false)
  assert.equal(app.theme(), 'dark')
  const reloaded = page({ saved: app.saved() })
  assert.equal(reloaded.initial, 'dark')
  reloaded.toggle()
  assert.equal(reloaded.theme(), 'light')
  assert.equal(reloaded.meta.content, '#ffffff')
  app.unmount()
  reloaded.unmount()
})

test('other tabs synchronize a saved choice, and clearing it resumes system mode', () => {
  const app = page({ saved: 'dark' })
  assert.equal(app.theme(), 'dark')
  app.otherTab('light')
  assert.equal(app.theme(), 'light')
  app.system(true)
  assert.equal(app.theme(), 'light')
  app.otherTab(null)
  assert.equal(app.theme(), 'dark')
  app.system(false)
  assert.equal(app.theme(), 'light')
  app.unmount()
})

test('invalid or blocked storage does not break detection or manual toggling', () => {
  assert.equal(page({ dark: true, saved: 'invalid' }).initial, 'dark')
  const app = page({ dark: true, blockedStorage: true })
  assert.equal(app.initial, 'dark')
  app.toggle()
  assert.equal(app.theme(), 'light')
  app.system(false)
  app.system(true)
  assert.equal(app.theme(), 'light')
  app.unmount()
})
