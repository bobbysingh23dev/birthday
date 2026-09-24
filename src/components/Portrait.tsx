import { useState } from 'react'
import { PHOTO_SRC } from '../assets.config'

/** A gold-framed portrait. Falls back to a monogram if the photo is missing. */
export function Portrait({ className = '' }: { className?: string }) {
  const [failed, setFailed] = useState(false)
  return (
    <div className={`portrait ${className}`.trim()}>
      {failed ? (
        <div className="portrait__fallback">M</div>
      ) : (
        <img
          src={PHOTO_SRC}
          alt="Manish"
          className="portrait__img"
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  )
}
