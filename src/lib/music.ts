import { MUSIC_FALLBACK_SRC, MUSIC_SRC } from '../assets.config'

type Listener = (playing: boolean) => void

const TARGET_VOLUME = 0.4
const listeners = new Set<Listener>()

let audio: HTMLAudioElement | null = null
let playing = false
let fadeTimer: number | null = null
let userPaused = false
let armed = false

function emit(): void {
  listeners.forEach((l) => l(playing))
}

function element(): HTMLAudioElement | null {
  if (audio) return audio
  if (typeof Audio === 'undefined') return null
  const a = new Audio()
  a.loop = true
  a.preload = 'auto'
  a.volume = 0
  let triedFallback = false
  a.addEventListener('play', () => {
    playing = true
    emit()
  })
  a.addEventListener('pause', () => {
    playing = false
    emit()
  })
  // if the primary source is missing, fall back to the bundled song
  a.addEventListener('error', () => {
    if (triedFallback || !MUSIC_FALLBACK_SRC) return
    triedFallback = true
    a.src = MUSIC_FALLBACK_SRC
    a.load()
    if (!userPaused) {
      const p = a.play()
      if (p && typeof p.then === 'function') {
        p.then(() => {
          playing = true
          emit()
          fadeTo(TARGET_VOLUME)
        }).catch(() => {})
      }
    }
  })
  a.src = MUSIC_SRC
  audio = a
  return audio
}

function clearFade(): void {
  if (fadeTimer !== null) {
    window.clearInterval(fadeTimer)
    fadeTimer = null
  }
}

function fadeTo(volume: number, done?: () => void): void {
  const a = element()
  if (!a) return
  clearFade()
  fadeTimer = window.setInterval(() => {
    const diff = volume - a.volume
    if (Math.abs(diff) < 0.03) {
      a.volume = Math.max(0, Math.min(1, volume))
      clearFade()
      done?.()
    } else {
      a.volume = Math.max(0, Math.min(1, a.volume + diff * 0.12))
    }
  }, 40)
}

export function playMusic(): void {
  const a = element()
  if (!a) return
  userPaused = false
  const started = a.play()
  const onOk = () => {
    playing = true
    emit()
    fadeTo(TARGET_VOLUME)
  }
  if (started && typeof started.then === 'function') {
    started.then(onOk).catch(() => {
      // autoplay blocked or file missing — stay silent
      playing = false
      emit()
    })
  } else {
    onOk()
  }
}

export function pauseMusic(): void {
  const a = element()
  if (!a) return
  userPaused = true
  fadeTo(0, () => a.pause())
}

/**
 * Start the song on the first user interaction anywhere on the page, unless
 * it is already playing or the visitor explicitly paused it. Browsers block
 * audio until a gesture, so this guarantees the song plays even when the
 * intro (and its "Unwrap" tap) was skipped.
 */
export function armAutoplay(): void {
  if (armed || typeof window === 'undefined') return
  armed = true
  const start = () => {
    window.removeEventListener('pointerdown', start)
    window.removeEventListener('keydown', start)
    if (!playing && !userPaused) playMusic()
  }
  window.addEventListener('pointerdown', start)
  window.addEventListener('keydown', start)
}

export function toggleMusic(): void {
  if (playing) pauseMusic()
  else playMusic()
}

export function subscribeMusic(listener: Listener): () => void {
  listeners.add(listener)
  listener(playing)
  return () => {
    listeners.delete(listener)
  }
}
