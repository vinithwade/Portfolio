import { Navbar } from './components/layout/Navbar'
import { About } from './components/sections/About'
import { Achievements } from './components/sections/Achievements'
import { Contact } from './components/sections/Contact'
import { Experience } from './components/sections/Experience'
import { Footer } from './components/sections/Footer'
import { Hero } from './components/sections/Hero'
import { Now } from './components/sections/Now'
import { Projects } from './components/sections/Projects'
import { Skills } from './components/sections/Skills'
import { WhatIDo } from './components/sections/WhatIDo'

import { NoiseMesh } from './components/effects/NoiseMesh'
import { SmoothScroll } from './components/effects/SmoothScroll'

function App() {
  return (
    <>
      {/* Background layers — always present, z-ordered beneath content */}
      <NoiseMesh />
      <div className="global-noise" aria-hidden />

      {/* Smooth scroll engine */}
      <SmoothScroll />

      <Navbar />
      <main className="lg:pl-[252px]">
        <div className="container-page">
          <Hero />
          <About />
          <WhatIDo />
          <Experience />
          <Now />
          <Projects />
          <Skills />
          <Achievements />
          <Contact />
        </div>
      </main>
      <Footer />
    </>
  )
}

export default App
