import { TrendUp, Warning } from "@phosphor-icons/react";
import { teamMembers } from "../data";
import { Panel, PanelHead, Tag, Ring, Bar, Reveal, rub, cn } from "../ui";

const STATUS = {
  top: { label: "топ", color: "var(--color-mint)", soft: "var(--color-mint-soft)" },
  ok: { label: "в норме", color: "var(--color-sky)", soft: "var(--color-sky-soft)" },
  behind: { label: "отстаёт", color: "var(--color-pink)", soft: "var(--color-pink-soft)" },
};

const sum = (k) => teamMembers.reduce((a, m) => a + m[k], 0);
const avg = (k) => Math.round(sum(k) / teamMembers.length);

function Stat({ label, value, hint, ring }) {
  return (
    <div className="tile flex flex-col items-center gap-1 rounded-2xl px-3 py-4 text-center">
      {ring != null ? (
        <Ring value={ring} size={58} stroke={6}><span className="text-[14px] font-800">{value}</span></Ring>
      ) : (
        <span className="text-[22px] font-800 leading-tight">{value}</span>
      )}
      <div className="mt-1 text-[12px] font-700">{label}</div>
      {hint && <Tag className="text-ink-mute">{hint}</Tag>}
    </div>
  );
}

export default function Manager() {
  const planAvg = avg("planPct");
  const behind = teamMembers.filter((m) => m.status === "behind");
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
      {/* Dept summary */}
      <Reveal className="lg:col-span-12">
        <Panel>
          <PanelHead no="01" title="Сводка отдела · Июль" right="Команда Север" />
          <div className="grid grid-cols-2 gap-3 px-5 pb-5 sm:grid-cols-3 lg:grid-cols-6">
            <Stat label="План отдела" value={`${planAvg}%`} ring={Math.min(planAvg, 100)} hint="средн." />
            <Stat label="Выполнено" value="9.8 млн" hint="из 11 млн ₽" />
            <Stat label="Сделок" value={sum("deals")} hint="за месяц" />
            <Stat label="Конверсия" value={`${avg("conv")}%`} hint="средн." />
            <Stat label="Средний чек" value={`${Math.round(avg("avgCheck") / 1000)}к`} hint="₽" />
            <Stat label="Фонд ЗП" value={`${Math.round(sum("salary") / 1000)}к`} hint="₽ / мес" />
          </div>
        </Panel>
      </Reveal>

      {/* Attention */}
      <Reveal className="lg:col-span-4" delay={0.05}>
        <Panel className="h-full">
          <PanelHead no="02" title="Требуют внимания" right={`${behind.length}`} />
          <div className="px-4 pb-4">
            <div className="mb-3 flex items-center gap-2 rounded-2xl bg-pink-soft px-3.5 py-2.5 text-[12.5px] font-600 text-pink">
              <Warning size={17} weight="fill" /> Отстают от плана — стоит подключиться
            </div>
            <div className="space-y-2">
              {behind.map((m) => (
                <div key={m.name} className="tile flex items-center gap-3 rounded-2xl px-3 py-2.5">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-pink to-pink/70 text-[11px] font-700 text-white">{m.initials}</div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[13px] font-700">{m.name}</div>
                    <Tag className="text-ink-mute">{m.role}</Tag>
                  </div>
                  <span className="text-[14px] font-800 text-pink">{m.planPct}%</span>
                </div>
              ))}
            </div>
          </div>
        </Panel>
      </Reveal>

      {/* Team table */}
      <Reveal className="lg:col-span-8" delay={0.1}>
        <Panel className="h-full">
          <PanelHead no="03" title="Команда" right={`${teamMembers.length} человек`} />
          <div className="px-3 pb-3">
            <div className="hidden items-center gap-3 px-3 pb-2 sm:flex">
              <span className="w-[42%]"><Tag className="text-ink-mute">Сотрудник</Tag></span>
              <span className="flex-1"><Tag className="text-ink-mute">План</Tag></span>
              <span className="hidden w-14 text-right md:block"><Tag className="text-ink-mute">Сделки</Tag></span>
              <span className="w-20 text-right"><Tag className="text-ink-mute">ЗП</Tag></span>
              <span className="w-[74px]" />
            </div>
            <div className="space-y-1">
              {teamMembers.map((m) => {
                const st = STATUS[m.status];
                return (
                  <div key={m.name} className={cn("flex items-center gap-3 rounded-2xl px-3 py-2.5", m.me ? "bg-accent/[0.1] ring-1 ring-accent/20" : "transition-colors hover:bg-white/50 dark:hover:bg-white/[0.06]")}>
                    <div className="flex w-[42%] min-w-0 items-center gap-2.5">
                      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-accent to-accent-2 text-[11px] font-700 text-white">{m.initials}</div>
                      <div className="min-w-0">
                        <div className="truncate text-[13px] font-700">{m.name}{m.me && " · ты"}</div>
                        <Tag className="text-ink-mute">{m.role}</Tag>
                      </div>
                    </div>
                    <div className="flex flex-1 items-center gap-2">
                      <Bar value={m.planPct} color={st.color} className="h-1.5" />
                      <span className="w-9 shrink-0 text-[12px] font-700" style={{ color: st.color }}>{m.planPct}%</span>
                    </div>
                    <span className="hidden w-14 text-right text-[13px] font-700 md:block">{m.deals}</span>
                    <span className="w-20 text-right text-[13px] font-700">{rub(m.salary)}</span>
                    <span className="w-[74px] text-right">
                      <span className="rounded-full px-2 py-0.5 text-[10px] font-700 uppercase tracking-wide" style={{ color: st.color, background: st.soft }}>{st.label}</span>
                    </span>
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
