import { useEffect, useState } from 'react'
import { subscribeMusic, toggleMusic } from '../lib/music'

/** Floating control to play/pause the background song. */
export function MusicToggle() {
  const [playing, setPlaying] = useState(false)
  useEffect(() => subscribeMusic(setPlaying), [])

  return (
    <button
      className={`music-toggle ${playing ? 'is-on' : ''}`}
      onClick={toggleMusic}
      aria-label={playing ? 'Pause music' : 'Play music'}
    >
      <span className="music-toggle__eq" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      {playing ? 'Music on' : 'Play song'}
    </button>
  )
}
