import { useState } from 'react'
import { praises } from '../data/praise'
import { fireConfetti } from '../lib/confetti'
import { Reveal } from './Reveal'

export function EgoBooster() {
  const [index, setIndex] = useState(0)
  const [compliments, setCompliments] = useState(0)
  const [fading, setFading] = useState(false)

  const generate = () => {
    setFading(true)
    setCompliments((c) => c + 1)
    fireConfetti(30)
    window.setTimeout(() => {
      setIndex((i) => (i + 1) % praises.length)
      setFading(false)
    }, 150)
  }

  return (
    <section className="section ego" id="ego">
      <div className="wrap">
        <Reveal className="section__head">
          <span className="eyebrow">Daily Dose Protocol</span>
          <h2>
            The Royal <span className="gold-text">Ego Booster</span> 🔥
          </h2>
          <p>
            Because even the most multifaceted geniuses deserve their daily dose of hype. Tap below to
            unlock undeniable truths about Manish.
          </p>
        </Reveal>

        <Reveal className="ego__panel">
          <div className="console">
            <div className="console__bar">
              <i />
              <i />
              <i />
              <span>MANISH.exe · v25.09</span>
            </div>
            <p className={`console__text ${fading ? 'is-fading' : ''}`} aria-live="polite">
              {praises[index]}
            </p>
            <div className="console__meta">
              TRUTH #{index + 1} OF {praises.length}
            </div>
          </div>

          <div className="ego__cta">
            <button className="btn btn--gold" onClick={generate}>
              ✨ Generate Manish Praise
            </button>
            <span className="counter">
              Compliments delivered: <b>{compliments}</b>
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
