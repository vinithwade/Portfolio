import { Loader } from './components/effects/Loader'
import { NoiseMesh } from './components/effects/NoiseMesh'
import { HorizontalScroll } from './components/effects/Orbit'
import { Navbar } from './components/layout/Navbar'
import { About } from './components/sections/About'
import { Achievements } from './components/sections/Achievements'
import { Contact } from './components/sections/Contact'
import { Experience } from './components/sections/Experience'
import { Hero } from './components/sections/Hero'
import { Projects } from './components/sections/Projects'
import { Skills } from './components/sections/Skills'
import { WhatIDo } from './components/sections/WhatIDo'

function App() {
  return (
    <>
      <NoiseMesh />
      <Loader />
      <Navbar />
      <HorizontalScroll>
        <Hero />
        <About />
        <WhatIDo />
        <Experience />
        <Projects />
        <Skills />
        <Achievements />
        <Contact />
      </HorizontalScroll>
    </>
  )
}

export default App
