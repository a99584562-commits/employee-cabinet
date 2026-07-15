import { TrendDown, TrendUp, Users, UserPlus, Smiley, Coins, Warning } from "@phosphor-icons/react";
import { analytics as A } from "../data";
import { Panel, PanelHead, Tag, Reveal, cn } from "../ui";

function Stat({ Icon, label, value, sub, tone = "ink", up }) {
  return (
    <div className="tile flex flex-col gap-1 rounded-2xl p-4">
      <div className="flex items-center justify-between">
        <span className="grid h-8 w-8 place-items-center rounded-xl" style={{ background: `var(--color-${tone === "ink" ? "accent" : tone}-soft)`, color: `var(--color-${tone === "ink" ? "accent" : tone})` }}><Icon size={17} weight="duotone" /></span>
        {sub && <span className={cn("flex items-center gap-0.5 text-[11px] font-700", up === false ? "text-mint" : up === true ? "text-pink" : "text-ink-mute")}>{up === false ? <TrendDown size={12} weight="bold" /> : up === true ? <TrendUp size={12} weight="bold" /> : null}{sub}</span>}
      </div>
      <div className="mt-1 text-[24px] font-800 leading-none">{value}</div>
      <Tag className="text-ink-mute">{label}</Tag>
    </div>
  );
}

function TurnoverChart() {
  const s = A.turnoverSeries;
  const W = 320, H = 96, pad = 14;
  const max = Math.max(...s.map((x) => x.v)) + 0.5, min = Math.min(...s.map((x) => x.v)) - 0.5;
  const pts = s.map((x, i) => [pad + (i / (s.length - 1)) * (W - pad * 2), H - pad - ((x.v - min) / (max - min)) * (H - pad * 2)]);
  const line = pts.map((p) => p.join(",")).join(" ");
  const area = `${pad},${H - pad} ${line} ${W - pad},${H - pad}`;
  return (
    <svg viewBox={`0 0 ${W} ${H + 16}`} className="w-full">
      <defs><linearGradient id="tg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.25" /><stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" /></linearGradient></defs>
      <polygon points={area} fill="url(#tg)" />
      <polyline points={line} fill="none" stroke="var(--color-accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {pts.map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r={i === pts.length - 1 ? 4 : 2.5} fill="var(--color-accent)" />)}
      {s.map((x, i) => <text key={i} x={pts[i][0]} y={H + 8} textAnchor="middle" className="fill-[var(--color-ink-mute)] text-[9px]" style={{ fontFamily: "var(--font-sans)" }}>{x.m}</text>)}
    </svg>
  );
}

export default function Analytics() {
  const maxFot = Math.max(...A.fotByDept.map((d) => d.v));
  const maxTen = Math.max(...A.tenure.map((d) => d.v));
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
      <Reveal className="lg:col-span-12">
        <Panel>
          <PanelHead no="01" title="HR-аналитика · компания" right="Июль 2026" />
          <div className="grid grid-cols-2 gap-3 px-5 pb-5 md:grid-cols-3 lg:grid-cols-6">
            <Stat Icon={Users} label="Штат" value={A.headcount} sub="чел" tone="indigo" />
            <Stat Icon={UserPlus} label="Найм / мес" value={`+${A.hires}`} tone="mint" />
            <Stat Icon={TrendDown} label="Текучесть" value={`${A.turnover}%`} sub={`${A.turnoverTrend}%`} up={false} tone="amber" />
            <Stat Icon={Smiley} label="eNPS" value={`+${A.enps}`} sub="вовлечённость" tone="pink" />
            <Stat Icon={Users} label="Укомплект." value={`${A.staffing}%`} tone="sky" />
            <Stat Icon={Coins} label="ФОТ / мес" value={`${A.fot} млн`} tone="teal" />
          </div>
        </Panel>
      </Reveal>

      <Reveal className="lg:col-span-7" delay={0.05}>
        <Panel className="h-full">
          <PanelHead no="02" title="Текучесть · динамика" right="% / мес" />
          <div className="px-5 pb-5"><TurnoverChart /></div>
        </Panel>
      </Reveal>

      <Reveal className="lg:col-span-5" delay={0.08}>
        <Panel className="h-full">
          <PanelHead no="03" title="ФОТ по отделам" right="млн ₽" />
          <div className="space-y-2.5 px-5 pb-5">
            {A.fotByDept.map((d) => (
              <div key={d.dept} className="flex items-center gap-3">
                <span className="w-28 shrink-0 truncate text-[12.5px] font-600">{d.dept}</span>
                <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-ink/[0.06] dark:bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-accent to-accent-2" style={{ width: `${(d.v / maxFot) * 100}%` }} /></div>
                <span className="w-10 shrink-0 text-right text-[12.5px] font-700">{d.v}</span>
              </div>
            ))}
          </div>
        </Panel>
      </Reveal>

      <Reveal className="lg:col-span-4" delay={0.1}>
        <Panel className="h-full">
          <PanelHead no="04" title="Стаж в компании" right="чел" />
          <div className="space-y-2.5 px-5 pb-5">
            {A.tenure.map((d) => (
              <div key={d.label} className="flex items-center gap-3">
                <span className="w-20 shrink-0 text-[12px] text-ink-soft">{d.label}</span>
                <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-ink/[0.06] dark:bg-white/10"><div className="h-full rounded-full bg-teal" style={{ width: `${(d.v / maxTen) * 100}%` }} /></div>
                <span className="w-8 shrink-0 text-right text-[12.5px] font-700">{d.v}</span>
              </div>
            ))}
          </div>
        </Panel>
      </Reveal>

      <Reveal className="lg:col-span-8" delay={0.12}>
        <Panel className="h-full">
          <PanelHead no="05" title="Зона риска увольнений" right={`${A.risk.length}`} />
          <div className="px-4 pb-4">
            <div className="mb-3 flex items-center gap-2 rounded-2xl bg-pink-soft px-3.5 py-2.5 text-[12.5px] font-600 text-pink"><Warning size={17} weight="fill" /> Прогноз по вовлечённости, плану и росту ЗП</div>
            <div className="space-y-2">
              {A.risk.map((r) => (
                <div key={r.name} className="tile flex items-center gap-3 rounded-2xl p-3">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-accent to-accent-2 text-[11px] font-700 text-white">{r.initials}</div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[13px] font-700">{r.name} <span className="font-500 text-ink-mute">· {r.dept}</span></div>
                    <div className="truncate text-[11.5px] text-ink-soft">{r.reason}</div>
                  </div>
                  <span className={cn("shrink-0 rounded-full px-2.5 py-1 text-[10.5px] font-700 uppercase tracking-wide", r.level === "high" ? "bg-pink-soft text-pink" : "bg-amber-soft text-amber")}>{r.level === "high" ? "высокий" : "средний"}</span>
                </div>
              ))}
            </div>
          </div>
        </Panel>
      </Reveal>
    </div>
  );
}
