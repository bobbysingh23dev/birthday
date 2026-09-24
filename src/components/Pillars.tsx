import { useState } from 'react'
import type { FilterOption } from '../data/pillars'
import { filters, pillars } from '../data/pillars'
import { PillarCard } from './PillarCard'
import { Reveal } from './Reveal'

export function Pillars() {
  const [active, setActive] = useState<FilterOption['id']>('all')
  const shown = active === 'all' ? pillars : pillars.filter((p) => p.group === active)

  return (
    <section className="section" id="faces">
      <div className="wrap">
        <Reveal className="section__head">
          <span className="eyebrow eyebrow--plain">Multifaceted Identity</span>
          <h2>
            The 6 Pillars of <span className="gold-text">Manish</span>
          </h2>
          <p>
            Tap any dimension to reveal its deeper reflection. Every one of them leaves an impact
            everywhere it goes.
          </p>
        </Reveal>

        <div className="tabs" role="tablist" aria-label="Filter dimensions">
          {filters.map((f) => (
            <button
              key={f.id}
              className={`tab ${active === f.id ? 'is-active' : ''}`}
              role="tab"
              aria-selected={active === f.id}
              onClick={() => setActive(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* keying on `active` re-triggers the reveal animation when filtering */}
        <div className="pillars-grid" key={active}>
          {shown.map((pillar, i) => (
            <Reveal key={pillar.id} delay={i * 70}>
              <PillarCard pillar={pillar} />
            </Reveal>
          ))}
        </div>

        <p className="grid-tip">✦ Tip: tap any dimension card to expand its inner reflection ✦</p>
      </div>
    </section>
  )
}
