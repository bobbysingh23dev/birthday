import type { CSSProperties } from 'react'

interface Heart {
  l: number // left %
  s: number // size px
  c: string // color
  blur: number
  op: number
  dur: number
  delay: number
  sway: number
  sd: number
}

const FIELD: Heart[] = [
  { l: 6, s: 16, c: '#ff8ec9', blur: 3, op: 0.4, dur: 15, delay: -3, sway: 16, sd: 6 },
  { l: 20, s: 14, c: '#ffd97a', blur: 4, op: 0.35, dur: 17, delay: -9, sway: 20, sd: 7 },
  { l: 34, s: 18, c: '#9d82ff', blur: 3, op: 0.42, dur: 14, delay: -6, sway: 14, sd: 5.5 },
  { l: 50, s: 13, c: '#3fd69a', blur: 4, op: 0.35, dur: 18, delay: -12, sway: 18, sd: 6.5 },
  { l: 66, s: 16, c: '#ff924a', blur: 3, op: 0.4, dur: 15, delay: -1, sway: 15, sd: 6 },
  { l: 80, s: 14, c: '#ff6079', blur: 4, op: 0.35, dur: 17, delay: -8, sway: 20, sd: 7 },
  { l: 93, s: 15, c: '#ff5db1', blur: 4, op: 0.32, dur: 18, delay: -14, sway: 22, sd: 7.5 },
  { l: 4, s: 26, c: '#ff6079', blur: 0, op: 0.9, dur: 11, delay: -2, sway: 10, sd: 4.5 },
  { l: 16, s: 22, c: '#ffd97a', blur: 0, op: 0.9, dur: 10, delay: -7, sway: 12, sd: 5 },
  { l: 30, s: 28, c: '#ff8ec9', blur: 0, op: 0.9, dur: 12, delay: -4, sway: 9, sd: 4 },
  { l: 46, s: 24, c: '#9d82ff', blur: 0, op: 0.9, dur: 11, delay: -10, sway: 11, sd: 5 },
  { l: 62, s: 26, c: '#3fd69a', blur: 0, op: 0.88, dur: 12, delay: -1, sway: 10, sd: 4.5 },
  { l: 76, s: 22, c: '#ff924a', blur: 0, op: 0.9, dur: 10, delay: -6, sway: 12, sd: 5 },
  { l: 90, s: 25, c: '#ff5db1', blur: 0, op: 0.9, dur: 12, delay: -3, sway: 10, sd: 4 },
  { l: 55, s: 20, c: '#ffd97a', blur: 1, op: 0.75, dur: 13, delay: -11, sway: 13, sd: 5.5 },
]

export function Hearts() {
  return (
    <div className="heartfield" aria-hidden="true">
      {FIELD.map((h, i) => (
        <span
          key={i}
          className="gh"
          style={
            {
              left: `${h.l}%`,
              '--size': `${h.s}px`,
              '--op': h.op,
              '--dur': `${h.dur}s`,
              '--delay': `${h.delay}s`,
              '--sway': `${h.sway}px`,
              '--sd': `${h.sd}s`,
              '--blur': `${h.blur}px`,
            } as CSSProperties
          }
        >
          <span className="gh__inner">
            <svg viewBox="0 0 24 24">
              <path
                d="M12 21s-8-5.2-8-11.2C4 6.9 6 5 8.5 5c1.6 0 3 .8 3.5 2 .5-1.2 1.9-2 3.5-2C20 5 22 6.9 22 9.8 22 15.8 14 21 12 21z"
                fill={h.c}
              />
            </svg>
          </span>
        </span>
      ))}
    </div>
  )
}
