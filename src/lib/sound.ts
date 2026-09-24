// Tiny dependency-free Web Audio synth for the intro. All calls are no-ops
// until initAudio() runs from a user gesture, and while muted.

type WindowWithWebkit = typeof window & { webkitAudioContext?: typeof AudioContext }

let ctx: AudioContext | null = null
let muted = false

export function initAudio(): void {
  if (ctx) {
    if (ctx.state === 'suspended') void ctx.resume()
    return
  }
  try {
    const w = window as WindowWithWebkit
    const AudioCtor = w.AudioContext ?? w.webkitAudioContext
    if (!AudioCtor) return
    ctx = new AudioCtor()
  } catch {
    ctx = null
  }
}

export function setMuted(value: boolean): void {
  muted = value
}

function tone(freq: number, dur: number, type: OscillatorType, gain: number, when = 0): void {
  if (!ctx || muted) return
  const start = ctx.currentTime + when
  const osc = ctx.createOscillator()
  const g = ctx.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freq, start)
  g.gain.setValueAtTime(0.0001, start)
  g.gain.exponentialRampToValueAtTime(gain, start + 0.012)
  g.gain.exponentialRampToValueAtTime(0.0001, start + dur)
  osc.connect(g)
  g.connect(ctx.destination)
  osc.start(start)
  osc.stop(start + dur + 0.03)
}

/** A rising blip for each countdown tick (remaining = 3, 2, 1). */
export function playTick(remaining: number): void {
  if (!ctx || muted) return
  if (ctx.state === 'suspended') void ctx.resume()
  tone(380 + (4 - remaining) * 120, 0.16, 'triangle', 0.16)
}

/** A warm thump + sparkle chord + airy swoosh for the reveal. */
export function playBoom(): void {
  if (!ctx || muted) return
  if (ctx.state === 'suspended') void ctx.resume()

  tone(70, 0.55, 'sine', 0.32)
  ;[523.25, 659.25, 783.99, 1046.5].forEach((f, i) => tone(f, 0.9, 'sine', 0.1, i * 0.05))

  try {
    const dur = 0.5
    const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * dur), ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < data.length; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / data.length)
    }
    const src = ctx.createBufferSource()
    src.buffer = buffer
    const g = ctx.createGain()
    const start = ctx.currentTime
    g.gain.setValueAtTime(0.16, start)
    g.gain.exponentialRampToValueAtTime(0.0001, start + dur)
    const filter = ctx.createBiquadFilter()
    filter.type = 'highpass'
    filter.frequency.value = 700
    src.connect(filter)
    filter.connect(g)
    g.connect(ctx.destination)
    src.start(start)
  } catch {
    /* noise buffer unsupported */
  }
}
