import { useEffect, useState } from "react";
import { Check, ArrowsClockwise, Gear } from "@phosphor-icons/react";
import { integrations } from "../data";
import { Panel, PanelHead, Tag, IconTile, Switch, Portal, Reveal, cn } from "../ui";

export default function Integrations() {
  const [list, setList] = useState(() => integrations.map((i) => ({ ...i })));
  const [toast, setToast] = useState(null);
  useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(null), 2400); return () => clearTimeout(t); }, [toast]);
  const on = list.filter((i) => i.connected).length;
  const toggle = (id) => setList((l) => l.map((i) => {
    if (i.id !== id) return i;
    const next = !i.connected;
    setToast(`${i.name} — ${next ? "подключено" : "отключено"}`);
    return { ...i, connected: next, sync: next ? "только что" : "" };
  }));

  return (
    <div className="grid grid-cols-1 gap-4">
      <Reveal>
        <Panel>
          <PanelHead no="01" title="Интеграции" right={`${on}/${list.length} подключено`} />
          <div className="grid gap-3 px-5 pb-5 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((i) => (
              <div key={i.id} className={cn("tile flex flex-col gap-3 rounded-2xl p-4 transition-opacity", !i.connected && "opacity-70")}>
                <div className="flex items-start justify-between">
                  <IconTile icon={i.icon} tone={i.tone} size={44} />
                  <Switch on={i.connected} onChange={() => toggle(i.id)} />
                </div>
                <div>
                  <div className="text-[14px] font-800">{i.name}</div>
                  <div className="text-[12px] text-ink-soft">{i.desc}</div>
                </div>
                <div className="flex items-center justify-between border-t hairline pt-2.5">
                  {i.connected ? (
                    <span className="flex items-center gap-1.5 text-[11px] font-600 text-mint"><Check size={13} weight="bold" /> Синхр. {i.sync}</span>
                  ) : (
                    <span className="text-[11px] font-600 text-ink-mute">Не подключено</span>
                  )}
                  <button className="flex items-center gap-1 text-[11.5px] font-700 text-accent transition-opacity hover:opacity-70"><Gear size={13} weight="bold" /> Настроить</button>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </Reveal>

      <Reveal delay={0.05}>
        <Panel tone="accent">
          <div className="flex items-center gap-4 p-5">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/60 shadow-soft"><ArrowsClockwise size={24} weight="bold" className="text-ink" /></span>
            <div className="flex-1">
              <div className="text-[15px] font-800">Двусторонняя синхронизация</div>
              <div className="text-[12.5px] text-ink/70">REST API + webhooks · данные тянутся из подключённых систем в реальном времени. SCIM-провижининг сотрудников.</div>
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
