import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Publications from './components/Publications'
import Experience from './components/Experience'
import Education from './components/Education'
import Skills from './components/Skills'
import Contact from './components/Contact'

function App() {
  return (
    <div className="min-h-screen bg-white text-neutral-700 dark:bg-neutral-950 dark:text-neutral-300">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Publications />
        <Experience />
        <Education />
        <Skills />
        <Contact />
      </main>
    </div>
  )
}

export default App
