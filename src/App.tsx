import { useEffect, useState } from 'react'
import { armAutoplay } from './lib/music'
import { Intro } from './components/Intro'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Pillars } from './components/Pillars'
import { Gallery } from './components/Gallery'
import { EgoBooster } from './components/EgoBooster'
import { Celebrate } from './components/Celebrate'
import { Wish } from './components/Wish'
import { Footer } from './components/Footer'
import { MusicToggle } from './components/MusicToggle'
import './App.css'

const INTRO_KEY = 'manish-intro-seen'

function App() {
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(INTRO_KEY) !== '1'
    } catch {
      return true
    }
  })

  // ensure the song plays even if the intro (and its "Unwrap" tap) was skipped
  useEffect(() => {
    armAutoplay()
  }, [])

  const finishIntro = () => {
    try {
      sessionStorage.setItem(INTRO_KEY, '1')
    } catch {
      /* storage may be unavailable */
    }
    setShowIntro(false)
  }

  const replayIntro = () => {
    try {
      sessionStorage.removeItem(INTRO_KEY)
    } catch {
      /* storage may be unavailable */
    }
    window.scrollTo({ top: 0 })
    setShowIntro(true)
  }

  return (
    <>
      {showIntro && <Intro onDone={finishIntro} />}
      <Nav />
      <main id="top">
        <Hero />
        <Pillars />
        <Gallery />
        <EgoBooster />
        <Celebrate />
        <Wish />
      </main>
      <Footer onReplay={replayIntro} />
      <MusicToggle />
    </>
  )
}

export default App
