import { useEffect, useState } from "react";
import { Check, X } from "@phosphor-icons/react";
import { approvalQueue, approvalStages } from "../data";
import { Panel, PanelHead, Tag, IconTile, Reveal, cn } from "../ui";

const KIND = {
  vacation: { icon: "umbrella", tone: "mint" },
  advance: { icon: "coins", tone: "amber" },
  dayoff: { icon: "clock", tone: "sky" },
  cert: { icon: "file", tone: "indigo" },
};

function stageState(i, status) {
  if (status === "approved") return "done";
  if (status === "declined") return i === 0 ? "done" : i === 1 ? "reject" : "future";
  return i === 0 ? "done" : i === 1 ? "current" : "future";
}

function Stepper({ status }) {
  return (
    <div className="flex">
      {approvalStages.map((s, i) => {
        const st = stageState(i, status);
        const prevDone = i > 0 && ["done"].includes(stageState(i - 1, status));
        const color = st === "reject" ? "var(--color-pink)" : st === "future" ? "var(--color-ink-mute)" : st === "current" ? "var(--color-accent)" : "var(--color-mint)";
        return (
          <div key={s} className="relative flex flex-1 flex-col items-center">
            {i > 0 && (
              <span className="absolute right-1/2 top-[11px] h-[2px] w-full" style={{ background: prevDone ? "var(--color-mint)" : "var(--color-line)" }} />
            )}
            <span
              className={cn("relative z-10 grid h-6 w-6 place-items-center rounded-full text-white", st === "future" && "text-ink-mute")}
              style={{ background: st === "future" ? "var(--s-tile-2)" : color, boxShadow: st === "future" ? "inset 0 0 0 1.5px var(--s-line)" : st === "current" ? "0 0 0 4px color-mix(in srgb, var(--color-accent) 22%, transparent)" : "none" }}
            >
              {st === "done" ? <Check size={13} weight="bold" /> : st === "reject" ? <X size={13} weight="bold" /> : <span className="text-[10px] font-800">{i + 1}</span>}
            </span>
            <span className="mt-1.5 text-center text-[9px] font-700 uppercase leading-tight" style={{ color: st === "future" ? "var(--color-ink-mute)" : color }}>{s}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function Approvals() {
  const [items, setItems] = useState(() => approvalQueue.map((q) => ({ ...q, status: "pending" })));
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  const rank = (x) => (x.status === "pending" ? 0 : 1);
  const act = (item, decision) => {
    setItems((prev) => prev.map((x) => (x.id === item.id ? { ...x, status: decision } : x)).slice().sort((a, b) => rank(a) - rank(b)));
    setToast({ msg: `${item.name}: ${item.type} — ${decision === "approved" ? "согласовано" : "отклонено"}`, ok: decision === "approved" });
  };

  const pending = items.filter((i) => i.status === "pending").length;
  const approved = items.filter((i) => i.status === "approved").length;
  const declined = items.filter((i) => i.status === "declined").length;

  return (
    <div className="grid grid-cols-1 gap-4">
      <Reveal>
        <Panel>
          <PanelHead no="01" title="Согласования команды" right={pending ? `${pending} ждут` : "всё обработано"} />
          <div className="flex gap-2 px-5 pb-4">
            {[["Ждут", pending, "var(--color-amber)"], ["Согласовано", approved, "var(--color-mint)"], ["Отклонено", declined, "var(--color-pink)"]].map(([l, n, c]) => (
              <div key={l} className="tile flex flex-1 items-center justify-center gap-2 rounded-2xl py-2.5">
                <span className="text-[18px] font-800" style={{ color: c }}>{n}</span>
                <Tag className="text-ink-mute">{l}</Tag>
              </div>
            ))}
          </div>

          <div className="space-y-2.5 px-4 pb-4">
            {items.map((item) => {
              const k = KIND[item.kind];
              const done = item.status !== "pending";
              return (
                <div key={item.id} className={cn("tile rounded-2xl p-4 transition-opacity duration-300", done && "opacity-75")}>
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                    <div className="flex items-center gap-3 lg:w-[280px]">
                      <IconTile icon={k.icon} tone={k.tone} size={46} />
                      <div className="min-w-0">
                        <div className="text-[14px] font-800">{item.type}</div>
                        <div className="truncate text-[12px] text-ink-soft">{item.detail}</div>
                        <div className="mt-1 flex items-center gap-1.5">
                          <span className="grid h-4 w-4 place-items-center rounded-[5px] bg-gradient-to-br from-accent to-accent-2 text-[7px] font-700 text-white">{item.initials}</span>
                          <span className="truncate text-[11px] text-ink-mute">{item.name} · {item.submitted}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 px-1"><Stepper status={item.status} /></div>

                    <div className="flex gap-2 lg:w-[236px] lg:justify-end">
                      {item.status === "pending" ? (
                        <>
                          <button onClick={() => act(item, "declined")} className="flex-1 rounded-full border border-pink/40 py-2.5 text-[13px] font-700 text-pink transition-colors hover:bg-pink-soft lg:flex-none lg:px-5">
                            Отклонить
                          </button>
                          <button onClick={() => act(item, "approved")} className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-mint py-2.5 text-[13px] font-700 text-white transition-transform active:scale-95 lg:flex-none lg:px-5">
                            <Check size={14} weight="bold" /> Согласовать
                          </button>
                        </>
                      ) : (
                        <span className={cn("flex w-full items-center justify-center gap-1.5 rounded-full py-2.5 text-[13px] font-700 lg:w-auto lg:px-6", item.status === "approved" ? "bg-mint-soft text-mint" : "bg-pink-soft text-pink")}>
                          {item.status === "approved" ? <Check size={15} weight="bold" /> : <X size={15} weight="bold" />}
                          {item.status === "approved" ? "Согласовано" : "Отклонено"}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Panel>
      </Reveal>

      {toast && (
        <div className="slide-in fixed bottom-24 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2.5 rounded-full border panel-edge glass-strong px-4 py-2.5 shadow-lift md:bottom-8">
          <span className={cn("grid h-6 w-6 place-items-center rounded-full text-white", toast.ok ? "bg-mint" : "bg-pink")}>
            {toast.ok ? <Check size={13} weight="bold" /> : <X size={13} weight="bold" />}
          </span>
          <span className="text-[13px] font-600">{toast.msg}</span>
        </div>
      )}
    </div>
  );
}
