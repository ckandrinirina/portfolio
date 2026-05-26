import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import { NAV_SECTIONS } from './lib/constants'

function App() {
  return (
    <>
      <Header />
      <main aria-label="Portfolio content" className="flex flex-col">
        {NAV_SECTIONS.map(({ id }) => (
          <section key={id} id={id} className="min-h-screen" />
        ))}
      </main>
      <Footer />
    </>
  )
}

export default App
