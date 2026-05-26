import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Skills from './components/sections/Skills'
import Experience from './components/sections/Experience'
import Projects from './components/sections/Projects'
import Education from './components/sections/Education'
import Languages from './components/sections/Languages'
import Contact from './components/sections/Contact'

function App() {
  return (
    <>
      <Header />
      <main aria-label="Portfolio content" className="flex flex-col">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Languages />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
