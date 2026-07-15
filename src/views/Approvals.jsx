import { useEffect, useState } from "react";
import { Check, X, Clock, CheckSquare, Square } from "@phosphor-icons/react";
import { approvalRoutes, declineReasons } from "../data";
import { Panel, PanelHead, Tag, IconTile, Modal, Portal, Reveal, cn } from "../ui";

const KIND = {
  vacation: { icon: "umbrella", tone: "mint" },
  advance: { icon: "coins", tone: "amber" },
  dayoff: { icon: "clock", tone: "sky" },
  cert: { icon: "file", tone: "indigo" },
};
const ROLE_LABEL = { manager: "Руководитель", hr: "HR", accountant: "Бухгалтерия" };
const FILTERS = [
  { k: "all", l: "Все" },
  { k: "vacation", l: "Отпуска" },
  { k: "advance", l: "Авансы" },
  { k: "dayoff", l: "Отгулы" },
  { k: "cert", l: "Справки" },
];

function Stepper({ kind, stage, status, role }) {
  const route = approvalRoutes[kind];
  return (
    <div className="flex">
      {route.map(([label, r], i) => {
        let st;
        if (status === "declined") st = i < stage ? "done" : i === stage ? "reject" : "future";
        else if (status === "done") st = "done";
        else st = i < stage ? "done" : i === stage ? (r === role ? "current" : "progress") : "future";
        const prevDone = i > 0 && (status === "done" || i - 1 < stage);
        const color = st === "reject" ? "var(--color-pink)" : st === "future" ? "var(--color-ink-mute)" : st === "current" ? "var(--color-accent)" : st === "progress" ? "var(--color-amber)" : "var(--color-mint)";
        return (
          <div key={label} className="relative flex flex-1 flex-col items-center">
            {i > 0 && <span className="absolute right-1/2 top-[11px] h-[2px] w-full" style={{ background: prevDone ? "var(--color-mint)" : "var(--color-line)" }} />}
            <span
              className={cn("relative z-10 grid h-6 w-6 place-items-center rounded-full text-white", st === "future" && "text-ink-mute")}
              style={{ background: st === "future" ? "var(--s-tile-2)" : color, boxShadow: st === "future" ? "inset 0 0 0 1.5px var(--s-line)" : st === "current" ? "0 0 0 4px color-mix(in srgb, var(--color-accent) 22%, transparent)" : "none" }}
            >
              {st === "done" ? <Check size={13} weight="bold" /> : st === "reject" ? <X size={13} weight="bold" /> : st === "progress" ? <Clock size={12} weight="bold" /> : <span className="text-[10px] font-800">{i + 1}</span>}
            </span>
            <span className="mt-1.5 text-center text-[9px] font-700 uppercase leading-tight" style={{ color: st === "future" ? "var(--color-ink-mute)" : color }}>{label}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function Approvals({ role, requests, onApprove, onDecline }) {
  const [filter, setFilter] = useState("all");
  const [sel, setSel] = useState(() => new Set());
  const [declineItem, setDeclineItem] = useState(null);
  const [reason, setReason] = useState("");
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  const actorRole = (r) => (r.status === "active" ? approvalRoutes[r.kind][r.stage][1] : null);
  const mine = requests.filter((r) => actorRole(r) === role);
  const shown = filter === "all" ? mine : mine.filter((r) => r.kind === filter);
  const inWork = requests.filter((r) => r.status === "active" && actorRole(r) !== role).length;
  const doneN = requests.filter((r) => r.status === "done").length;
  const declinedN = requests.filter((r) => r.status === "declined").length;

  const approve = (item, note) => { onApprove(item.id); setSel(new Set()); if (note) setToast(note); };
  const approveMany = (ids, note) => { ids.forEach((id) => onApprove(id)); setSel(new Set()); setToast(note); };

  const confirmDecline = () => {
    const r = (reason || "").trim() || "Без указания причины";
    onDecline(declineItem.id, r);
    setToast({ ok: false, msg: `${declineItem.name}: ${declineItem.type} — отклонено` });
    setDeclineItem(null);
    setReason("");
  };

  const allSelected = shown.length > 0 && shown.every((i) => sel.has(i.id));
  const toggleAll = () => setSel(allSelected ? new Set() : new Set(shown.map((i) => i.id)));
  const toggleOne = (id) => setSel((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });

  return (
    <div className="grid grid-cols-1 gap-4">
      <Reveal>
        <Panel>
          <PanelHead no="01" title={`На согласовании · ${ROLE_LABEL[role] || ""}`} right={mine.length ? `${mine.length} ждут вас` : "у вас пусто"} />

          <div className="flex gap-2 px-5">
            {[["Ждут вас", mine.length, "var(--color-amber)"], ["В работе", inWork, "var(--color-sky)"], ["Готово", doneN, "var(--color-mint)"], ["Отклонено", declinedN, "var(--color-pink)"]].map(([l, n, c]) => (
              <div key={l} className="tile flex flex-1 items-center justify-center gap-2 rounded-2xl py-2.5">
                <span className="text-[18px] font-800" style={{ color: c }}>{n}</span>
                <Tag className="text-ink-mute">{l}</Tag>
              </div>
            ))}
          </div>

          {mine.length > 0 && (
            <div className="no-scrollbar flex gap-2 overflow-x-auto px-5 pt-4">
              {FILTERS.map((f) => {
                const cnt = f.k === "all" ? mine.length : mine.filter((i) => i.kind === f.k).length;
                if (f.k !== "all" && cnt === 0) return null;
                const active = filter === f.k;
                return (
                  <button key={f.k} onClick={() => { setFilter(f.k); setSel(new Set()); }} className={cn("flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-[12.5px] font-700 transition-colors", active ? "bg-accent text-white" : "tile text-ink-soft")}>
                    {f.l}<span className={cn("text-[11px]", active ? "text-white/70" : "text-ink-mute")}>{cnt}</span>
                  </button>
                );
              })}
            </div>
          )}

          {shown.length > 1 && (
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 px-5">
              <button onClick={toggleAll} className="flex items-center gap-2 text-[12.5px] font-600 text-ink-soft transition-colors hover:text-ink">
                {allSelected ? <CheckSquare size={18} weight="fill" className="text-accent" /> : <Square size={18} />} Выбрать все
              </button>
              <div className="flex gap-2">
                {sel.size > 0 && <button onClick={() => approveMany([...sel], { ok: true, msg: `Согласовано: ${sel.size}` })} className="rounded-full border border-accent/40 px-4 py-2 text-[12.5px] font-700 text-accent transition-colors hover:bg-accent/10">Согласовать выбранные ({sel.size})</button>}
                <button onClick={() => approveMany(shown.map((i) => i.id), { ok: true, msg: `Согласовано: ${shown.length}` })} className="flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-[12.5px] font-700 text-white transition-transform active:scale-95"><Check size={14} weight="bold" /> Согласовать все</button>
              </div>
            </div>
          )}

          <div className="mt-3 space-y-2.5 px-4 pb-4">
            {shown.map((item) => {
              const k = KIND[item.kind];
              return (
                <div key={item.id} className="tile rounded-2xl p-4">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                    <div className="flex items-center gap-3 lg:w-[300px]">
                      <button onClick={() => toggleOne(item.id)} className="shrink-0">
                        {sel.has(item.id) ? <CheckSquare size={20} weight="fill" className="text-accent" /> : <Square size={20} className="text-ink-mute" />}
                      </button>
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
                    <div className="flex-1 px-1"><Stepper kind={item.kind} stage={item.stage} status={item.status} role={role} /></div>
                    <div className="flex gap-2 lg:w-[236px] lg:justify-end">
                      <button onClick={() => setDeclineItem(item)} className="flex-1 rounded-full border border-pink/40 py-2.5 text-[13px] font-700 text-pink transition-colors hover:bg-pink-soft lg:flex-none lg:px-5">Отклонить</button>
                      <button onClick={() => approve(item, { ok: true, msg: `${item.name}: ${item.type} — согласовано` })} className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-mint py-2.5 text-[13px] font-700 text-white transition-transform active:scale-95 lg:flex-none lg:px-5"><Check size={14} weight="bold" /> Согласовать</button>
                    </div>
                  </div>
                </div>
              );
            })}
            {shown.length === 0 && <div className="py-8 text-center text-[13px] text-ink-mute">На вашем этапе заявок нет 🎉</div>}
          </div>
        </Panel>
      </Reveal>

      {/* Pipeline — all requests with current position */}
      <Reveal delay={0.05}>
        <Panel>
          <PanelHead no="02" title="Поток заявок" right={`${requests.length} всего`} />
          <div className="divide-line px-5 pb-2">
            {requests.map((item) => {
              const k = KIND[item.kind];
              const st = item.status;
              const stageLabel = st === "done" ? "Готово" : st === "declined" ? "Отклонено" : approvalRoutes[item.kind][item.stage][0];
              const c = st === "done" ? "var(--color-mint)" : st === "declined" ? "var(--color-pink)" : actorRole(item) === role ? "var(--color-accent)" : "var(--color-amber)";
              return (
                <div key={item.id} className="flex items-center gap-3 py-2.5">
                  <IconTile icon={k.icon} tone={k.tone} size={34} />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[13px] font-700">{item.type} · <span className="font-500 text-ink-soft">{item.name}</span></div>
                    <div className="truncate text-[11px] text-ink-mute">{item.detail}</div>
                  </div>
                  <span className="rounded-full px-2.5 py-1 text-[10.5px] font-700 uppercase tracking-wide" style={{ color: c, background: "color-mix(in srgb, " + c + " 14%, transparent)" }}>
                    {st === "active" ? `→ ${stageLabel}` : stageLabel}
                  </span>
                </div>
              );
            })}
          </div>
        </Panel>
      </Reveal>

      <Modal open={!!declineItem} onClose={() => { setDeclineItem(null); setReason(""); }}>
        {declineItem && (
          <div className="text-left">
            <div className="mb-1 text-[17px] font-800">Отклонить заявку</div>
            <div className="mb-4 text-[13px] text-ink-soft">{declineItem.type} · {declineItem.name} — {declineItem.detail}</div>
            <Tag className="text-ink-mute">Причина</Tag>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {declineReasons.map((r) => (
                <button key={r} onClick={() => setReason(r)} className={cn("rounded-full px-3 py-1.5 text-[12px] font-600 transition-colors", reason === r ? "bg-pink text-white" : "tile text-ink-soft")}>{r}</button>
              ))}
            </div>
            <textarea value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Комментарий сотруднику…" rows={3} className="tile mt-3 w-full resize-none rounded-2xl px-3.5 py-2.5 text-[13px] outline-none placeholder:text-ink-mute focus:ring-2 focus:ring-accent" />
            <div className="mt-4 flex gap-2">
              <button onClick={() => { setDeclineItem(null); setReason(""); }} className="tile flex-1 rounded-full py-2.5 text-[13px] font-700 text-ink-soft">Отмена</button>
              <button onClick={confirmDecline} className="flex-1 rounded-full bg-pink py-2.5 text-[13px] font-700 text-white transition-transform active:scale-95">Отклонить</button>
            </div>
          </div>
        )}
      </Modal>

      {toast && (
        <Portal>
          <div className="slide-in fixed bottom-24 left-1/2 z-[110] flex -translate-x-1/2 items-center gap-2.5 rounded-full border panel-edge glass-strong px-4 py-2.5 shadow-lift md:bottom-8">
            <span className={cn("grid h-6 w-6 place-items-center rounded-full text-white", toast.ok ? "bg-mint" : "bg-pink")}>{toast.ok ? <Check size={13} weight="bold" /> : <X size={13} weight="bold" />}</span>
            <span className="text-[13px] font-600">{toast.msg}</span>
          </div>
        </Portal>
      )}
    </div>
  );
}
