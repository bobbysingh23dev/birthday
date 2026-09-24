import type { CSSProperties } from 'react'

interface Balloon {
  l: number // left %
  s: number // size px
  c: 'gold' | 'purple' | 'pink' | 'teal'
  blur: number
  op: number
  dur: number // rise duration s
  delay: number // negative to pre-distribute
  sway: number // px
  sd: number // sway duration s
}

// Two depth layers: blurred/faint balloons drift far behind, sharp ones nearer.
const FIELD: Balloon[] = [
  { l: 8, s: 30, c: 'gold', blur: 4, op: 0.4, dur: 24, delay: -4, sway: 16, sd: 6 },
  { l: 22, s: 26, c: 'purple', blur: 4, op: 0.35, dur: 26, delay: -14, sway: 20, sd: 7 },
  { l: 40, s: 34, c: 'pink', blur: 3, op: 0.45, dur: 22, delay: -9, sway: 14, sd: 5.5 },
  { l: 58, s: 28, c: 'teal', blur: 4, op: 0.38, dur: 25, delay: -18, sway: 18, sd: 6.5 },
  { l: 74, s: 32, c: 'gold', blur: 3, op: 0.4, dur: 23, delay: -2, sway: 16, sd: 6 },
  { l: 90, s: 26, c: 'purple', blur: 4, op: 0.35, dur: 27, delay: -12, sway: 22, sd: 7.5 },
  { l: 33, s: 24, c: 'gold', blur: 5, op: 0.3, dur: 28, delay: -20, sway: 24, sd: 8 },
  { l: 66, s: 24, c: 'pink', blur: 5, op: 0.3, dur: 28, delay: -6, sway: 24, sd: 8 },
  { l: 5, s: 52, c: 'purple', blur: 0, op: 0.9, dur: 16, delay: -3, sway: 10, sd: 4.5 },
  { l: 18, s: 46, c: 'gold', blur: 0, op: 0.95, dur: 15, delay: -10, sway: 12, sd: 5 },
  { l: 36, s: 58, c: 'pink', blur: 0, op: 0.9, dur: 14, delay: -7, sway: 9, sd: 4 },
  { l: 52, s: 48, c: 'teal', blur: 0, op: 0.9, dur: 17, delay: -13, sway: 11, sd: 5 },
  { l: 68, s: 56, c: 'gold', blur: 0, op: 0.95, dur: 15, delay: -1, sway: 10, sd: 4.5 },
  { l: 82, s: 44, c: 'pink', blur: 0, op: 0.9, dur: 16, delay: -9, sway: 12, sd: 5 },
  { l: 95, s: 50, c: 'purple', blur: 0, op: 0.9, dur: 14, delay: -5, sway: 10, sd: 4 },
  { l: 47, s: 40, c: 'gold', blur: 1, op: 0.75, dur: 18, delay: -16, sway: 13, sd: 5.5 },
]

export function Balloons() {
  return (
    <div className="balloonfield" aria-hidden="true">
      {FIELD.map((b, i) => (
        <span
          key={i}
          className="bf"
          style={
            {
              left: `${b.l}%`,
              '--size': `${b.s}px`,
              '--op': b.op,
              '--dur': `${b.dur}s`,
              '--delay': `${b.delay}s`,
              '--sway': `${b.sway}px`,
              '--sd': `${b.sd}s`,
              '--blur': `${b.blur}px`,
            } as CSSProperties
          }
        >
          <span className="bf__inner">
            <span className={`bf__body bf__body--${b.c}`} />
            <span className="bf__string" />
          </span>
        </span>
      ))}
    </div>
  )
}
