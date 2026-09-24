export type Pose = 'idle' | 'lift' | 'walk' | 'cheer' | 'namaste' | 'eat' | 'dance'

interface CharacterProps {
  variant: 'girl' | 'boy'
  pose: Pose
  className?: string
}

const PALETTE = {
  girl: { skin: '#f2c19c', hair: '#2b1d14', top: '#ff6079', bottom: '#7d5cff', shoe: '#2a2540' },
  boy: { skin: '#e7ad83', hair: '#1c130c', top: '#39b0d6', bottom: '#2b3550', shoe: '#1e2436' },
}

/** A simple rigged flat-vector character. Limbs animate via `pose-*` CSS. */
export function Character({ variant, pose, className = '' }: CharacterProps) {
  const c = PALETTE[variant]
  return (
    <svg
      viewBox="0 0 120 200"
      className={`char char--${variant} pose-${pose} ${className}`.trim()}
      role="img"
      aria-hidden="true"
    >
      {/* legs (behind) */}
      <g className="char__leg char__leg-l">
        <rect x="50" y="120" width="9" height="62" rx="4" fill={c.bottom} />
        <rect x="47" y="178" width="16" height="9" rx="4" fill={c.shoe} />
      </g>
      <g className="char__leg char__leg-r">
        <rect x="61" y="120" width="9" height="62" rx="4" fill={c.bottom} />
        <rect x="58" y="178" width="16" height="9" rx="4" fill={c.shoe} />
      </g>

      {/* torso */}
      <rect className="char__torso" x="42" y="60" width="36" height="64" rx="15" fill={c.top} />

      {/* arms */}
      <g className="char__arm char__arm-l">
        <rect x="39" y="62" width="8" height="46" rx="4" fill={c.top} />
        <circle cx="43" cy="110" r="5" fill={c.skin} />
      </g>
      <g className="char__arm char__arm-r">
        <rect x="73" y="62" width="8" height="46" rx="4" fill={c.top} />
        <circle cx="77" cy="110" r="5" fill={c.skin} />
      </g>

      {/* folded hands, shown only in the namaste pose */}
      <g className="char__namaste">
        <path d="M60 72 L51 100 a4 4 0 0 0 4 5 h10 a4 4 0 0 0 4 -5 Z" fill={c.skin} />
        <line x1="60" y1="74" x2="60" y2="104" stroke="rgba(0,0,0,.16)" strokeWidth="1.5" />
      </g>

      {/* neck */}
      <rect x="55" y="54" width="10" height="10" fill={c.skin} />

      {/* head */}
      <g className="char__head">
        <circle cx="60" cy="38" r="20" fill={c.skin} />
        {variant === 'girl' ? (
          <>
            <path d="M39 41 a21 21 0 0 1 42 0 q2 -31 -21 -31 q-23 0 -21 31 Z" fill={c.hair} />
            <rect x="38" y="34" width="7" height="32" rx="3.5" fill={c.hair} />
            <rect x="75" y="34" width="7" height="32" rx="3.5" fill={c.hair} />
            <circle cx="60" cy="11" r="6" fill={c.hair} />
          </>
        ) : (
          <path d="M40 39 a20 20 0 0 1 40 0 q-3 -27 -20 -27 q-17 0 -20 27 Z" fill={c.hair} />
        )}
        <circle cx="53" cy="39" r="2.3" fill="#241a12" />
        <circle cx="67" cy="39" r="2.3" fill="#241a12" />
        <path d="M53 47 q7 6 14 0" stroke="#241a12" strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  )
}
