import React, { useState, useEffect } from 'react'
import { BackgroundCanvas } from './three/BackgroundCanvas'
import { Navbar }      from './organisms/Navbar'
import { Hero }        from './organisms/Hero'
import { About }       from './organisms/About'
import { Stack }       from './organisms/Stack'
import { Experiences } from './organisms/Experiences'
import { Projects }    from './organisms/Projects'
import { Teammates }   from './organisms/Teammates'
import { Contact }     from './organisms/Contact'
import { Footer }      from './organisms/Footer'

function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return isMobile
}

const App: React.FC = () => {
  const isMobile = useIsMobile()

  return (
    <>
      {}
      <BackgroundCanvas isMobile={isMobile} />

      {}
      <Navbar />

      {}
      <main id="main-content" role="main">
        <Hero />
        <About />
        <Stack />
        <Experiences />
        <Projects />
        <Teammates />
        <Contact />
      </main>

      {}
      <Footer />
    </>
  )
}

export default App
