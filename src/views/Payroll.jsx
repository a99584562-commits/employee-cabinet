import { useEffect, useState } from "react";
import { Check, Coins } from "@phosphor-icons/react";
import { teamMembers } from "../data";
import { Panel, PanelHead, Tag, Portal, Reveal, rub, cn } from "../ui";

export default function Payroll() {
  const [paid, setPaid] = useState(() => new Set());
  const [toast, setToast] = useState(null);
  useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(null), 2400); return () => clearTimeout(t); }, [toast]);

  const fund = teamMembers.reduce((a, m) => a + m.salary, 0);
  const paidSum = teamMembers.filter((m) => paid.has(m.name)).reduce((a, m) => a + m.salary, 0);
  const left = teamMembers.length - paid.size;

  const pay = (name, sum) => { setPaid((s) => new Set(s).add(name)); setToast(`Выплачено ${rub(sum)} · ${name}`); };
  const payAll = () => { setPaid(new Set(teamMembers.map((m) => m.name))); setToast("Зарплата выплачена всем"); };

  return (
    <div className="grid grid-cols-1 gap-4">
      <Reveal>
        <Panel>
          <PanelHead no="01" title="Ведомость · Июль 2026" right="отдел продаж" />
          <div className="grid grid-cols-2 gap-3 px-5 pb-4 sm:grid-cols-4">
            {[["Фонд ЗП", `${Math.round(fund / 1000)}к ₽`, "ink"], ["Выплачено", `${Math.round(paidSum / 1000)}к ₽`, "mint"], ["К выплате", `${left}`, "amber"], ["Сотрудников", teamMembers.length, "sky"]].map(([l, v, c]) => (
              <div key={l} className="tile flex flex-col items-center rounded-2xl py-3.5 text-center">
                <span className="text-[19px] font-800" style={{ color: c === "ink" ? "var(--color-ink)" : `var(--color-${c})` }}>{v}</span>
                <Tag className="mt-0.5 text-ink-mute">{l}</Tag>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between px-5 pb-4">
            <Tag className="text-ink-mute">Начислено по данным 1С:ЗУП</Tag>
            <button onClick={payAll} disabled={left === 0} className={cn("flex items-center gap-1.5 rounded-full px-4 py-2 text-[12.5px] font-700 transition-transform active:scale-95", left === 0 ? "tile text-ink-mute" : "bg-mint text-white")}>
              <Coins size={15} weight="fill" /> {left === 0 ? "Всё выплачено" : "Выплатить всем"}
            </button>
          </div>

          <div className="px-3 pb-3">
            <div className="hidden items-center gap-3 px-3 pb-2 sm:flex">
              <span className="flex-1"><Tag className="text-ink-mute">Сотрудник</Tag></span>
              <span className="w-28 text-right"><Tag className="text-ink-mute">Начислено</Tag></span>
              <span className="w-32 text-right"><Tag className="text-ink-mute">Статус</Tag></span>
            </div>
            <div className="space-y-1">
              {teamMembers.map((m) => {
                const done = paid.has(m.name);
                return (
                  <div key={m.name} className="flex items-center gap-3 rounded-2xl px-3 py-2.5 transition-colors hover:bg-white/50 dark:hover:bg-white/[0.06]">
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-accent to-accent-2 text-[11px] font-700 text-white">{m.initials}</div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[13px] font-700">{m.name}{m.me && " · ты"}</div>
                      <Tag className="text-ink-mute">{m.role}</Tag>
                    </div>
                    <span className="w-28 text-right text-[14px] font-700">{rub(m.salary)}</span>
                    <div className="w-32 text-right">
                      {done ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-mint-soft px-3 py-1.5 text-[11.5px] font-700 text-mint"><Check size={13} weight="bold" /> Выплачено</span>
                      ) : (
                        <button onClick={() => pay(m.name, m.salary)} className="rounded-full bg-mint px-4 py-1.5 text-[12px] font-700 text-white transition-transform active:scale-95">Выплатить</button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Panel>
      </Reveal>

      {toast && (
        <Portal>
          <div className="slide-in fixed bottom-24 left-1/2 z-[110] flex -translate-x-1/2 items-center gap-2.5 rounded-full border panel-edge glass-strong px-4 py-2.5 shadow-lift md:bottom-8">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-mint text-white"><Check size={13} weight="bold" /></span>
            <span className="text-[13px] font-600">{toast}</span>
          </div>
        </Portal>
      )}
    </div>
  );
}
