import { fireConfetti } from '../lib/confetti'
import { Reveal } from './Reveal'

export function Wish() {
  return (
    <section className="section wish" id="wish">
      <div className="wrap">
        <Reveal className="wish__panel">
          <div className="wish__seal" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 8l4.5 3L12 4l4.5 7L21 8l-1.6 10H4.6L3 8z" />
            </svg>
          </div>

          <span className="eyebrow eyebrow--plain">A Toast to the Milestone Year</span>
          <h2>
            To Being <span className="gold-text">Unapologetically Extraordinary</span> 🌟
          </h2>
          <p className="wish__quote">
            Happy Birthday, Manish. Thank you for being an inspiration to society, a pillar for your
            family, an empathetic soul to every living creature, and my absolute favorite person in the
            world. May this new chapter unlock every manifestation, and all the peace, success, and joy
            you have earned with your goodness.
          </p>
          <button className="btn btn--gold" onClick={() => fireConfetti(160)}>
            🎉 Send a Birthday Hug &amp; Virtual Confetti
          </button>
        </Reveal>
      </div>
    </section>
  )
}
