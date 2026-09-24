import { fireConfetti } from '../lib/confetti'

export function Nav() {
  return (
    <header className="nav">
      <div className="nav__inner">
        <a className="brand" href="#top">
          <span className="brand__mark">M</span>
          <span>
            <span className="brand__name">M2S · MANISH</span>
            <br />
            <span className="brand__sub">25 · SEPTEMBER</span>
          </span>
        </a>

        <nav className="nav__links">
          <a href="#faces">The Faces</a>
          <a href="#gallery">Moments</a>
          <a href="#ego">Ego Booster</a>
          <a href="#wish">Birthday Wish</a>
        </nav>

        <button className="btn btn--gold" onClick={() => fireConfetti(130)}>
          ✦ Celebrate
        </button>
      </div>
    </header>
  )
}
