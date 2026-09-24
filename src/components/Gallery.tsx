import { useEffect, useRef, useState } from 'react'
import type { KeyboardEvent, TouchEvent } from 'react'
import { moments } from '../data/gallery'
import { Reveal } from './Reveal'
import './Gallery.css'

const reduceMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function Gallery() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const touchX = useRef<number | null>(null)
  const count = moments.length

  const go = (delta: number) => setIndex((i) => (i + delta + count) % count)

  // gentle auto-advance, paused on hover/focus and under reduced motion
  useEffect(() => {
    if (paused || reduceMotion || count < 2) return
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), 5000)
    return () => window.clearInterval(id)
  }, [paused, count])

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      go(-1)
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      go(1)
    }
  }

  const onTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    touchX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (touchX.current === null) return
    const delta = e.changedTouches[0].clientX - touchX.current
    if (Math.abs(delta) > 40) go(delta < 0 ? 1 : -1)
    touchX.current = null
  }

  const current = moments[index]

  return (
    <section className="section gallery" id="gallery">
      <div className="wrap">
        <Reveal className="section__head">
          <span className="eyebrow eyebrow--plain">Captured Moments</span>
          <h2>
            Moments with <span className="gold-text">Manish</span>
          </h2>
          <p>A few frames from the story — swipe, tap the arrows, or pick a thumbnail to wander through them.</p>
        </Reveal>

        <Reveal className="gallery__frame">
          <div
            className="gallery__stage"
            role="group"
            aria-label={`Photo ${index + 1} of ${count}: ${current.caption}`}
            tabIndex={0}
            onKeyDown={onKeyDown}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
          >
            <div className="gallery__bg" style={{ backgroundImage: `url(${current.src})` }} />
            <img
              key={index}
              className="gallery__img"
              src={current.src}
              alt={current.caption}
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
            />
            <span className="gallery__counter">
              {index + 1} / {count}
            </span>
            <button className="gallery__nav gallery__nav--prev" onClick={() => go(-1)} aria-label="Previous photo">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 6l-6 6 6 6" />
              </svg>
            </button>
            <button className="gallery__nav gallery__nav--next" onClick={() => go(1)} aria-label="Next photo">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          </div>

          <p className="gallery__caption">{current.caption}</p>

          <div className="gallery__thumbs">
            {moments.map((m, i) => (
              <button
                key={m.src}
                className={`gallery__thumb ${i === index ? 'is-active' : ''}`}
                onClick={() => setIndex(i)}
                aria-label={`Go to ${m.caption}`}
                aria-current={i === index}
              >
                <img src={m.src} alt="" draggable={false} onContextMenu={(e) => e.preventDefault()} />
              </button>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
