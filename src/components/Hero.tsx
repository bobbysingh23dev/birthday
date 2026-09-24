import { Balloons } from './Balloons'

export function Hero() {
  return (
    <section className="hero">
      <Balloons />
      <div className="hero__inner wrap">
        <span className="eyebrow">✦ September 25th · Milestone Celebration</span>

        <h1>
          Happy Birthday,
          <br />
          <span className="gold-text">Manish!</span> <span aria-hidden="true">👑</span>
        </h1>

        <p className="hero__tag">
          <b>Mechanical Mind</b> · <b>Software Brain</b> · <b>Devoted Son</b> · <b>Patriot</b> ·{' '}
          <b>Kind Soul</b>
        </p>

        <figure className="quote">
          <span className="quote__mark" aria-hidden="true">
            &ldquo;
          </span>
          <p>
            Most people are defined by just one or two things. But today, on the 25th of September, we
            celebrate every incredible face of the person you are — the workaholic, the giver, the
            believer, and the heart of gold.
          </p>
          <figcaption className="quote__by">
            <span>A dedication · with love &amp; respect</span>
            <span className="quote__stars" aria-hidden="true">
              ★ ★ ★
            </span>
          </figcaption>
        </figure>

        <div className="stats">
          <div className="stat">
            <div className="stat__n">6</div>
            <div className="stat__l">Mastery Dimensions</div>
          </div>
          <div className="stat">
            <div className="stat__n">1</div>
            <div className="stat__l">Kind &amp; Wild Soul</div>
          </div>
          <div className="stat">
            <div className="stat__n">25 Sept</div>
            <div className="stat__l">Celebrated Forever</div>
          </div>
        </div>

        <div className="hero__cta">
          <a className="btn btn--gold" href="#faces">
            Explore His Dimensions ↓
          </a>
          <a className="btn btn--ghost" href="#ego">
            ⚡ The Ego Booster
          </a>
        </div>
      </div>
    </section>
  )
}
