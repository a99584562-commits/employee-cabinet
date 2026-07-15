import { useEffect, useState } from "react";
import { Check, X, ArrowsClockwise, Gear, CircleNotch, Link, ArrowRight } from "@phosphor-icons/react";
import { integrations } from "../data";
import { Panel, PanelHead, Tag, IconTile, Switch, Portal, Reveal, cn } from "../ui";

const STEPS = ["Авторизация", "Маппинг полей", "Проверка", "Готово"];
const THEIR_FIELDS = ["Пользователь", "Контакт", "Компания", "Подразделение", "Сделка", "Начисление", "— не переносить"];
const OUR_FIELDS = [["Сотрудник", "Пользователь"], ["Отдел", "Подразделение"], ["Должность", "Контакт"], ["Оклад и начисления", "Начисление"]];

function Stepper({ step }) {
  return (
    <div className="flex items-center">
      {STEPS.map((s, i) => {
        const done = i < step, cur = i === step;
        return (
          <div key={s} className="relative flex flex-1 flex-col items-center">
            {i > 0 && <span className="absolute right-1/2 top-[13px] h-[2px] w-full" style={{ background: i <= step ? "var(--color-mint)" : "var(--color-line)" }} />}
            <span className={cn("relative z-10 grid h-[26px] w-[26px] place-items-center rounded-full text-[11px] font-800", done ? "bg-mint text-white" : cur ? "bg-accent text-white" : "text-ink-mute")} style={cur ? { boxShadow: "0 0 0 4px color-mix(in srgb, var(--color-accent) 20%, transparent)" } : done ? {} : { boxShadow: "inset 0 0 0 1.5px var(--s-line)", background: "var(--s-tile-2)" }}>
              {done ? <Check size={13} weight="bold" /> : i + 1}
            </span>
            <span className={cn("mt-1.5 text-center text-[9.5px] font-700 uppercase leading-tight", cur ? "text-accent" : "text-ink-mute")}>{s}</span>
          </div>
        );
      })}
    </div>
  );
}

function Wizard({ item, onClose, onDone }) {
  const [step, setStep] = useState(0);
  const [test, setTest] = useState("idle"); // idle | run | ok
  const runTest = () => { setTest("run"); setTimeout(() => setTest("ok"), 1300); };
  const inp = "tile w-full rounded-xl px-3.5 py-2.5 text-[13px] outline-none focus:ring-2 focus:ring-accent";

  return (
    <Portal>
      <div className="fixed inset-0 z-[100] grid place-items-center p-4">
        <div className="fade-in absolute inset-0 bg-ink/40 backdrop-blur-[3px]" onClick={onClose} />
        <div className="glass-strong pop relative w-full max-w-md overflow-hidden rounded-[28px] border panel-edge p-6 shadow-lift">
          <div className="mb-5 flex items-center gap-3">
            <IconTile icon={item.icon} tone={item.tone} size={40} />
            <div className="flex-1">
              <div className="text-[16px] font-800">Подключение · {item.name}</div>
              <Tag className="text-ink-mute">{item.desc}</Tag>
            </div>
            <button onClick={onClose} className="chip grid h-8 w-8 place-items-center rounded-full transition-opacity hover:opacity-70"><X size={15} weight="bold" /></button>
          </div>

          <Stepper step={step} />

          <div className="mt-6 min-h-[184px]">
            {step === 0 && (
              <div className="space-y-3">
                <div><Tag className="text-ink-mute">Адрес портала / сервера</Tag><input defaultValue={`https://company.${item.id}.ru`} className={cn(inp, "mt-1.5")} /></div>
                <div><Tag className="text-ink-mute">API-ключ / токен</Tag><input defaultValue="••••••••••••••••••••" className={cn(inp, "mt-1.5")} /></div>
                <div className="flex items-center gap-2 rounded-xl bg-sky-soft px-3 py-2 text-[11.5px] font-600 text-sky"><Link size={14} weight="bold" /> Или авторизация через OAuth 2.0</div>
              </div>
            )}
            {step === 1 && (
              <div className="space-y-2">
                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 pb-1"><Tag className="text-ink-mute">Наше поле</Tag><span /><Tag className="text-ink-mute">Поле в {item.name}</Tag></div>
                {OUR_FIELDS.map(([our, def]) => (
                  <div key={our} className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
                    <div className="tile rounded-xl px-3 py-2 text-[12.5px] font-600">{our}</div>
                    <ArrowRight size={14} weight="bold" className="text-ink-mute" />
                    <div className="tile relative rounded-xl">
                      <select defaultValue={def} className="w-full appearance-none rounded-xl bg-transparent px-3 py-2 text-[12.5px] font-600 outline-none">
                        {THEIR_FIELDS.map((f) => <option key={f} value={f}>{f}</option>)}
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {step === 2 && (
              <div className="flex flex-col items-center justify-center py-4 text-center">
                {test === "idle" && <><div className="mb-4 text-[13px] text-ink-soft">Проверим доступ и объём данных перед синхронизацией.</div><button onClick={runTest} className="rounded-full bg-accent px-5 py-2.5 text-[13px] font-700 text-white transition-transform active:scale-95">Проверить соединение</button></>}
                {test === "run" && <div className="flex items-center gap-2.5 text-[13.5px] font-600 text-ink-soft"><CircleNotch size={20} weight="bold" className="animate-spin text-accent" /> Проверяем соединение…</div>}
                {test === "ok" && <><div className="grid h-12 w-12 place-items-center rounded-full bg-mint-soft"><Check size={24} weight="bold" className="text-mint" /></div><div className="mt-3 text-[14px] font-700">Соединение установлено</div><div className="text-[12.5px] text-ink-soft">Найдено 124 сотрудника · 6 отделов</div></>}
              </div>
            )}
            {step === 3 && (
              <div className="space-y-2.5">
                {[["Система", item.name], ["Данные", "124 сотрудника · 6 отделов"], ["Синхронизация", "автоматически, каждые 15 мин"], ["Направление", "двусторонняя"]].map(([k, v]) => (
                  <div key={k} className="tile flex items-center justify-between rounded-xl px-3.5 py-2.5"><span className="text-[12.5px] text-ink-soft">{k}</span><span className="text-[13px] font-700">{v}</span></div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-5 flex gap-2">
            {step > 0 && <button onClick={() => setStep(step - 1)} className="tile flex-1 rounded-full py-2.5 text-[13px] font-700 text-ink-soft">Назад</button>}
            {step < 3 ? (
              <button onClick={() => setStep(step + 1)} disabled={step === 2 && test !== "ok"} className={cn("flex-1 rounded-full py-2.5 text-[13px] font-700 text-white transition-transform active:scale-95", step === 2 && test !== "ok" ? "bg-ink/20 dark:bg-white/15" : "bg-accent")}>Далее</button>
            ) : (
              <button onClick={onDone} className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-mint py-2.5 text-[13px] font-700 text-white transition-transform active:scale-95"><Check size={15} weight="bold" /> Подключить и включить</button>
            )}
          </div>
        </div>
      </div>
    </Portal>
  );
}

export default function Integrations() {
  const [list, setList] = useState(() => integrations.map((i) => ({ ...i })));
  const [wiz, setWiz] = useState(null);
  const [toast, setToast] = useState(null);
  useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(null), 2400); return () => clearTimeout(t); }, [toast]);
  const on = list.filter((i) => i.connected).length;
  const setConn = (id, v) => setList((l) => l.map((i) => (i.id === id ? { ...i, connected: v, sync: v ? "только что" : "" } : i)));
  const toggle = (i) => { if (i.connected) { setConn(i.id, false); setToast(`${i.name} — отключено`); } else setWiz(i); };

  return (
    <div className="grid grid-cols-1 gap-4">
      <Reveal>
        <Panel>
          <PanelHead no="01" title="Интеграции" right={`${on}/${list.length} подключено`} />
          <div className="grid gap-3 px-5 pb-5 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((i) => (
              <div key={i.id} className={cn("tile flex flex-col gap-3 rounded-2xl p-4 transition-opacity", !i.connected && "opacity-75")}>
                <div className="flex items-start justify-between">
                  <IconTile icon={i.icon} tone={i.tone} size={44} />
                  <Switch on={i.connected} onChange={() => toggle(i)} />
                </div>
                <div>
                  <div className="text-[14px] font-800">{i.name}</div>
                  <div className="text-[12px] text-ink-soft">{i.desc}</div>
                </div>
                <div className="flex items-center justify-between border-t hairline pt-2.5">
                  {i.connected ? <span className="flex items-center gap-1.5 text-[11px] font-600 text-mint"><Check size={13} weight="bold" /> Синхр. {i.sync}</span> : <span className="text-[11px] font-600 text-ink-mute">Не подключено</span>}
                  <button onClick={() => setWiz(i)} className="flex items-center gap-1 text-[11.5px] font-700 text-accent transition-opacity hover:opacity-70"><Gear size={13} weight="bold" /> {i.connected ? "Настроить" : "Подключить"}</button>
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
              <div className="text-[12.5px] text-ink/70">Подключение — мастер из 4 шагов (доступ → маппинг → проверка → запуск). Дальше данные тянутся автоматически по REST API и webhooks.</div>
            </div>
          </div>
        </Panel>
      </Reveal>

      {wiz && <Wizard item={wiz} onClose={() => setWiz(null)} onDone={() => { setConn(wiz.id, true); setToast(`${wiz.name} — подключено`); setWiz(null); }} />}

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
