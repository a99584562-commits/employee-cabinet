import { useEffect, useState } from "react";

export const cn = (...a) => a.filter(Boolean).join(" ");

export const rub = (n) =>
  new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(n) + " ₽";

export const plural = (n, [one, few, many]) => {
  const m10 = n % 10;
  const m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return one;
  if (m10 >= 2 && m10 <= 4 && (m100 < 10 || m100 >= 20)) return few;
  return many;
};

export function Reveal({ children, delay = 0, className }) {
  return (
    <div className={cn("reveal", className)} style={{ animationDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

/* Flat brutalist panel with hairline border */
const TONES = {
  card: "bg-card text-ink border-ink",
  paper: "bg-paper-2 text-ink border-ink",
  yellow: "bg-yellow text-ink border-ink",
  ink: "bg-ink text-paper border-ink",
  pink: "bg-pink text-ink border-ink",
  blue: "bg-blue text-paper border-ink",
};
export function Panel({ children, className, tone = "card" }) {
  return <div className={cn("border", TONES[tone], className)}>{children}</div>;
}

/* Mono technical label */
export function Tag({ children, className }) {
  return (
    <span className={cn("mono text-[10.5px] uppercase tracking-[0.18em]", className)}>{children}</span>
  );
}

/* Panel header: index + title + optional right meta */
export function PanelHead({ no, title, right, onDark }) {
  return (
    <div className={cn("flex items-center justify-between border-b px-5 py-3", onDark ? "border-paper/20" : "border-ink/12")}>
      <div className="flex items-center gap-2.5">
        <span className={cn("mono text-[11px]", onDark ? "text-yellow" : "text-mute")}>{no}</span>
        <Tag>{title}</Tag>
      </div>
      {right && <Tag className={onDark ? "text-paper/50" : "text-mute"}>{right}</Tag>}
    </div>
  );
}

/* Handwritten annotation */
export function Hand({ children, className }) {
  return <span className={cn("hand leading-none", className)}>{children}</span>;
}

/* Technical dot-matrix decoration (uses currentColor) */
export function DotGrid({ className, style }) {
  return <div className={cn("dotgrid", className)} style={style} aria-hidden />;
}

/* Scrolling marquee ticker */
export function Ticker({ items, tone = "ink", fast, className }) {
  const row = items.join("   ///   ");
  return (
    <div className={cn("overflow-hidden", tone === "ink" ? "bg-ink text-yellow" : "bg-yellow text-ink", className)}>
      <div className={cn("marquee py-1.5", fast && "marquee-fast")}>
        <span className="mono whitespace-pre pr-8 text-[11px] uppercase tracking-[0.22em]">{row}   ///   </span>
        <span className="mono whitespace-pre pr-8 text-[11px] uppercase tracking-[0.22em]" aria-hidden>{row}   ///   </span>
      </div>
    </div>
  );
}

/* Count-up number */
export function CountUp({ to, format = (v) => Math.round(v), className }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let raf;
    let startTs;
    const dur = 1000;
    const tick = (now) => {
      if (startTs === undefined) startTs = now;
      const t = Math.min(1, (now - startTs) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(to * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
      else setVal(to);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to]);
  return <span className={className}>{format(val)}</span>;
}

/* Circular progress ring */
export function Ring({ value, size = 64, stroke = 6, color = "var(--color-ink)", track = "rgba(16,16,16,0.12)", children }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const off = c - (Math.min(value, 100) / 100) * c;
  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
        <circle
          className="ring-draw"
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="butt"
          strokeDasharray={c}
          style={{ "--c": c, "--off": off, strokeDashoffset: off }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">{children}</div>
    </div>
  );
}

/* Linear progress bar */
export function Bar({ value, color = "var(--color-ink)", track = "rgba(16,16,16,0.12)", className }) {
  const w = `${Math.min(value, 100)}%`;
  return (
    <div className={cn("h-1.5 w-full overflow-hidden", className)} style={{ background: track }}>
      <div className="bar-fill h-full" style={{ "--w": w, width: w, background: color }} />
    </div>
  );
}
