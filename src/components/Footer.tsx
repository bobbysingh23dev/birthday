import { Reveal } from './Reveal'

export function Footer({ onReplay }: { onReplay: () => void }) {
  return (
    <footer className="foot">
      <div className="wrap">
        <Reveal>
          <div className="foot__title">✦ The Many Dimensions of Manish ✦</div>
          <p>Crafted with immense love &amp; respect · celebrating an extraordinary soul.</p>
          <p className="foot__love">With warmth and every good wish — for the sovereign brother.</p>
          <p className="foot__mono">September 25th Edition · Special Milestone · Loved &amp; Revered</p>
          <button className="foot__replay" onClick={onReplay}>
            ▶ Replay the intro
          </button>
        </Reveal>
      </div>
    </footer>
  )
}
