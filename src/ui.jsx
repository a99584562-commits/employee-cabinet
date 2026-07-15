import { useEffect, useState } from "react";

export const cn = (...a) => a.filter(Boolean).join(" ");

export const rub = (n) =>
  new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(n) + " ₽";

/* Russian plural: plural(34, ["день","дня","дней"]) → "дня" */
export const plural = (n, [one, few, many]) => {
  const m10 = n % 10;
  const m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return one;
  if (m10 >= 2 && m10 <= 4 && (m100 < 10 || m100 >= 20)) return few;
  return many;
};

/* Gentle fade-up + de-blur on mount — pure CSS, cannot stall */
export function Reveal({ children, delay = 0, className }) {
  return (
    <div className={cn("reveal", className)} style={{ animationDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

/* Double-bezel card: aluminium tray holding a glass plate */
export function Card({ children, className, inner, tint, hover = true }) {
  return (
    <div
      className={cn(
        "bezel-outer p-1.5 ring-1 ring-[--color-hairline]",
        "bg-gradient-to-b from-white/70 to-white/20 shadow-soft",
        hover && "transition-shadow duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-lift",
        className
      )}
    >
      <div
        className={cn(
          "bezel-inner h-full bg-surface",
          "shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)]",
          inner
        )}
        style={tint ? { background: tint } : undefined}
      >
        {children}
      </div>
    </div>
  );
}

/* Animated number — counts up on mount via plain rAF */
export function CountUp({ to, format = (v) => Math.round(v), className }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let raf;
    let startTs;
    const dur = 1100;
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

/* Circular progress ring — draws on mount via CSS animation */
export function Ring({ value, size = 64, stroke = 7, color = "var(--color-kpi)", track = "rgba(45,35,20,0.07)", children }) {
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

/* Linear progress bar — grows on mount via CSS animation */
export function Bar({ value, color = "var(--color-flame)", className }) {
  const w = `${Math.min(value, 100)}%`;
  return (
    <div className={cn("h-2 w-full overflow-hidden rounded-full bg-[rgba(45,35,20,0.07)]", className)}>
      <div className="bar-fill h-full rounded-full" style={{ "--w": w, width: w, background: color }} />
    </div>
  );
}
