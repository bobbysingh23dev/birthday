import { useState } from 'react'
import type { CSSProperties, KeyboardEvent } from 'react'
import type { Pillar } from '../data/pillars'
import { PillarIcon } from './PillarIcon'

export function PillarCard({ pillar }: { pillar: Pillar }) {
  const [open, setOpen] = useState(false)
  const toggle = () => setOpen((o) => !o)

  const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      toggle()
    }
  }

  return (
    <article
      className={`pillar ${open ? 'is-open' : ''}`}
      style={{ ['--accent']: pillar.accent } as CSSProperties}
      role="button"
      tabIndex={0}
      aria-expanded={open}
      onClick={toggle}
      onKeyDown={onKeyDown}
    >
      <div className="pillar__top">
        <span className="pillar__icon">
          <PillarIcon name={pillar.icon} />
        </span>
        <span className="pillar__face">{pillar.face}</span>
      </div>

      <div className="pillar__cat">{pillar.category}</div>
      <h3>{pillar.title}</h3>
      <p className="pillar__body">{pillar.body}</p>

      <div className="pillar__more">
        <div className="pillar__more-in">
          <p className="pillar__reflect">{pillar.reflection}</p>
        </div>
      </div>

      <div className="pillar__tags">
        {pillar.tags.map((tag) => (
          <span className="tag" key={tag}>
            {tag}
          </span>
        ))}
      </div>

      <div className="pillar__hint">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
          <path d="M6 9l6 6 6-6" />
        </svg>
        <span>{open ? 'Show less' : 'Tap to reflect'}</span>
      </div>
    </article>
  )
}
