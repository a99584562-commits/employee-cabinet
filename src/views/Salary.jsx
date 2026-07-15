import { ArrowUpRight } from "@phosphor-icons/react";
import { salary, sources } from "../data";
import { Panel, PanelHead, Tag, Hand, DotGrid, CountUp, Reveal, rub, cn } from "../ui";

const SEG = { ink: "var(--color-ink)", yellow: "var(--color-yellow)", pink: "var(--color-pink)" };
const segTone = ["ink", "yellow", "pink"];

export default function Salary() {
  const delta = (((salary.total - salary.prevTotal) / salary.prevTotal) * 100).toFixed(1);
  const max = Math.max(...salary.history.map((h) => h.v));
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
      {/* Total */}
      <Reveal className="lg:col-span-7">
        <Panel className="h-full">
          <PanelHead no="01" title="Начислено · Июль 2026" right="NET · RUB" />
          <div className="relative p-6">
            <DotGrid className="pointer-events-none absolute right-5 top-5 h-10 w-20 text-ink/15" />
            <div className="flex items-end gap-3">
              <span className="text-[54px] font-800 leading-none tracking-tight sm:text-[68px]">
                <CountUp to={salary.total} format={(v) => new Intl.NumberFormat("ru-RU").format(Math.round(v))} />
              </span>
              <span className="mono pb-2.5 text-3xl text-mute">₽</span>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <span className="flex items-center gap-1 border border-ink bg-yellow px-2 py-1">
                <ArrowUpRight size={13} weight="bold" /><span className="mono text-[12px] font-700">+{delta}%</span>
              </span>
              <Hand className="text-[20px] text-pink -rotate-2">лучший месяц в году!</Hand>
            </div>

            <div className="mt-7 flex h-3.5 w-full border border-ink">
              {salary.breakdown.map((b, i) => (
                <div key={b.label} className={cn(i > 0 && "border-l border-ink")} style={{ width: `${(b.amount / salary.total) * 100}%`, background: SEG[segTone[i]] }} />
              ))}
            </div>
            <div className="mt-4 divide-y divide-ink/12 border-y border-ink/12">
              {salary.breakdown.map((b, i) => (
                <div key={b.label} className="flex items-center gap-3 py-2.5">
                  <span className="h-3 w-3 border border-ink" style={{ background: SEG[segTone[i]] }} />
                  <span className="flex-1 text-[14px] font-500">{b.label}</span>
                  <span className="mono text-[14px] font-700">{rub(b.amount)}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <Tag>Выплата 05.08.2026</Tag>
              <div className="flex flex-wrap gap-1.5">
                {sources.map((s) => (
                  <span key={s} className="border border-ink px-2 py-0.5"><Tag>{s}</Tag></span>
                ))}
              </div>
            </div>
          </div>
        </Panel>
      </Reveal>

      {/* How it's calculated */}
      <Reveal className="lg:col-span-5" delay={0.05}>
        <Panel tone="yellow" className="flex h-full flex-col">
          <PanelHead no="02" title="Как считается" right="FORMULA" />
          <div className="flex flex-1 flex-col p-6">
            <p className="text-[14px] font-500 leading-relaxed">
              Бонус зависит от выполнения плана — чем ближе к цели, тем выше ставка. Без «серых» коэффициентов.
            </p>
            <div className="mt-auto space-y-2 pt-6">
              {[
                ["Оклад", "45 000 ₽", ""],
                ["92% плана × ставка", "+32 400 ₽", ""],
                ["Премия · наставник", "+10 000 ₽", ""],
              ].map(([l, v]) => (
                <div key={l} className="flex items-center justify-between gap-3 border border-ink bg-card px-3.5 py-2.5">
                  <span className="text-[13px] font-500">{l}</span>
                  <span className="mono shrink-0 text-[13px] font-700">{v}</span>
                </div>
              ))}
              <div className="flex items-center justify-between gap-3 border border-ink bg-ink px-3.5 py-3 text-paper">
                <span className="text-[13px] font-700 uppercase">Итого</span>
                <span className="mono shrink-0 text-[14px] font-700">{rub(salary.total)}</span>
              </div>
            </div>
          </div>
        </Panel>
      </Reveal>

      {/* History */}
      <Reveal className="lg:col-span-12" delay={0.1}>
        <Panel>
          <PanelHead no="03" title="Динамика за полгода" right="₽ / МЕС" />
          <div className="p-6">
            <div className="flex items-end gap-3 sm:gap-5">
              {salary.history.map((h, i) => {
                const last = i === salary.history.length - 1;
                return (
                  <div key={h.m} className="flex flex-1 flex-col items-center gap-2.5">
                    <span className={cn("mono text-[12px]", last ? "font-700" : "text-mute")}>{Math.round(h.v / 1000)}к</span>
                    <div
                      className={cn("bar-grow w-full border border-ink", last ? "bg-yellow" : "bg-ink/10")}
                      style={{ "--h": `${(h.v / max) * 150 + 12}px`, height: `${(h.v / max) * 150 + 12}px`, animationDelay: `${0.15 + i * 0.06}s` }}
                    />
                    <span className="mono text-[11px] uppercase text-mute">{h.m}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </Panel>
      </Reveal>
    </div>
  );
}
