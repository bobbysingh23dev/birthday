import { useEffect, useRef } from 'react'

interface Ember {
  x: number
  y: number
  r: number
  speed: number
  amp: number
  phase: number
  twinkle: number
  twinkleSpeed: number
}

/** A soft canvas of golden motes drifting upward behind the intro stage. */
export function Embers({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0
    let embers: Ember[] = []
    let raf = 0
    let last = performance.now()

    const seed = () => {
      const count = Math.round(Math.min(60, Math.max(28, width / 26)))
      embers = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 0.6 + Math.random() * 2.2,
        speed: 6 + Math.random() * 22,
        amp: 6 + Math.random() * 16,
        phase: Math.random() * Math.PI * 2,
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpeed: 1 + Math.random() * 2,
      }))
    }

    const resize = () => {
      width = canvas.width = canvas.offsetWidth
      height = canvas.height = canvas.offsetHeight
      seed()
    }
    resize()
    window.addEventListener('resize', resize)

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = '#f5c451'
      ctx.shadowColor = '#f5c451'
      ctx.shadowBlur = 8
      for (const e of embers) {
        e.y -= e.speed * dt
        e.phase += dt
        e.twinkle += dt * e.twinkleSpeed
        if (e.y < -12) {
          e.y = height + 12
          e.x = Math.random() * width
        }
        const x = e.x + Math.sin(e.phase) * e.amp
        ctx.globalAlpha = Math.max(0, 0.32 + Math.sin(e.twinkle) * 0.3)
        ctx.beginPath()
        ctx.arc(x, e.y, e.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
      ctx.shadowBlur = 0
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={ref} className={`intro__embers ${className}`.trim()} aria-hidden="true" />
}
