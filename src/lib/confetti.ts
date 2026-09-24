interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  g: number
  s: number
  rot: number
  vr: number
  c: string
  life: number
  max: number
}

const COLORS = ['#f5c451', '#ffd97a', '#ff924a', '#ff6079', '#3fd69a', '#9d82ff', '#ff72d6', '#fff2cf']

let canvas: HTMLCanvasElement | null = null
let ctx: CanvasRenderingContext2D | null = null
let particles: Particle[] = []
let raf = 0
let w = 0
let h = 0

function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function resize(): void {
  if (!canvas) return
  w = canvas.width = window.innerWidth
  h = canvas.height = window.innerHeight
}

function ensureCanvas(): void {
  if (canvas) return
  const existing = document.getElementById('confetti-canvas') as HTMLCanvasElement | null
  if (existing) {
    canvas = existing
    ctx = canvas.getContext('2d')
    resize()
    return
  }
  canvas = document.createElement('canvas')
  canvas.id = 'confetti-canvas'
  canvas.setAttribute('aria-hidden', 'true')
  canvas.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:200'
  document.body.appendChild(canvas)
  ctx = canvas.getContext('2d')
  resize()
  window.addEventListener('resize', resize)
}

function frame(): void {
  if (!ctx || !canvas) {
    raf = 0
    return
  }
  ctx.clearRect(0, 0, w, h)
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i]
    p.vy += p.g
    p.vx *= 0.995
    p.x += p.vx
    p.y += p.vy
    p.rot += p.vr
    p.life++
    const alpha = p.life > p.max - 40 ? Math.max(0, (p.max - p.life) / 40) : 1
    ctx.save()
    ctx.globalAlpha = alpha
    ctx.translate(p.x, p.y)
    ctx.rotate(p.rot)
    ctx.fillStyle = p.c
    ctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * 0.6)
    ctx.restore()
    if (p.y > h + 40 || p.life > p.max) particles.splice(i, 1)
  }
  if (particles.length) {
    raf = requestAnimationFrame(frame)
  } else {
    ctx.clearRect(0, 0, w, h)
    raf = 0
  }
}

/** Fire a burst of confetti from the top of the viewport. */
export function fireConfetti(count = 120): void {
  if (typeof window === 'undefined') return
  ensureCanvas()
  const n = prefersReducedMotion() ? Math.min(count, 14) : count
  for (let i = 0; i < n; i++) {
    particles.push({
      x: w / 2 + (Math.random() - 0.5) * w * 0.5,
      y: -20 - Math.random() * 40,
      vx: (Math.random() - 0.5) * 7,
      vy: Math.random() * 4 + 2.5,
      g: 0.12 + Math.random() * 0.08,
      s: 5 + Math.random() * 7,
      rot: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.3,
      c: COLORS[Math.floor(Math.random() * COLORS.length)],
      life: 0,
      max: 150 + Math.random() * 90,
    })
  }
  if (!raf) raf = requestAnimationFrame(frame)
}

/** Radial "firework" burst from a point (in device px). */
function spawnBurst(cx: number, cy: number, count: number): void {
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2
    const speed = 3 + Math.random() * 7
    particles.push({
      x: cx,
      y: cy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 2,
      g: 0.13 + Math.random() * 0.07,
      s: 5 + Math.random() * 6,
      rot: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.4,
      c: COLORS[Math.floor(Math.random() * COLORS.length)],
      life: 0,
      max: 120 + Math.random() * 70,
    })
  }
}

/** A dramatic celebration: a curtain of confetti plus staggered firework bursts. */
export function fireBarrage(): void {
  if (typeof window === 'undefined') return
  ensureCanvas()
  fireConfetti(prefersReducedMotion() ? 24 : 180)
  if (prefersReducedMotion()) return

  const shots: Array<[number, number, number]> = [
    [0.5, 0.4, 90],
    [0.3, 0.52, 60],
    [0.7, 0.48, 60],
    [0.5, 0.3, 70],
    [0.42, 0.6, 50],
    [0.6, 0.58, 50],
  ]
  shots.forEach(([fx, fy, n], i) => {
    window.setTimeout(() => {
      ensureCanvas()
      spawnBurst(fx * w, fy * h, n)
      if (!raf) raf = requestAnimationFrame(frame)
    }, i * 150)
  })
}
