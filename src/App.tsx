import { Suspense, lazy } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Publications from './components/Publications'
import Experience from './components/Experience'
import Education from './components/Education'
import Skills from './components/Skills'
import Contact from './components/Contact'

const ProjectsGalaxy = lazy(() => import('./components/ProjectsGalaxy'))

function GalaxyFallback() {
  return (
    <section className="relative h-[640px] w-full overflow-hidden border-y border-neutral-800/60 bg-neutral-950">
      <div className="absolute inset-0 flex items-center justify-center text-xs tracking-widest text-neutral-600 uppercase">
        loading galaxy…
      </div>
    </section>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-white text-neutral-700 dark:bg-neutral-950 dark:text-neutral-300">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Education />
        <Projects />
        <Suspense fallback={<GalaxyFallback />}>
          <ProjectsGalaxy />
        </Suspense>
        <Publications />
        <Skills />
        <Contact />
      </main>
    </div>
  )
}

export default App
