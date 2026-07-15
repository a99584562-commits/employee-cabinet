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

/* Frosted glass panel */
const TONES = {
  card: "glass border-white/70 ring-1 ring-black/[0.04] text-ink",
  strong: "glass-strong border-white/80 ring-1 ring-black/[0.04] text-ink",
  accent: "glass-accent border-white/50 ring-1 ring-white/30 text-ink",
  dark: "glass-dark border-white/10 text-white",
};
export function Panel({ children, className, tone = "card" }) {
  return (
    <div className={cn("overflow-hidden rounded-[26px] border shadow-soft", TONES[tone], className)}>
      {children}
    </div>
  );
}

/* Soft uppercase label */
export function Tag({ children, className }) {
  return (
    <span className={cn("text-[11px] font-700 uppercase tracking-[0.13em]", className)}>{children}</span>
  );
}

/* Panel header: soft index chip + title + right meta */
export function PanelHead({ no, title, right, onDark }) {
  return (
    <div className="flex items-center justify-between px-5 pt-4 pb-3">
      <div className="flex items-center gap-2.5">
        {no && (
          <span className={cn("grid h-5 min-w-[20px] place-items-center rounded-full px-1.5 text-[10px] font-700",
            onDark ? "bg-white/15 text-white/80" : "bg-ink/[0.06] text-ink-soft")}>
            {no}
          </span>
        )}
        <Tag className={onDark ? "text-white/60" : "text-ink-mute"}>{title}</Tag>
      </div>
      {right && <Tag className={onDark ? "text-white/45" : "text-ink-mute"}>{right}</Tag>}
    </div>
  );
}

/* Handwritten accent */
export function Hand({ children, className }) {
  return <span className={cn("font-hand leading-none", className)}>{children}</span>;
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
export function Ring({ value, size = 66, stroke = 7, color = "var(--color-indigo)", track = "rgba(35,32,48,0.08)", children }) {
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
          strokeLinecap="round"
          strokeDasharray={c}
          style={{ "--c": c, "--off": off, strokeDashoffset: off }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">{children}</div>
    </div>
  );
}

/* Linear progress bar */
export function Bar({ value, color = "var(--color-indigo)", track = "rgba(35,32,48,0.09)", className }) {
  const w = `${Math.min(value, 100)}%`;
  return (
    <div className={cn("h-2 w-full overflow-hidden rounded-full", className)} style={{ background: track }}>
      <div className="bar-fill h-full rounded-full" style={{ "--w": w, width: w, background: color }} />
    </div>
  );
}
