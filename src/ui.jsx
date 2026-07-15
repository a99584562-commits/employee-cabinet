import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import {
  Trophy, GraduationCap, Lightning, Fire, Target, Diamond, Crown, Rocket, Lock,
  Package, PuzzlePiece, Handshake, Gear, BookOpen, Phone, Brain, ChatCircleDots, Coins, Medal, Star,
  UmbrellaSimple, FileText, Clock, CalendarBlank, EnvelopeSimple, Buildings, MapPin, Cake, IdentificationBadge, Check, Minus,
} from "@phosphor-icons/react";

const ICONS = {
  package: Package, puzzle: PuzzlePiece, handshake: Handshake, gear: Gear,
  book: BookOpen, phone: Phone, brain: Brain, chat: ChatCircleDots,
  coins: Coins, medal: Medal, cap: GraduationCap, star: Star,
  umbrella: UmbrellaSimple, file: FileText, clock: Clock, calendar: CalendarBlank,
  mail: EnvelopeSimple, building: Buildings, pin: MapPin, cake: Cake, id: IdentificationBadge,
};

/* Soft coloured icon tile (replaces emoji) */
export function IconTile({ icon, tone = "indigo", size = 44, rounded = "rounded-xl", className }) {
  const Icon = ICONS[icon] ?? Package;
  return (
    <div
      className={cn("grid shrink-0 place-items-center", rounded, className)}
      style={{ width: size, height: size, background: `var(--color-${tone}-soft)`, color: `var(--color-${tone})` }}
    >
      <Icon size={Math.round(size * 0.52)} weight="duotone" />
    </div>
  );
}

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
  card: "glass panel-edge text-ink",
  strong: "glass-strong panel-edge text-ink",
  accent: "glass-accent panel-edge text-ink",
  dark: "glass-dark border-white/10 text-white",
};
export function Panel({ children, className, tone = "card", lift = true }) {
  return (
    <div className={cn("overflow-hidden rounded-[26px] border shadow-soft", lift && "panel-lift hover:shadow-lift", TONES[tone], className)}>
      {children}
    </div>
  );
}

/* Renders children into <body>, escaping any transformed ancestor */
export function Portal({ children }) {
  if (typeof document === "undefined") return null;
  return createPortal(children, document.body);
}

/* Glass modal */
export function Modal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <Portal>
      <div className="fixed inset-0 z-[100] grid place-items-center p-4">
        <div className="fade-in absolute inset-0 bg-ink/40 backdrop-blur-[3px]" onClick={onClose} />
        <div className="glass-strong pop relative w-full max-w-sm overflow-hidden rounded-[28px] border panel-edge p-6 text-center shadow-lift">
          {children}
        </div>
      </div>
    </Portal>
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

/* Toggle switch — knob carries a state icon */
export function Switch({ on, onChange }) {
  return (
    <button
      onClick={onChange}
      role="switch"
      aria-checked={on}
      className={cn(
        "relative h-[26px] w-[46px] shrink-0 rounded-full transition-colors duration-300",
        on ? "bg-gradient-to-r from-accent to-accent-2 shadow-[inset_0_1px_2px_rgba(255,255,255,0.4)]" : "bg-ink/[0.13] shadow-[inset_0_1px_2px_rgba(20,15,40,0.12)] dark:bg-white/[0.14]"
      )}
    >
      <span
        className={cn(
          "absolute left-[2px] top-[2px] grid h-[22px] w-[22px] place-items-center rounded-full bg-white shadow-[0_1px_3px_rgba(20,15,40,0.28)] transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
          on ? "translate-x-[20px]" : "translate-x-0"
        )}
      >
        {on ? <Check size={12} weight="bold" className="text-accent" /> : <Minus size={12} weight="bold" className="text-ink-mute" />}
      </span>
    </button>
  );
}

/* ————— Achievement medal (custom SVG, not emoji) ————— */
const BADGE_ICONS = { trophy: Trophy, cap: GraduationCap, bolt: Lightning, fire: Fire, target: Target, diamond: Diamond, crown: Crown, rocket: Rocket };
const TIERS = {
  legendary: { c1: "#FFEDB0", c2: "#F3BA4A", c3: "#C57F1C", rim: "#9E620C", glow: "rgba(243,178,74,0.60)", chip: "var(--color-amber)" },
  rare: { c1: "#DcC9FF", c2: "#9B6BF5", c3: "#6D28D9", rim: "#571FA8", glow: "rgba(140,90,245,0.52)", chip: "var(--color-violet)" },
  common: { c1: "#F5F8FF", c2: "#C6D2EA", c3: "#93A3C6", rim: "#7A8AAD", glow: "rgba(120,150,220,0.34)", chip: "var(--color-sky)" },
};
const LOCKED = { c1: "#EFEDF4", c2: "#DEDBE8", c3: "#CAC6D6", rim: "#BFBACC", glow: "transparent" };

export const tierMeta = (tier) => TIERS[tier] ?? TIERS.common;

export function Badge({ icon, tier = "common", earned = true, size = 76, onClick }) {
  const uid = useId().replace(/:/g, "");
  const Comp = onClick ? "button" : "div";
  const t = earned ? (TIERS[tier] ?? TIERS.common) : LOCKED;
  const Icon = BADGE_ICONS[icon] ?? Trophy;
  const bumps = Array.from({ length: 12 }, (_, i) => {
    const a = (i / 12) * Math.PI * 2;
    return [50 + Math.cos(a) * 34, 50 + Math.sin(a) * 34];
  });
  return (
    <Comp
      onClick={onClick}
      className={cn("group relative block shrink-0", onClick && "cursor-pointer outline-none")}
      style={{ width: size, height: size }}
    >
      {earned && (
        <div
          className="absolute inset-[16%] rounded-full blur-[10px] transition-all duration-500 group-hover:scale-125 group-hover:brightness-110"
          style={{ background: t.glow }}
        />
      )}
      <div className="relative h-full w-full transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-y-1 group-hover:scale-[1.06] group-hover:-rotate-[5deg]">
        <svg viewBox="0 0 100 100" width={size} height={size} className="block">
          <defs>
            <radialGradient id={`f${uid}`} cx="50%" cy="30%" r="75%">
              <stop offset="0%" stopColor={t.c1} />
              <stop offset="55%" stopColor={t.c2} />
              <stop offset="100%" stopColor={t.c3} />
            </radialGradient>
          </defs>
          {bumps.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="7" fill={t.c2} />
          ))}
          <circle cx="50" cy="50" r="35" fill={t.rim} />
          <circle cx="50" cy="50" r="32" fill={`url(#f${uid})`} />
          <circle cx="50" cy="50" r="25.5" fill="none" stroke="rgba(255,255,255,0.42)" strokeWidth="1.6" />
          <ellipse cx="50" cy="33" rx="21" ry="11" fill="rgba(255,255,255,0.30)" />
        </svg>
        <div
          className="absolute inset-0 grid place-items-center"
          style={{ filter: earned ? "drop-shadow(0 1px 1.5px rgba(60,40,10,0.30))" : "none" }}
        >
          <Icon size={size * 0.4} weight="fill" color={earned ? "#fff" : "#B4AFC0"} />
        </div>
        {!earned && (
          <div className="absolute bottom-0 right-0 grid place-items-center rounded-full bg-obsidian ring-2 ring-white/80" style={{ height: size * 0.3, width: size * 0.3 }}>
            <Lock size={size * 0.15} weight="fill" color="#fff" />
          </div>
        )}
      </div>
    </Comp>
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
export function Ring({ value, size = 66, stroke = 7, color = "var(--color-accent)", track = "var(--ring-track)", children }) {
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
export function Bar({ value, color = "var(--color-accent)", track = "var(--ring-track)", className }) {
  const w = `${Math.min(value, 100)}%`;
  return (
    <div className={cn("h-2 w-full overflow-hidden rounded-full", className)} style={{ background: track }}>
      <div className="bar-fill h-full rounded-full" style={{ "--w": w, width: w, background: color }} />
    </div>
  );
}
