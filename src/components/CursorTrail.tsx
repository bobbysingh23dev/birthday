import { useEffect, useRef } from 'react'

interface Spark {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  max: number
  s: number
  c: string
}

const COLORS = ['#ffd97a', '#ff8ec9', '#9d82ff', '#f5c451', '#ff6079', '#3fd69a']

/** A trail of glowing sparkles that follows the pointer (desktop only). */
export function CursorTrail() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!window.matchMedia('(pointer: fine)').matches) return
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0
    let h = 0
    let raf = 0
    let last = 0
    const sparks: Spark[] = []

    const resize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onMove = (e: PointerEvent) => {
      const now = performance.now()
      if (now - last < 22) return
      last = now
      const n = 1 + Math.floor(Math.random() * 2)
      for (let i = 0; i < n; i++) {
        sparks.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8 - 0.35,
          life: 0,
          max: 34 + Math.random() * 26,
          s: 3 + Math.random() * 4,
          c: COLORS[(Math.random() * COLORS.length) | 0],
        })
      }
      if (!raf) raf = requestAnimationFrame(frame)
    }
    window.addEventListener('pointermove', onMove)

    function frame() {
      if (!ctx) return
      ctx.clearRect(0, 0, w, h)
      for (let i = sparks.length - 1; i >= 0; i--) {
        const p = sparks[i]
        p.life++
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.015
        const a = 1 - p.life / p.max
        if (a <= 0) {
          sparks.splice(i, 1)
          continue
        }
        ctx.globalAlpha = Math.max(0, a)
        ctx.shadowColor = p.c
        ctx.shadowBlur = 8
        ctx.fillStyle = p.c
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.s * a, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
      ctx.shadowBlur = 0
      raf = sparks.length ? requestAnimationFrame(frame) : 0
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 55 }}
    />
  )
}
