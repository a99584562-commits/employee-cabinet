import { TrendUp, Info, Wallet, Coins } from "@phosphor-icons/react";
import { salary, sources } from "../data";
import { Card, CountUp, Bar, Reveal, rub, cn } from "../ui";

const TONE = { ink: "var(--color-ink)", money: "var(--color-money)", flame: "var(--color-flame)" };

export default function Salary() {
  const delta = (((salary.total - salary.prevTotal) / salary.prevTotal) * 100).toFixed(1);
  const max = Math.max(...salary.history.map((h) => h.v));
  return (
    <div className="grid gap-4 lg:grid-cols-12 lg:auto-rows-min">
      {/* Hero total */}
      <Reveal className="lg:col-span-7">
        <Card>
          <div className="p-7">
            <div className="flex items-center gap-2 text-[11px] font-700 uppercase tracking-[0.18em] text-ink-mute">
              <Wallet size={15} weight="fill" /> Начислено за {salary.month}
            </div>
            <div className="mt-4 flex items-end gap-3">
              <span className="font-display text-[52px] font-600 leading-none tracking-tight sm:text-[64px]">
                <CountUp to={salary.total} format={(v) => new Intl.NumberFormat("ru-RU").format(Math.round(v))} />
              </span>
              <span className="pb-2 font-display text-3xl text-ink-mute">₽</span>
              <span className="mb-2 flex items-center gap-1 rounded-full bg-money-soft px-2.5 py-1 text-[12px] font-700 text-money">
                <TrendUp size={14} weight="bold" /> +{delta}%
              </span>
            </div>

            <div className="mt-7 flex h-3 w-full overflow-hidden rounded-full">
              {salary.breakdown.map((b) => (
                <div key={b.label} style={{ width: `${(b.amount / salary.total) * 100}%`, background: TONE[b.tone] }} />
              ))}
            </div>
            <div className="mt-4 flex flex-col gap-2.5">
              {salary.breakdown.map((b) => (
                <div key={b.label} className="flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full" style={{ background: TONE[b.tone] }} />
                  <span className="flex-1 text-[14px] font-500 text-ink-soft">{b.label}</span>
                  <span className="text-[15px] font-700">{rub(b.amount)}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 flex items-center justify-between border-t border-[--color-hairline] pt-4">
              <span className="text-[13px] font-600 text-ink-soft">Выплата {salary.payday}</span>
              <span className="flex flex-wrap gap-1.5">
                {sources.slice(0, 2).map((s) => (
                  <span key={s} className="rounded-full bg-surface-2 px-2.5 py-1 text-[11px] font-600 text-ink-mute ring-1 ring-[--color-hairline]">{s}</span>
                ))}
              </span>
            </div>
          </div>
        </Card>
      </Reveal>

      {/* How it's calculated — transparency */}
      <Reveal className="lg:col-span-5" delay={0.06}>
        <Card inner="bg-gradient-to-br from-money-soft to-surface">
          <div className="flex h-full flex-col p-7">
            <div className="flex items-center gap-2 text-[11px] font-700 uppercase tracking-[0.18em] text-ink-mute">
              <Info size={15} weight="fill" /> Как считается
            </div>
            <p className="mt-4 text-[14px] font-500 leading-relaxed text-ink-soft">
              Бонус зависит от выполнения плана — чем ближе к цели, тем выше ставка. Всё прозрачно, без «серых» коэффициентов.
            </p>
            <div className="mt-auto space-y-2 pt-6 font-display text-[13px]">
              <div className="flex items-center justify-between gap-3 rounded-xl bg-surface px-3.5 py-2.5 ring-1 ring-[--color-hairline]">
                <span className="text-ink-soft">Оклад</span><span className="shrink-0 whitespace-nowrap font-600">45 000 ₽</span>
              </div>
              <div className="flex items-center justify-between gap-3 rounded-xl bg-surface px-3.5 py-2.5 ring-1 ring-[--color-hairline]">
                <span className="leading-tight text-ink-soft">92% плана × ставка</span><span className="shrink-0 whitespace-nowrap font-600 text-money">+32 400 ₽</span>
              </div>
              <div className="flex items-center justify-between gap-3 rounded-xl bg-surface px-3.5 py-2.5 ring-1 ring-[--color-hairline]">
                <span className="leading-tight text-ink-soft">Премия · наставник</span><span className="shrink-0 whitespace-nowrap font-600 text-flame">+10 000 ₽</span>
              </div>
              <div className="flex items-center justify-between gap-3 rounded-xl bg-ink px-3.5 py-3 text-canvas">
                <span className="font-500">Итого</span><span className="shrink-0 whitespace-nowrap font-700">{rub(salary.total)}</span>
              </div>
            </div>
          </div>
        </Card>
      </Reveal>

      {/* History */}
      <Reveal className="lg:col-span-12" delay={0.1}>
        <Card>
          <div className="p-7">
            <div className="mb-6 flex items-center gap-2 text-[11px] font-700 uppercase tracking-[0.18em] text-ink-mute">
              <Coins size={15} weight="fill" /> Динамика за полгода
            </div>
            <div className="flex items-end gap-3 sm:gap-5">
              {salary.history.map((h, i) => {
                const last = i === salary.history.length - 1;
                return (
                  <div key={h.m} className="flex flex-1 flex-col items-center gap-3">
                    <span className={cn("text-[12px] font-700", last ? "text-ink" : "text-ink-mute")}>
                      {Math.round(h.v / 1000)}к
                    </span>
                    <div
                      className={cn("bar-grow w-full rounded-xl", last ? "bg-ink" : "bg-[rgba(45,35,20,0.12)]")}
                      style={{ "--h": `${(h.v / max) * 150 + 12}px`, height: `${(h.v / max) * 150 + 12}px`, animationDelay: `${0.2 + i * 0.07}s` }}
                    />
                    <span className="text-[12px] font-600 text-ink-mute">{h.m}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      </Reveal>
    </div>
  );
}
