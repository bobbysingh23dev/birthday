import { useEffect, useRef, useState } from "react";
import { fireBarrage, fireConfetti } from "../lib/confetti";
import { Reveal } from "./Reveal";
import "./Surprises.css";

/* ---------------- Candle cake ---------------- */
const CANDLE_X = [45, 82, 119, 156, 193];

function CandleCake() {
  const [out, setOut] = useState<boolean[]>(() => CANDLE_X.map(() => false));
  const allOut = out.every(Boolean);

  useEffect(() => {
    if (allOut) fireConfetti(80);
  }, [allOut]);

  const blow = (i: number) =>
    setOut((o) => o.map((v, idx) => (idx === i ? true : v)));
  const relight = () => setOut(CANDLE_X.map(() => false));

  return (
    <div className="surprise__card">
      <svg
        viewBox="0 0 238 215"
        className="cake"
        role="img"
        aria-label="Birthday cake"
      >
        <ellipse cx="119" cy="200" rx="96" ry="10" fill="rgba(0,0,0,.35)" />
        <rect x="33" y="150" width="172" height="50" rx="9" fill="#ff9ecd" />
        <rect x="50" y="118" width="138" height="36" rx="9" fill="#ffd97a" />
        <rect x="33" y="146" width="172" height="8" fill="#fff2cf" />
        <rect x="50" y="114" width="138" height="7" fill="#fff2cf" />
        {CANDLE_X.map((x, i) => (
          <g key={i}>
            <rect
              x={x - 3}
              y="90"
              width="6"
              height="30"
              rx="2"
              fill="#8ecae6"
            />
            {out[i] ? (
              <circle
                className="cake__smoke"
                cx={x}
                cy="80"
                r="3"
                fill="rgba(255,255,255,.5)"
              />
            ) : (
              <g
                className="cake__flame"
                onClick={() => blow(i)}
                style={{ cursor: "pointer" }}
              >
                <circle cx={x} cy="80" r="15" fill="transparent" />
                <ellipse
                  className="cake__fire"
                  cx={x}
                  cy="78"
                  rx="5"
                  ry="9"
                  fill="#ffb545"
                />
                <ellipse cx={x} cy="80" rx="2.4" ry="5" fill="#fff2cf" />
              </g>
            )}
          </g>
        ))}
      </svg>
      <div className="surprise__cap">
        {allOut
          ? "🎉 Wish granted — happy birthday!"
          : "Tap each flame to blow the candles out"}
      </div>
      {allOut && (
        <button className="surprise__btn" onClick={relight}>
          ↺ Light again
        </button>
      )}
    </div>
  );
}

/* ---------------- Gift box ---------------- */
function GiftBox() {
  const [open, setOpen] = useState(false);
  const toggle = () =>
    setOpen((o) => {
      const next = !o;
      if (next) fireConfetti(70);
      return next;
    });

  return (
    <div className="surprise__card">
      <button
        className={`gift ${open ? "is-open" : ""}`}
        onClick={toggle}
        aria-label={open ? "Close the gift" : "Open the gift"}
      >
        <svg className="gift__teddy" viewBox="0 0 100 116" aria-hidden="true">
          <circle cx="28" cy="22" r="13" fill="#8a5a30" />
          <circle cx="72" cy="22" r="13" fill="#8a5a30" />
          <circle cx="28" cy="22" r="6" fill="#c58f57" />
          <circle cx="72" cy="22" r="6" fill="#c58f57" />
          <ellipse cx="50" cy="86" rx="24" ry="24" fill="#b07a4a" />
          <ellipse cx="50" cy="90" rx="14" ry="15" fill="#e8c9a0" />
          <ellipse cx="24" cy="78" rx="9" ry="12" fill="#8a5a30" />
          <ellipse cx="76" cy="78" rx="9" ry="12" fill="#8a5a30" />
          <ellipse cx="34" cy="108" rx="10" ry="8" fill="#8a5a30" />
          <ellipse cx="66" cy="108" rx="10" ry="8" fill="#8a5a30" />
          <circle cx="50" cy="40" r="26" fill="#b07a4a" />
          <ellipse cx="50" cy="49" rx="12" ry="9" fill="#e8c9a0" />
          <ellipse cx="50" cy="45" rx="3.4" ry="2.6" fill="#3a2417" />
          <path
            d="M50 47v4"
            stroke="#3a2417"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <circle cx="40" cy="37" r="3" fill="#3a2417" />
          <circle cx="60" cy="37" r="3" fill="#3a2417" />
          <path
            d="M50 93c-3-5-11-4-11 2 0 4 6 7 11 10 5-3 11-6 11-10 0-6-8-7-11-2z"
            fill="#ff6079"
          />
        </svg>
        <span className="gift__lid">
          <span className="gift__bow" />
        </span>
        <span className="gift__base">
          <span className="gift__ribbon" />
        </span>
      </button>
      <div className="surprise__cap">
        {open
          ? "A big birthday hug, just for you 🧸"
          : "Tap the gift to open it"}
      </div>
    </div>
  );
}

/* ---------------- Scratch card ---------------- */
function ScratchCard() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = wrap.getBoundingClientRect();
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const g = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    g.addColorStop(0, "#c9922e");
    g.addColorStop(0.5, "#ffe08a");
    g.addColorStop(1, "#c9922e");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, rect.width, rect.height);
    ctx.fillStyle = "rgba(60,40,5,.55)";
    ctx.font = '700 13px "Space Mono", monospace';
    ctx.textAlign = "center";
    ctx.fillText("✦ SCRATCH TO REVEAL ✦", rect.width / 2, rect.height / 2 + 4);

    let drawing = false;
    const at = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const scratch = (x: number, y: number) => {
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, 22, 0, Math.PI * 2);
      ctx.fill();
    };
    const check = () => {
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let cleared = 0;
      let total = 0;
      for (let i = 3; i < data.length; i += 4 * 40) {
        total++;
        if (data[i] === 0) cleared++;
      }
      if (total > 0 && cleared / total > 0.5) setRevealed(true);
    };
    const start = (e: PointerEvent) => {
      drawing = true;
      canvas.setPointerCapture(e.pointerId);
      const { x, y } = at(e);
      scratch(x, y);
    };
    const move = (e: PointerEvent) => {
      if (!drawing) return;
      const { x, y } = at(e);
      scratch(x, y);
      e.preventDefault();
    };
    const end = () => {
      if (!drawing) return;
      drawing = false;
      check();
    };

    canvas.addEventListener("pointerdown", start);
    canvas.addEventListener("pointermove", move);
    window.addEventListener("pointerup", end);
    return () => {
      canvas.removeEventListener("pointerdown", start);
      canvas.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", end);
    };
  }, []);

  return (
    <div className="surprise__card">
      <div className="scratch" ref={wrapRef}>
        <div className="scratch__note">
          ✨ You make every ordinary day feel like a celebration ✨
        </div>
        {!revealed && <canvas ref={canvasRef} className="scratch__canvas" />}
      </div>
      <div className="surprise__cap">
        {revealed ? "💛 Revealed!" : "Scratch the gold foil off"}
      </div>
    </div>
  );
}

/* ---------------- Balloon-pop game ---------------- */
const PHRASE = "HAPPY BIRTHDAY MANISH";
const LETTER_COUNT = PHRASE.replace(/ /g, "").length;
const HUES = ["gold", "pink", "purple", "teal", "rose"] as const;

interface GameBalloon {
  id: number;
  left: number;
  hue: string;
  dur: number;
  delay: number;
}

const randomBalloon = (): Omit<GameBalloon, 'id'> => ({
  left: 5 + Math.random() * 88,
  hue: HUES[(Math.random() * HUES.length) | 0],
  dur: 6 + Math.random() * 4,
  delay: Math.random() * 2.5,
});

function BalloonGame() {
  // ids 0..5 are the initial balloons; the ref hands out the next id in handlers
  const idRef = useRef(6);
  const make = (): GameBalloon => ({ id: idRef.current++, ...randomBalloon() });
  const [balloons, setBalloons] = useState<GameBalloon[]>(() =>
    Array.from({ length: 6 }, (_, i) => ({ id: i, ...randomBalloon() })),
  );
  const [popped, setPopped] = useState(0);
  const done = popped >= LETTER_COUNT;

  useEffect(() => {
    if (done) fireBarrage();
  }, [done]);

  const pop = (id: number) => {
    if (done) return;
    setPopped((p) => p + 1);
    setBalloons((bs) => bs.map((b) => (b.id === id ? make() : b)));
    fireConfetti(12);
  };

  let li = 0;
  const display = PHRASE.split("").map((ch) => {
    if (ch === " ") return " ";
    const shown = li < popped;
    li++;
    return shown ? ch : "•";
  });

  return (
    <div className="game">
      <div
        className="game__phrase"
        aria-label={`Progress: ${popped} of ${LETTER_COUNT} letters`}
      >
        {display.map((ch, i) => (
          <span
            key={i}
            className={`game__ch ${ch === "•" ? "is-hidden" : ""} ${ch === " " ? "is-space" : ""}`}
          >
            {ch === " " ? " " : ch}
          </span>
        ))}
      </div>
      <div className="game__field">
        {!done &&
          balloons.map((b) => (
            <button
              key={b.id}
              className={`gb gb--${b.hue}`}
              style={{
                left: `${b.left}%`,
                animationDuration: `${b.dur}s`,
                animationDelay: `${b.delay}s`,
              }}
              onClick={() => pop(b.id)}
              aria-label="Pop balloon"
            />
          ))}
        {done && (
          <div className="game__win">
            🎈 You spelled it! Happy Birthday, Manish! 🎉
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- Section ---------------- */
export function Surprises() {
  return (
    <section className="section surprises" id="surprises">
      <div className="wrap">
        <Reveal className="section__head">
          <span className="eyebrow">Just for Fun</span>
          <h2>
            Little <span className="gold-text">Surprises</span>
          </h2>
          <p>Tap, scratch and pop — a handful of playful gifts to unwrap.</p>
        </Reveal>

        <Reveal>
          <div className="surprise-grid">
            <CandleCake />
            <GiftBox />
            <ScratchCard />
          </div>
        </Reveal>

        <Reveal className="surprises__sub">
          <h3>Pop the balloons to spell it out</h3>
        </Reveal>
        <Reveal>
          <BalloonGame />
        </Reveal>
      </div>
    </section>
  );
}
