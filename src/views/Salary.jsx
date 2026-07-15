import { useState } from "react";
import { ArrowUpRight, Info, Eye, EyeSlash } from "@phosphor-icons/react";
import { salary, sources } from "../data";
import { Panel, PanelHead, Tag, Hand, CountUp, Reveal, rub, cn } from "../ui";

const SEG = ["var(--color-indigo)", "var(--color-mint)", "var(--color-amber)"];

export default function Salary() {
  const delta = (((salary.total - salary.prevTotal) / salary.prevTotal) * 100).toFixed(1);
  const max = Math.max(...salary.history.map((h) => h.v));
  const [hidden, setHidden] = useState(false);
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
      <Reveal className="lg:col-span-7">
        <Panel className="h-full">
          <PanelHead no="01" title="Начислено · Июль 2026" right="₽ на карту" />
          <div className="px-6 pb-6">
            <div className="flex items-end gap-3">
              <span className="text-[52px] font-800 leading-none tracking-tight sm:text-[64px]">
                {hidden ? "••• •••" : <CountUp to={salary.total} format={(v) => new Intl.NumberFormat("ru-RU").format(Math.round(v))} />}
              </span>
              <span className="pb-2.5 text-3xl font-600 text-ink-mute">₽</span>
              <button
                onClick={() => setHidden((h) => !h)}
                title={hidden ? "Показать" : "Скрыть"}
                className="mb-3 grid h-9 w-9 place-items-center rounded-full text-ink-mute transition-colors hover:bg-black/5 hover:text-ink-soft"
              >
                {hidden ? <Eye size={19} weight="regular" /> : <EyeSlash size={19} weight="regular" />}
              </button>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <span className="flex items-center gap-1 rounded-full bg-mint-soft px-2.5 py-1 text-mint">
                <ArrowUpRight size={13} weight="bold" /><span className="text-[12.5px] font-700">+{delta}%</span>
              </span>
              <Hand className="text-[20px] text-violet">лучший месяц в году!</Hand>
            </div>

            <div className="mt-7 flex h-3 w-full overflow-hidden rounded-full">
              {salary.breakdown.map((b, i) => (
                <div key={b.label} style={{ width: `${(b.amount / salary.total) * 100}%`, background: SEG[i] }} />
              ))}
            </div>
            <div className="mt-4 divide-y divide-black/[0.06]">
              {salary.breakdown.map((b, i) => (
                <div key={b.label} className="flex items-center gap-3 py-2.5">
                  <span className="h-3 w-3 rounded-full" style={{ background: SEG[i] }} />
                  <span className="flex-1 text-[14px] font-500">{b.label}</span>
                  <span className="text-[15px] font-700">{rub(b.amount)}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <Tag className="text-ink-soft">Выплата 05.08.2026</Tag>
              <div className="flex flex-wrap gap-1.5">
                {sources.map((s) => (
                  <span key={s} className="rounded-full bg-white/60 px-2.5 py-1 ring-1 ring-black/[0.05]"><Tag className="text-ink-mute">{s}</Tag></span>
                ))}
              </div>
            </div>
          </div>
        </Panel>
      </Reveal>

      <Reveal className="lg:col-span-5" delay={0.05}>
        <Panel tone="accent" className="flex h-full flex-col">
          <PanelHead no="02" title="Как считается" right="прозрачно" />
          <div className="flex flex-1 flex-col px-6 pb-6">
            <p className="flex items-start gap-2 text-[14px] font-500 leading-relaxed text-ink/80">
              <Info size={17} weight="fill" className="mt-0.5 shrink-0 text-ink/50" />
              Бонус зависит от выполнения плана — чем ближе к цели, тем выше ставка. Без «серых» коэффициентов.
            </p>
            <div className="mt-auto space-y-2 pt-6">
              {[["Оклад", "45 000 ₽"], ["92% плана × ставка", "+32 400 ₽"], ["Премия · наставник", "+10 000 ₽"]].map(([l, v]) => (
                <div key={l} className="flex items-center justify-between gap-3 rounded-2xl bg-white/55 px-4 py-2.5 ring-1 ring-white/50">
                  <span className="text-[13px] font-500">{l}</span>
                  <span className="shrink-0 whitespace-nowrap text-[13px] font-700">{v}</span>
                </div>
              ))}
              <div className="flex items-center justify-between gap-3 rounded-2xl bg-ink px-4 py-3 text-white">
                <span className="text-[13px] font-700">Итого</span>
                <span className="shrink-0 whitespace-nowrap text-[14px] font-700">{rub(salary.total)}</span>
              </div>
            </div>
          </div>
        </Panel>
      </Reveal>

      <Reveal className="lg:col-span-12" delay={0.1}>
        <Panel>
          <PanelHead no="03" title="Динамика за полгода" right="₽ / мес" />
          <div className="px-6 pb-6">
            <div className="flex items-end gap-3 sm:gap-5">
              {salary.history.map((h, i) => {
                const last = i === salary.history.length - 1;
                return (
                  <div key={h.m} className="flex flex-1 flex-col items-center gap-2.5">
                    <span className={cn("text-[12px] font-700", last ? "text-indigo" : "text-ink-mute")}>{Math.round(h.v / 1000)}к</span>
                    <div
                      className={cn("bar-grow w-full rounded-xl", last ? "bg-gradient-to-t from-indigo to-violet" : "bg-ink/[0.08]")}
                      style={{ "--h": `${(h.v / max) * 150 + 12}px`, height: `${(h.v / max) * 150 + 12}px`, animationDelay: `${0.15 + i * 0.06}s` }}
                    />
                    <span className="text-[11.5px] font-500 text-ink-mute">{h.m}</span>
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
