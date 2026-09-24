import { useEffect, useState } from 'react'
import { fireBarrage, fireConfetti } from '../lib/confetti'
import { initAudio, playBoom, playTick, setMuted } from '../lib/sound'
import { Embers } from './Embers'
import './Intro.css'

type Phase = 'gate' | 'run' | 'leaving'

interface Beat {
  kind: 'line' | 'count' | 'boom'
  text: string
  ms: number
}

const BEATS: Beat[] = [
  { kind: 'line', text: "Today isn't just any day…", ms: 2000 },
  { kind: 'line', text: 'It is the 25th of September.', ms: 2000 },
  { kind: 'line', text: 'Time to celebrate every side of him.', ms: 2100 },
  { kind: 'count', text: '3', ms: 850 },
  { kind: 'count', text: '2', ms: 850 },
  { kind: 'count', text: '1', ms: 850 },
  { kind: 'boom', text: 'boom', ms: 2000 },
]

function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function Intro({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<Phase>('gate')
  const [step, setStep] = useState(0)
  const [muted, setMutedState] = useState(false)
  const reduce = prefersReducedMotion()

  // lock scrolling while the intro is on top
  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [])

  // run the beat machine
  useEffect(() => {
    if (phase !== 'run') return
    const beat = BEATS[step]
    if (beat.kind === 'count') playTick(Number(beat.text))
    if (beat.kind === 'boom') {
      fireBarrage()
      playBoom()
    }
    const timer = window.setTimeout(() => {
      if (step + 1 < BEATS.length) setStep(step + 1)
      else setPhase('leaving')
    }, beat.ms)
    return () => window.clearTimeout(timer)
  }, [phase, step])

  // finish once the curtains have opened
  useEffect(() => {
    if (phase !== 'leaving') return
    if (!reduce) fireConfetti(60)
    const timer = window.setTimeout(onDone, 1050)
    return () => window.clearTimeout(timer)
  }, [phase, reduce, onDone])

  const begin = () => {
    initAudio()
    setPhase(reduce ? 'leaving' : 'run')
  }
  const skip = () => setPhase('leaving')
  const toggleMute = () => {
    setMutedState((m) => {
      const next = !m
      setMuted(next)
      return next
    })
  }

  // keep the last beat on screen through the curtain-open ("leaving") phase
  const beat = phase === 'gate' ? null : BEATS[step]

  return (
    <div
      className={`intro ${phase === 'leaving' ? 'is-leaving' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Birthday celebration intro"
    >
      <div className="intro__curtains" aria-hidden="true">
        <div className="intro__curtain intro__curtain--l" />
        <div className="intro__curtain intro__curtain--r" />
      </div>
      <Embers />
      <div className="intro__aura" aria-hidden="true" />
      <span className="intro__revealflash" aria-hidden="true" />

      <div className="intro__stage">
        {phase === 'gate' && (
          <div className="intro__gate">
            <div className="intro__sealwrap">
              <span className="intro__rays" aria-hidden="true" />
              <div className="intro__seal">
                <span>M</span>
              </div>
            </div>
            <span className="intro__eyebrow">A Royal Birthday Awaits</span>
            <h2 className="intro__title">
              Someone made
              <br />
              something for you.
            </h2>
            <p className="intro__sub">
              A little tribute to the many dimensions of <b>Manish</b>. Ready?
            </p>
            <button className="btn btn--gold intro__btn" onClick={begin}>
              ✨ Unwrap the Celebration
            </button>
          </div>
        )}

        {beat?.kind === 'line' && (
          <p key={step} className="intro__line" style={{ animationDuration: `${beat.ms}ms` }}>
            {beat.text.split(' ').map((word, i) => (
              <span key={i} className="intro__word" style={{ animationDelay: `${i * 75}ms` }}>
                {word}
              </span>
            ))}
          </p>
        )}

        {beat?.kind === 'count' && (
          <div key={step} className="intro__count">
            <span className="intro__shock" aria-hidden="true" />
            <svg viewBox="0 0 120 120" className="intro__ring" aria-hidden="true">
              <circle className="intro__ring-track" cx="60" cy="60" r="54" />
              <circle
                className="intro__ring-fill"
                cx="60"
                cy="60"
                r="54"
                style={{ animationDuration: `${beat.ms}ms` }}
              />
            </svg>
            <span className="intro__count-n" style={{ animationDuration: `${beat.ms}ms` }}>
              {beat.text}
            </span>
          </div>
        )}

        {beat?.kind === 'boom' && (
          <div key={step} className="intro__boom">
            <span className="intro__flash" aria-hidden="true" />
            <span className="intro__shock intro__shock--boom" aria-hidden="true" />
            <span className="intro__shock intro__shock--boom intro__shock--delay" aria-hidden="true" />
            <h2 className="intro__boom-title">
              Happy Birthday,
              <br />
              <span className="gold-text">Manish!</span> <span aria-hidden="true">👑</span>
            </h2>
          </div>
        )}
      </div>

      <button className="intro__mute" onClick={toggleMute} aria-label={muted ? 'Unmute' : 'Mute'}>
        {muted ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 5L6 9H3v6h3l5 4V5z" />
            <path d="M22 9l-6 6M16 9l6 6" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 5L6 9H3v6h3l5 4V5z" />
            <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 6a8 8 0 0 1 0 12" />
          </svg>
        )}
      </button>

      {phase === 'run' && (
        <button className="intro__skip" onClick={skip}>
          Skip →
        </button>
      )}
    </div>
  )
}
