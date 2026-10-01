import { useSyncExternalStore } from 'react'

type Theme = 'light' | 'dark'
const STORAGE_KEY = 'vinith-portfolio-theme'
const CHANGE_EVENT = 'portfolio-theme-change'
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')

function savedTheme(): Theme | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY)
    return value === 'light' || value === 'dark' ? value : null
  } catch {
    return null
  }
}

let preference = savedTheme()

function applyTheme() {
  const theme = preference ?? (systemTheme.matches ? 'dark' : 'light')
  document.documentElement.dataset.theme = theme
  document.documentElement.style.colorScheme = theme
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#000000' : '#ffffff')
}

function snapshot(): Theme {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
}

function subscribe(notify: () => void) {
  const onSystemChange = () => {
    if (preference !== null) return
    applyTheme()
    notify()
  }
  const onStorage = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY && event.key !== null) return
    preference = savedTheme()
    applyTheme()
    notify()
  }
  applyTheme()
  systemTheme.addEventListener('change', onSystemChange)
  window.addEventListener('storage', onStorage)
  window.addEventListener(CHANGE_EVENT, notify)
  return () => {
    systemTheme.removeEventListener('change', onSystemChange)
    window.removeEventListener('storage', onStorage)
    window.removeEventListener(CHANGE_EVENT, notify)
  }
}

function toggleTheme() {
  preference = snapshot() === 'dark' ? 'light' : 'dark'
  try {
    window.localStorage.setItem(STORAGE_KEY, preference)
  } catch {
    // Keep the manual choice for this visit when storage is unavailable.
  }
  applyTheme()
  window.dispatchEvent(new Event(CHANGE_EVENT))
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, snapshot, () => 'light' as const)
  return { theme, toggleTheme }
}
