import { useEffect, useRef } from "react";
import { clamp, hash, lerp, smoothstep as ss } from "../lib/motion";

const INK = "13,27,46";
const SIG = "255,90,31";

const CAPTIONS = [
  {
    h: "The glove sends.",
    p: "An insert sewn into the work glove emits a coded signal in a licence-free radio band.",
  },
  {
    h: "The panel compares.",
    p: "Each sensor at the edge of the sealed panel sees the signal slightly later and weaker. Phase and magnitude give the position. Move your pointer over the panel to press it yourself.",
  },
  {
    h: "Frost and water do not matter.",
    p: "In the cold and wet, a glass screen fogs and invents touches. The coded signal does not care how thick the glove is.",
  },
  {
    h: "Every press has a name.",
    p: "Each glove carries its own code, so the panel logs who pressed what. Move your pointer to press.",
  },
];
const STEPS = ["Send", "Compare", "Cold & wet", "Identify"];

type Ctx = CanvasRenderingContext2D;
type Pt = [number, number];

function roundRect(c: Ctx, x: number, y: number, w: number, h: number, r: number) {
  c.beginPath();
  c.moveTo(x + r, y);
  c.arcTo(x + w, y, x + w, y + h, r);
  c.arcTo(x + w, y + h, x, y + h, r);
  c.arcTo(x, y + h, x, y, r);
  c.arcTo(x, y, x + w, y, r);
  c.closePath();
}

function label(c: Ctx, t: string, x: number, y: number, alpha: number, size = 15) {
  c.globalAlpha = alpha;
  c.fillStyle = `rgb(${INK})`;
  c.font = `600 ${size}px "Geist", system-ui, sans-serif`;
  c.fillText(t, x, y);
  c.globalAlpha = 1;
}

function trail(c: Ctx, pts: Pt[], alpha: number) {
  const n = pts.length;
  for (let i = 1; i < n; i++) {
    c.strokeStyle = `rgba(${INK},${(i / n) * 0.85 * alpha})`;
    c.lineWidth = 1 + (i / n) * 6;
    c.lineCap = "round";
    c.beginPath();
    c.moveTo(pts[i - 1][0], pts[i - 1][1]);
    c.lineTo(pts[i][0], pts[i][1]);
    c.stroke();
  }
  if (n) {
    c.fillStyle = `rgba(${SIG},${alpha})`;
    c.beginPath();
    c.arc(pts[n - 1][0], pts[n - 1][1], 7, 0, Math.PI * 2);
    c.fill();
  }
}

/** Scroll-driven 2D story: send, compare, wet, write. */
export function SignalStory({ reduced }: { reduced: boolean }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const capRefs = useRef<(HTMLDivElement | null)[]>([]);
  const stepRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const cv = canvasRef.current;
    const c = cv?.getContext("2d");
    if (!section || !cv || !c) return;

    let W = 0;
    let H = 0;
    let D = 1;
    let cur = 0;
    let px: number | null = null;
    let py = 0;
    let tx0 = 330;
    let ty0 = 0;
    let raf = 0;
    const ink: Pt[] = [];

    const size = () => {
      D = Math.min(window.devicePixelRatio, 2);
      W = cv.clientWidth;
      H = cv.clientHeight;
      cv.width = W * D;
      cv.height = H * D;
    };
    const onMove = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect();
      px = e.clientX - r.left;
      py = e.clientY - r.top;
    };
    const onLeave = () => {
      px = null;
    };

    const draw = (p: number) => {
      c.setTransform(D, 0, 0, D, 0, 0);
      c.clearRect(0, 0, W, H);
      const s3 = ss(0.5, 0.58, p) * (1 - ss(0.74, 0.8, p));
      const a4 = ss(0.74, 0.82, p);
      const aArm = 1 - a4;
      const k = Math.min(W / 900, (H * 0.72) / 520);
      const sc = k * (1 - 0.38 * s3);
      const ox = W / 2 + s3 * W * 0.2;
      const oy = H * 0.52;

      const tx = p < 0.5 ? lerp(330, -180, ss(0.25, 0.5, p)) : lerp(-180, 200, ss(0.5, 0.75, p));
      const ty = Math.sin(p * 14) * 35 * ss(0.2, 0.4, p);
      if (px !== null && p > 0.2 && p < 0.74) {
        tx0 += (clamp((px - ox) / sc, -250, 390) - tx0) * 0.25;
        ty0 += (clamp((py - oy) / sc, -55, 55) - ty0) * 0.25;
      } else {
        tx0 = tx;
        ty0 = ty;
      }
      const TX = tx0;
      const TY = ty0;

      // Glass panel in the rain, inventing touches.
      const gw = Math.min(W * 0.34, 380);
      const gh = gw * 0.62;
      const gx = W * 0.06;
      const gy = oy - gh / 2 - 10;
      if (s3 > 0.01) {
        c.globalAlpha = s3;
        roundRect(c, gx, gy, gw, gh, 16);
        c.fillStyle = "rgba(255,255,255,.55)";
        c.fill();
        c.strokeStyle = `rgb(${INK})`;
        c.lineWidth = 1.5;
        c.stroke();
        c.globalAlpha = 1;
        const q = Math.floor(Math.max(0, p - 0.5) * 70);
        const ghosts = Math.max(0, Math.floor((p - 0.5) * 90));
        for (let i = 0; i < 3; i++) {
          const x = gx + 20 + hash(q * 3 + i) * (gw - 40);
          const y = gy + 20 + hash(q * 7 + i + 9) * (gh - 40);
          c.strokeStyle = `rgba(${SIG},${s3})`;
          c.lineWidth = 3;
          c.beginPath();
          c.moveTo(x - 8, y - 8);
          c.lineTo(x + 8, y + 8);
          c.moveTo(x + 8, y - 8);
          c.lineTo(x - 8, y + 8);
          c.stroke();
        }
        label(c, `Glass screen, false touches: ${ghosts}`, gx, gy + gh + 30, s3);
        label(c, "Hado, false touches: 0", ox - 120 * sc * 1.4, oy + 110 * sc * 1.6 + 20, s3);
        c.strokeStyle = `rgba(${INK},${0.4 * s3})`;
        c.lineWidth = 1.6;
        for (let i = 0; i < 70; i++) {
          const dx = hash(i) * W;
          const dy = (((hash(i + 50) * H + (p - 0.5) * H * 3 * (0.6 + hash(i + 9))) % H) + H) % H;
          c.beginPath();
          c.moveTo(dx, dy);
          c.lineTo(dx - 1, dy + 11);
          c.stroke();
        }
      }

      // Sealed panel, gloved finger with its insert, and the sensor strip.
      c.save();
      c.translate(ox, oy);
      c.scale(sc, sc);
      c.globalAlpha = aArm;
      const L = 2000;
      roundRect(c, -400, -70, 820, 140, 18);
      c.setLineDash([L, L]);
      c.lineDashOffset = L * (1 - ss(0, 0.1, p));
      c.strokeStyle = `rgb(${INK})`;
      c.lineWidth = 2.5;
      c.stroke();
      c.setLineDash([]);

      const wv = ss(0.12, 0.2, p);
      c.save();
      roundRect(c, -400, -70, 820, 140, 18);
      c.clip();
      for (let i = 0; i < 7; i++) {
        const r = (p * 900 + i * 70) % 490;
        c.strokeStyle = `rgba(${SIG},${(1 - r / 490) * 0.55 * wv})`;
        c.lineWidth = 2.5;
        c.beginPath();
        c.arc(TX, TY, r, 0, Math.PI * 2);
        c.stroke();
      }
      c.restore();

      const bz = ss(0.06, 0.14, p);
      const sa = ss(0.2, 0.3, p);
      const sensorsY = [-45, -15, 15, 45];
      c.fillStyle = `rgba(${INK},${bz})`;
      roundRect(c, -300, -80, 30, 160, 8);
      c.fill();
      sensorsY.forEach((sy) => {
        const g = clamp(1.3 - Math.hypot(TX + 285, TY - sy) / 600, 0, 1);
        c.strokeStyle = `rgba(${SIG},${0.35 * sa})`;
        c.lineWidth = 1.2;
        c.beginPath();
        c.moveTo(TX, TY);
        c.lineTo(-285, sy);
        c.stroke();
        c.fillStyle = `rgba(${SIG},${bz * (0.4 + 0.6 * g)})`;
        c.beginPath();
        c.arc(-285, sy, 4 + 8 * g * sa, 0, Math.PI * 2);
        c.fill();
      });

      const fa = ss(0.1, 0.18, p);
      const glove = ss(0.5, 0.58, p) * (1 - a4);
      const fx = TX + 90;
      const fy = -290 + (1 - fa) * -60;
      c.lineCap = "round";
      if (glove > 0.01) {
        c.strokeStyle = `rgba(${INK},${0.55 * glove})`;
        c.lineWidth = 36 + 40 * glove;
        c.beginPath();
        c.moveTo(fx, fy);
        c.lineTo(TX, TY);
        c.stroke();
      }
      c.strokeStyle = `rgba(${INK},${0.16 * fa})`;
      c.lineWidth = 36;
      c.beginPath();
      c.moveTo(fx, fy);
      c.lineTo(TX, TY);
      c.stroke();
      // Glove insert: a small tag on the back of the gloved finger.
      const rx = lerp(fx, TX, 0.42);
      const ry = lerp(fy, TY, 0.42);
      c.fillStyle = `rgba(${SIG},${fa})`;
      roundRect(c, rx - 16 - glove * 6, ry - 11, 32 + glove * 12, 22, 6);
      c.fill();
      c.fillStyle = `rgba(${SIG},${fa})`;
      c.beginPath();
      c.arc(TX, TY, 8, 0, Math.PI * 2);
      c.fill();
      label(c, glove > 0.5 ? "insulated glove" : "glove insert", rx + 34, ry + 4, fa);
      label(c, "sensors", -318, -96, bz);

      const so = ss(0.24, 0.3, p) * (1 - ss(0.48, 0.54, p));
      if (so > 0.01) {
        const d0 = Math.hypot(TX + 285, TY + 45);
        const A = clamp(1.1 - d0 / 900, 0.35, 1);
        const ph = d0 * 0.012;
        c.lineWidth = 2.5;
        c.strokeStyle = `rgba(${INK},${so * 0.5})`;
        c.beginPath();
        for (let i = -300; i <= 300; i += 6) {
          const yy = 190 + 30 * Math.sin(i * 0.05);
          if (i === -300) c.moveTo(i, yy);
          else c.lineTo(i, yy);
        }
        c.stroke();
        c.strokeStyle = `rgba(${SIG},${so})`;
        c.beginPath();
        for (let i = -300; i <= 300; i += 6) {
          const y2 = 190 + 30 * A * Math.sin(i * 0.05 - ph);
          if (i === -300) c.moveTo(i, y2);
          else c.lineTo(i, y2);
        }
        c.stroke();
        label(c, `phase ${(((ph % (Math.PI * 2)) * 180) / Math.PI).toFixed(0)} deg, level ${(A * 100).toFixed(0)}%`, -300, 250, so, 16);
      }
      c.restore();

      // Flat pad you can write on.
      if (a4 > 0.01) {
        const pw = Math.min(W * 0.72, 860);
        const ph2 = H * 0.46;
        const x0 = W / 2 - pw / 2;
        const y0 = H * 0.5 - ph2 / 2 + 40;
        c.globalAlpha = a4;
        roundRect(c, x0, y0, pw, ph2, 22);
        c.setLineDash([8, 8]);
        c.strokeStyle = `rgb(${INK})`;
        c.lineWidth = 1.5;
        c.stroke();
        c.setLineDash([]);
        c.globalAlpha = 1;
        if (px !== null) {
          ink.push([clamp(px, x0, x0 + pw), clamp(py, y0, y0 + ph2)]);
          if (ink.length > 80) ink.shift();
        } else if (ink.length) {
          ink.shift();
        }
        if (ink.length < 4) {
          const auto: Pt[] = [];
          for (let i = 0; i < 120; i++) {
            const tt = p * 50 - i * 0.05;
            auto.push([W / 2 + pw * 0.38 * Math.sin(tt * 1.3), y0 + ph2 / 2 + ph2 * 0.36 * Math.sin(tt * 1.9 + 1)]);
          }
          trail(c, auto, a4);
        } else {
          trail(c, ink, a4);
        }
        label(c, "Hado panel · press log: operator 07", x0, y0 - 12, a4);
      }

      c.fillStyle = `rgb(${SIG})`;
      c.fillRect(0, H - 3, W * p, 3);
    };

    const tick = () => {
      const r = section.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) {
        let t = clamp(-r.top / Math.max(1, r.height - window.innerHeight), 0, 1);
        if (reduced) t = 0.3;
        cur += (t - cur) * 0.16;
        if (Math.abs(t - cur) < 0.0003) cur = t;

        capRefs.current.forEach((el, i) => {
          if (!el) return;
          const a = i * 0.25;
          const b = a + 0.25;
          let v = ss(a - 0.0001, a + 0.04, cur) * (i < 3 ? 1 - ss(b - 0.04, b, cur) : 1);
          if (i === 0) v = 1 - ss(0.21, 0.25, cur);
          el.style.opacity = String(v);
          el.style.transform = `translateY(${(1 - v) * 14}px)`;
        });
        stepRefs.current.forEach((el, i) => {
          if (!el) return;
          el.style.setProperty("--f", String(clamp(t * 4 - i, 0, 1)));
          el.classList.toggle("is-active", t * 4 >= i && t * 4 < i + 1);
        });
        draw(cur);
      }
      raf = requestAnimationFrame(tick);
    };

    size();
    window.addEventListener("resize", size);
    cv.addEventListener("pointermove", onMove);
    cv.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", size);
      cv.removeEventListener("pointermove", onMove);
      cv.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced]);

  return (
    <div ref={sectionRef} className={reduced ? "relative h-svh" : "relative h-[560vh]"}>
      <div className="sticky top-0 h-svh overflow-hidden bg-bg">
        <canvas
          ref={canvasRef}
          className="block h-full w-full"
          aria-label="Scroll animation of the Hado signal path"
        />
        {CAPTIONS.map((cap, i) => (
          <div
            key={cap.h}
            ref={(el) => {
              capRefs.current[i] = el;
            }}
            className="pointer-events-none absolute top-21 right-5 left-5 max-w-none opacity-0 md:top-24 md:right-auto md:left-7 md:max-w-[360px]"
          >
            <h3 className="display m-0 mb-3 text-[clamp(34px,4.2vw,56px)] leading-[.98]">{cap.h}</h3>
            <p className="m-0 text-base text-mut">{cap.p}</p>
          </div>
        ))}
        <div className="absolute right-7 bottom-7 left-7 flex max-w-[560px] gap-3.5">
          {STEPS.map((s, i) => (
            <span
              key={s}
              ref={(el) => {
                stepRefs.current[i] = el;
              }}
              className="rail-step relative flex-1 border-t-2 border-line pt-2 text-[13px] text-mut transition-colors [&.is-active]:font-medium [&.is-active]:text-ink"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
