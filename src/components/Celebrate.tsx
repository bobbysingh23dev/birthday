import { useEffect, useState } from 'react'
import { fireBarrage, fireConfetti } from '../lib/confetti'
import { Reveal } from './Reveal'
import { Character } from './journey/Character'
import './Celebrate.css'

interface Scene {
  key: string
  title: string
  line: string
  ms: number
  confetti?: 'burst'
}

const SCENES: Scene[] = [
  { key: 'gym', title: 'It starts at the gym', line: 'Two hearts, one workout — they kick off the birthday strong, together.', ms: 4000 },
  { key: 'home', title: 'Back home', line: 'Sweaty and smiling, they head home to freshen up.', ms: 3800 },
  { key: 'cake', title: 'Birthday at home', line: 'Candles, a wish, and cake — the celebration begins!', ms: 4200, confetti: 'burst' },
  { key: 'temple', title: 'Radha Rani’s blessings', line: 'Hand in hand to the temple, seeking Radha Rani’s blessings.', ms: 4200 },
  { key: 'food', title: 'A feast for two', line: 'Then out for a delicious meal — birthdays need good food!', ms: 3800 },
  { key: 'dance', title: 'And then… they dance!', line: 'The night turns musical — they dance like nobody’s watching.', ms: 4200, confetti: 'burst' },
]

function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function SceneStage({ sceneKey }: { sceneKey: string }) {
  switch (sceneKey) {
    case 'gym':
      return (
        <div className="jstage jstage--gym">
          <div className="prop-barbell" aria-hidden="true">
            <span className="plate" />
            <span className="bar" />
            <span className="plate" />
          </div>
          <div className="jstage__row">
            <Character variant="girl" pose="lift" className="actor" />
            <Character variant="boy" pose="lift" className="actor" />
          </div>
          <div className="jfloor" />
        </div>
      )
    case 'home':
      return (
        <div className="jstage jstage--home">
          <div className="prop-sun" aria-hidden="true" />
          <svg className="prop-house" viewBox="0 0 120 100" aria-hidden="true">
            <polygon points="60,8 108,48 12,48" fill="#c9922e" />
            <rect x="24" y="48" width="72" height="44" rx="3" fill="#7a5a34" />
            <rect x="52" y="64" width="16" height="28" rx="2" fill="#3a2a18" />
            <rect x="32" y="58" width="14" height="14" rx="2" fill="#ffd97a" />
            <rect x="74" y="58" width="14" height="14" rx="2" fill="#ffd97a" />
          </svg>
          <div className="jstage__row">
            <Character variant="girl" pose="walk" className="actor" />
            <Character variant="boy" pose="walk" className="actor" />
          </div>
          <div className="jfloor" />
        </div>
      )
    case 'cake':
      return (
        <div className="jstage jstage--cake">
          <span className="mini-balloon mb1" aria-hidden="true" />
          <span className="mini-balloon mb2" aria-hidden="true" />
          <span className="mini-balloon mb3" aria-hidden="true" />
          <div className="jstage__row">
            <Character variant="girl" pose="cheer" className="actor" />
            <svg className="prop-cake" viewBox="0 0 100 110" aria-hidden="true">
              <rect x="18" y="70" width="64" height="30" rx="6" fill="#ff9ecd" />
              <rect x="24" y="52" width="52" height="24" rx="6" fill="#ffd97a" />
              <rect x="18" y="66" width="64" height="8" fill="#fff2cf" />
              <rect x="24" y="48" width="52" height="7" fill="#fff2cf" />
              <rect x="48" y="30" width="4" height="20" fill="#fff" />
              <g className="flame">
                <ellipse cx="50" cy="26" rx="4" ry="7" fill="#ffb545" />
                <ellipse cx="50" cy="28" rx="2" ry="4" fill="#fff2cf" />
              </g>
            </svg>
            <Character variant="boy" pose="cheer" className="actor" />
          </div>
          <div className="jfloor" />
        </div>
      )
    case 'temple':
      return (
        <div className="jstage jstage--temple">
          <svg className="prop-temple" viewBox="0 0 160 120" aria-hidden="true">
            <rect x="30" y="60" width="100" height="56" fill="#3a2f1a" />
            <rect x="24" y="54" width="112" height="10" fill="#c9922e" />
            <polygon points="80,10 120,54 40,54" fill="#c9922e" />
            <circle cx="80" cy="8" r="5" fill="#ffd97a" />
            <rect x="70" y="82" width="20" height="34" rx="2" fill="#1c150a" />
            <rect x="44" y="74" width="14" height="20" rx="2" fill="#ffd97a" opacity="0.5" />
            <rect x="102" y="74" width="14" height="20" rx="2" fill="#ffd97a" opacity="0.5" />
          </svg>
          <div className="petals" aria-hidden="true">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <span key={i} className="petal" style={{ left: `${8 + i * 15}%`, animationDelay: `${i * 0.6}s` }} />
            ))}
          </div>
          <div className="jstage__row">
            <Character variant="girl" pose="namaste" className="actor" />
            <svg className="prop-diya" viewBox="0 0 40 40" aria-hidden="true">
              <g className="flame">
                <ellipse cx="20" cy="16" rx="3.5" ry="7" fill="#ffb545" />
                <ellipse cx="20" cy="18" rx="1.8" ry="3.5" fill="#fff2cf" />
              </g>
              <path d="M8 26 q12 10 24 0 Z" fill="#c9922e" />
            </svg>
            <Character variant="boy" pose="namaste" className="actor" />
          </div>
          <div className="jfloor" />
        </div>
      )
    case 'food':
      return (
        <div className="jstage jstage--food">
          <div className="jstage__row jstage__row--food">
            <Character variant="girl" pose="eat" className="actor" />
            <Character variant="boy" pose="eat" className="actor" />
          </div>
          <div className="prop-food-table" aria-hidden="true">
            <div className="plate">
              <span className="steam s1" />
              <span className="steam s2" />
            </div>
            <div className="plate">
              <span className="steam s1" />
              <span className="steam s2" />
            </div>
          </div>
        </div>
      )
    case 'dance':
      return (
        <div className="jstage jstage--dance">
          <div className="disco" aria-hidden="true" />
          <div className="notes" aria-hidden="true">
            {[0, 1, 2, 3, 4].map((i) => (
              <span key={i} className="note" style={{ left: `${12 + i * 18}%`, animationDelay: `${i * 0.5}s` }}>
                ♪
              </span>
            ))}
          </div>
          <div className="jstage__row">
            <Character variant="girl" pose="dance" className="actor" />
            <Character variant="boy" pose="dance" className="actor" />
          </div>
          <div className="jfloor jfloor--dance" />
        </div>
      )
    default:
      return null
  }
}

function JourneyPlayer({ onClose }: { onClose: () => void }) {
  const [index, setIndex] = useState(0)
  const [done, setDone] = useState(false)
  const reduce = prefersReducedMotion()

  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  useEffect(() => {
    if (done) return
    const scene = SCENES[index]
    if (scene.confetti === 'burst') fireConfetti(reduce ? 18 : 55)
    const timer = window.setTimeout(() => {
      if (index + 1 < SCENES.length) setIndex(index + 1)
      else setDone(true)
    }, scene.ms)
    return () => window.clearTimeout(timer)
  }, [index, done, reduce])

  useEffect(() => {
    if (done) fireBarrage()
  }, [done])

  const replay = () => {
    setIndex(0)
    setDone(false)
  }

  const scene = SCENES[index]

  return (
    <div className="journey" role="dialog" aria-modal="true" aria-label="Birthday celebration journey">
      <button className="journey__close" onClick={onClose} aria-label="Close">
        ✕
      </button>

      {!done ? (
        <div key={scene.key} className={`journey__scene theme-${scene.key}`}>
          <SceneStage sceneKey={scene.key} />
          <h3 className="journey__title">{scene.title}</h3>
          <p className="journey__line">{scene.line}</p>
          <div className="journey__progress" aria-hidden="true">
            {SCENES.map((s, i) => (
              <span key={s.key} className={`journey__dot ${i <= index ? 'is-on' : ''}`} />
            ))}
          </div>
          <button className="journey__skip" onClick={() => setDone(true)}>
            Skip →
          </button>
        </div>
      ) : (
        <div className="journey__scene journey__finale theme-finale">
          <div className="jstage jstage--finale">
            <div className="jstage__row">
              <Character variant="girl" pose="cheer" className="actor" />
              <svg className="prop-crown" viewBox="0 0 80 60" aria-hidden="true">
                <path d="M8 50 L14 18 L28 38 L40 12 L52 38 L66 18 L72 50 Z" fill="#ffd97a" stroke="#c9922e" strokeWidth="2" />
                <circle cx="14" cy="16" r="4" fill="#ff6079" />
                <circle cx="40" cy="10" r="4" fill="#3fd69a" />
                <circle cx="66" cy="16" r="4" fill="#9d82ff" />
                <rect x="8" y="50" width="64" height="6" rx="2" fill="#c9922e" />
              </svg>
              <Character variant="boy" pose="cheer" className="actor" />
            </div>
            <div className="hearts" aria-hidden="true">
              {[0, 1, 2, 3].map((i) => (
                <span key={i} className="heart" style={{ left: `${20 + i * 20}%`, animationDelay: `${i * 0.5}s` }} />
              ))}
            </div>
          </div>
          <h3 className="journey__title">That’s how they celebrate 🎂</h3>
          <p className="journey__line">
            Together, joyfully, unforgettably.
            <br />
            Happy Birthday, <span className="gold-text">Manish!</span>
          </p>
          <div className="journey__finale-cta">
            <button className="btn btn--gold" onClick={replay}>
              ↺ Replay the day
            </button>
            <button className="btn btn--ghost" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export function Celebrate() {
  const [open, setOpen] = useState(false)

  return (
    <section className="section celebrate" id="journey">
      <div className="wrap">
        <Reveal className="section__head">
          <span className="eyebrow">A Day to Remember</span>
          <h2>
            How They <span className="gold-text">Celebrate</span>
          </h2>
          <p>Press play and follow a girl and a boy through the perfect birthday day — from the gym to the dance floor.</p>
        </Reveal>

        <Reveal className="celebrate__cta">
          <button className="btn btn--gold celebrate__btn" onClick={() => setOpen(true)}>
            🎉 Let’s Celebrate Your Birthday
          </button>
        </Reveal>
      </div>

      {open && <JourneyPlayer onClose={() => setOpen(false)} />}
    </section>
  )
}
