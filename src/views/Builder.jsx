import { useEffect, useState } from "react";
import { Plus, Trash, PencilSimple, Check, X, Eye, Trophy, GraduationCap, Lightning, Fire, Target, Diamond, Crown, Rocket, ArrowUp, ArrowDown, CaretDown, FlagCheckered, PaperPlaneTilt } from "@phosphor-icons/react";
import { kpis, awards, kbArticles, levels, processDefs, stageRoles } from "../data";
import { Panel, PanelHead, Tag, Badge, IconTile, Switch, Modal, Portal, Reveal, cn, tierMeta, rub } from "../ui";

const SUBTABS = [["proc", "Процессы"], ["kpi", "KPI"], ["awards", "Награды"], ["kb", "База знаний"], ["levels", "Уровни"]];
const ROLE_LABEL = Object.fromEntries(stageRoles);
const KPI_COLORS = ["indigo", "mint", "amber", "sky", "pink", "teal"];
const ICON_OPTS = [["trophy", Trophy], ["cap", GraduationCap], ["bolt", Lightning], ["fire", Fire], ["target", Target], ["diamond", Diamond], ["crown", Crown], ["rocket", Rocket]];
const TIER_OPTS = [["legendary", "Легендарная"], ["rare", "Редкая"], ["common", "Обычная"]];
const KB_TONES = ["indigo", "mint", "amber", "sky", "pink", "teal"];

const inp = "w-full rounded-lg bg-transparent px-2 py-1 outline-none transition-colors focus:bg-ink/[0.05] dark:focus:bg-white/[0.07]";
const sel = "appearance-none rounded-lg bg-transparent py-1 pr-6 font-700 outline-none cursor-pointer";

/* ————— Процессы (визуальный редактор маршрута) ————— */
function StageCard({ i, total, stage, onRole, onSla, onMove, onDel }) {
  return (
    <div className="tile flex items-center gap-3 rounded-2xl p-3">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-accent to-accent-2 text-[12px] font-800 text-white">{i + 1}</span>
      <div className="min-w-0 flex-1">
        <div className="relative inline-flex">
          <select value={stage.role} onChange={(e) => onRole(e.target.value)} className={cn(sel, "text-[14px]")}>
            {stageRoles.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
          <CaretDown size={12} weight="bold" className="pointer-events-none absolute right-1 top-2 text-ink-mute" />
        </div>
        <div className="flex items-center gap-1.5"><Tag className="text-ink-mute">SLA</Tag><input value={stage.sla} onChange={(e) => onSla(e.target.value)} className={cn(inp, "w-24 text-[12px]")} /></div>
      </div>
      <div className="flex items-center gap-0.5">
        <button onClick={() => onMove(-1)} disabled={i === 0} className="grid h-7 w-7 place-items-center rounded-full text-ink-mute transition-colors hover:bg-ink/5 disabled:opacity-25 dark:hover:bg-white/10"><ArrowUp size={14} weight="bold" /></button>
        <button onClick={() => onMove(1)} disabled={i === total - 1} className="grid h-7 w-7 place-items-center rounded-full text-ink-mute transition-colors hover:bg-ink/5 disabled:opacity-25 dark:hover:bg-white/10"><ArrowDown size={14} weight="bold" /></button>
        <button onClick={onDel} className="grid h-7 w-7 place-items-center rounded-full text-ink-mute transition-colors hover:bg-pink-soft hover:text-pink"><Trash size={14} weight="bold" /></button>
      </div>
    </div>
  );
}

function ProcessSection({ notify }) {
  const [procs, setProcs] = useState(() => processDefs.map((p) => ({ ...p, stages: p.stages.map((s) => ({ ...s })), cond: p.cond ? { ...p.cond } : null })));
  const [selId, setSelId] = useState(procs[0].id);
  const p = procs.find((x) => x.id === selId);
  const upd = (patch) => setProcs((list) => list.map((x) => (x.id === selId ? { ...x, ...patch } : x)));
  const setStage = (i, patch) => upd({ stages: p.stages.map((s, idx) => (idx === i ? { ...s, ...patch } : s)) });
  const move = (i, dir) => { const a = [...p.stages]; const j = i + dir; if (j < 0 || j >= a.length) return; [a[i], a[j]] = [a[j], a[i]]; upd({ stages: a }); };

  return (
    <div className="grid gap-5 lg:grid-cols-3">
      <div className="space-y-2 lg:col-span-1">
        <Tag className="text-ink-mute">Тип заявки</Tag>
        {procs.map((pr) => (
          <button key={pr.id} onClick={() => setSelId(pr.id)} className={cn("flex w-full items-center gap-3 rounded-2xl p-3 text-left transition-colors", selId === pr.id ? "bg-accent/[0.1] ring-1 ring-accent/25" : "tile hover:bg-white/50 dark:hover:bg-white/[0.06]")}>
            <IconTile icon={pr.icon} tone={pr.tone} size={40} />
            <div className="min-w-0 flex-1">
              <div className="truncate text-[13.5px] font-700">{pr.name}</div>
              <Tag className="text-ink-mute">{pr.stages.length + 1} этап · {pr.cond ? "с условием" : "простой"}</Tag>
            </div>
          </button>
        ))}
      </div>

      <div className="lg:col-span-2">
        <div className="mb-3 flex items-center justify-between">
          <Tag className="text-ink-mute">Маршрут согласования · {p.name}</Tag>
          <button onClick={() => notify("Маршрут сохранён")} className="rounded-full bg-accent px-4 py-2 text-[12.5px] font-700 text-white transition-transform active:scale-95">Сохранить</button>
        </div>

        <div className="flex items-center gap-3 rounded-2xl bg-mint-soft px-4 py-2.5">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-mint text-white"><PaperPlaneTilt size={15} weight="fill" /></span>
          <div><Tag className="text-ink-soft">Старт</Tag><div className="text-[13px] font-700">Сотрудник подал заявку</div></div>
        </div>
        <div className="ml-[27px] h-3 w-0.5 bg-ink/10 dark:bg-white/15" />

        <div className="space-y-2">
          {p.stages.map((s, i) => (
            <StageCard key={i} i={i} total={p.stages.length} stage={s} onRole={(r) => setStage(i, { role: r })} onSla={(v) => setStage(i, { sla: v })} onMove={(d) => move(i, d)} onDel={() => upd({ stages: p.stages.filter((_, idx) => idx !== i) })} />
          ))}
        </div>

        <button onClick={() => upd({ stages: [...p.stages, { role: "manager", sla: "1 день" }] })} className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-2xl border-2 border-dashed border-ink/15 py-2.5 text-[12.5px] font-700 text-ink-mute transition-colors hover:border-accent hover:text-accent dark:border-white/15">
          <Plus size={15} weight="bold" /> Добавить этап
        </button>

        <div className="tile mt-3 rounded-2xl p-3.5">
          <div className="flex items-center justify-between">
            <div><Tag className="text-ink-mute">Условие</Tag><div className="text-[13px] font-600">Доп. согласование по сумме</div></div>
            <Switch on={!!p.cond} onChange={() => upd({ cond: p.cond ? null : { value: 50000, role: "director" } })} />
          </div>
          {p.cond && (
            <div className="mt-3 flex flex-wrap items-center gap-2 text-[13px] font-500">
              <span className="text-ink-soft">Если сумма {">"}</span>
              <input value={p.cond.value} onChange={(e) => upd({ cond: { ...p.cond, value: e.target.value } })} className="tile w-24 rounded-lg px-2 py-1 text-right font-700 outline-none focus:ring-2 focus:ring-accent" />
              <span className="text-ink-soft">₽ → добавить</span>
              <div className="tile relative inline-flex rounded-lg px-2">
                <select value={p.cond.role} onChange={(e) => upd({ cond: { ...p.cond, role: e.target.value } })} className={cn(sel, "text-[12.5px] text-accent")}>{stageRoles.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select>
                <CaretDown size={11} weight="bold" className="pointer-events-none absolute right-1.5 top-2 text-ink-mute" />
              </div>
            </div>
          )}
        </div>

        <div className="ml-[27px] h-3 w-0.5 bg-ink/10 dark:bg-white/15" />
        <div className="flex items-center gap-3 rounded-2xl bg-accent/[0.1] px-4 py-2.5">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-accent text-white"><FlagCheckered size={15} weight="fill" /></span>
          <div><Tag className="text-ink-soft">Финиш</Tag><div className="text-[13px] font-700">Заявка исполнена</div></div>
        </div>
      </div>
    </div>
  );
}

/* ————— KPI ————— */
function KpiSection({ notify }) {
  const [list, setList] = useState(() => kpis.map((k, i) => ({ ...k, active: true, weight: [40, 25, 20, 15][i] ?? 10, cid: k.key })));
  const set = (cid, patch) => setList((l) => l.map((k) => (k.cid === cid ? { ...k, ...patch } : k)));
  const add = () => { const cid = "k" + (list.length + 1) + Date.now(); setList((l) => [...l, { cid, name: "Новая метрика", value: 0, unit: "%", target: 100, color: KPI_COLORS[l.length % 6], active: true, weight: 10 }]); notify("Метрика добавлена"); };
  const del = (cid) => { setList((l) => l.filter((k) => k.cid !== cid)); notify("Метрика удалена"); };
  const totalW = list.reduce((a, k) => a + (Number(k.weight) || 0), 0);
  return (
    <>
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Tag className="text-ink-mute">Метрики и цели · источник Битрикс24</Tag>
          <span className={cn("rounded-full px-2 py-0.5 text-[11px] font-700", totalW === 100 ? "bg-mint-soft text-mint" : "bg-amber-soft text-amber")}>Σ вес {totalW}%</span>
        </div>
        <button onClick={add} className="flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-[12.5px] font-700 text-white transition-transform active:scale-95"><Plus size={15} weight="bold" /> Метрику</button>
      </div>
      <div className="space-y-2">
        {list.map((k) => (
          <div key={k.cid} className={cn("tile flex flex-wrap items-center gap-x-3 gap-y-2 rounded-2xl p-3 transition-opacity", !k.active && "opacity-55")}>
            <span className="h-3 w-3 shrink-0 rounded-full" style={{ background: `var(--color-${k.color})` }} />
            <input value={k.name} onChange={(e) => set(k.cid, { name: e.target.value })} className={cn(inp, "min-w-[120px] flex-1 text-[14px] font-700")} />
            <label className="flex items-center gap-1.5"><Tag className="text-ink-mute">Цель</Tag><input value={k.target} onChange={(e) => set(k.cid, { target: e.target.value })} className={cn(inp, "w-14 text-right text-[13px] font-700")} /><span className="text-[12px] text-ink-mute">{k.unit}</span></label>
            <label className="flex items-center gap-1.5"><Tag className="text-ink-mute">Вес</Tag><input value={k.weight} onChange={(e) => set(k.cid, { weight: e.target.value })} className={cn(inp, "w-12 text-right text-[13px] font-700")} /><span className="text-[12px] text-ink-mute">%</span></label>
            <Switch on={k.active} onChange={() => set(k.cid, { active: !k.active })} />
            <button onClick={() => del(k.cid)} className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-ink-mute transition-colors hover:bg-pink-soft hover:text-pink"><Trash size={16} weight="bold" /></button>
          </div>
        ))}
      </div>
    </>
  );
}

/* ————— Awards ————— */
function AwardsSection({ notify }) {
  const [list, setList] = useState(() => awards.map((a) => ({ ...a, active: a.earned, cid: a.id })));
  const [edit, setEdit] = useState(null); // {cid?, icon, tier, title, sub}
  const set = (cid, patch) => setList((l) => l.map((a) => (a.cid === cid ? { ...a, ...patch } : a)));
  const del = (cid) => { setList((l) => l.filter((a) => a.cid !== cid)); notify("Награда удалена"); };
  const save = () => {
    if (edit.cid) { set(edit.cid, { title: edit.title, sub: edit.sub, tier: edit.tier, icon: edit.icon }); notify("Награда обновлена"); }
    else { const cid = "a" + Date.now(); setList((l) => [...l, { cid, title: edit.title || "Награда", sub: edit.sub || "условие", tier: edit.tier, icon: edit.icon, active: true, earned: true }]); notify("Награда создана"); }
    setEdit(null);
  };
  return (
    <>
      <div className="mb-3 flex items-center justify-between">
        <Tag className="text-ink-mute">Медали и условия получения</Tag>
        <button onClick={() => setEdit({ icon: "trophy", tier: "rare", title: "", sub: "" })} className="flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-[12.5px] font-700 text-white transition-transform active:scale-95"><Plus size={15} weight="bold" /> Награду</button>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {list.map((a) => (
          <div key={a.cid} className="tile flex flex-col items-center gap-2 rounded-3xl p-4 text-center">
            <Badge icon={a.icon} tier={a.tier} earned={a.active} size={62} />
            <div className="text-[13px] font-800 leading-tight">{a.title}</div>
            <span className="rounded-full bg-white/60 px-2 py-0.5 text-[10px] font-700 uppercase tracking-wide dark:bg-white/10" style={{ color: tierMeta(a.tier).chip }}>{TIER_OPTS.find((t) => t[0] === a.tier)?.[1]}</span>
            <div className="mt-1 flex items-center gap-2">
              <Switch on={a.active} onChange={() => set(a.cid, { active: !a.active })} />
              <button onClick={() => setEdit({ cid: a.cid, icon: a.icon, tier: a.tier, title: a.title, sub: a.sub })} className="grid h-8 w-8 place-items-center rounded-full text-ink-soft transition-colors hover:bg-accent/10 hover:text-accent"><PencilSimple size={15} weight="bold" /></button>
              <button onClick={() => del(a.cid)} className="grid h-8 w-8 place-items-center rounded-full text-ink-mute transition-colors hover:bg-pink-soft hover:text-pink"><Trash size={15} weight="bold" /></button>
            </div>
          </div>
        ))}
        <button onClick={() => setEdit({ icon: "trophy", tier: "rare", title: "", sub: "" })} className="flex min-h-[168px] flex-col items-center justify-center gap-2 rounded-3xl border-2 border-dashed border-ink/15 text-ink-mute transition-colors hover:border-accent hover:text-accent dark:border-white/15">
          <Plus size={26} weight="bold" /><span className="text-[12px] font-700">Добавить</span>
        </button>
      </div>

      <Modal open={!!edit} onClose={() => setEdit(null)}>
        {edit && (
          <div className="text-left">
            <div className="mb-4 flex items-center justify-between">
              <div className="text-[17px] font-800">{edit.cid ? "Редактировать награду" : "Новая награда"}</div>
              <button onClick={() => setEdit(null)} className="chip grid h-8 w-8 place-items-center rounded-full transition-opacity hover:opacity-70"><X size={15} weight="bold" /></button>
            </div>
            <div className="flex justify-center pb-4"><Badge icon={edit.icon} tier={edit.tier} earned size={100} /></div>
            <Tag className="text-ink-mute">Название</Tag>
            <input value={edit.title} onChange={(e) => setEdit({ ...edit, title: e.target.value })} placeholder="Напр. Мастер продаж" className="tile mt-1.5 mb-3 w-full rounded-2xl px-3.5 py-2.5 text-[14px] font-700 outline-none focus:ring-2 focus:ring-accent" />
            <Tag className="text-ink-mute">Условие</Tag>
            <input value={edit.sub} onChange={(e) => setEdit({ ...edit, sub: e.target.value })} placeholder="Напр. 100 закрытых сделок" className="tile mt-1.5 mb-3 w-full rounded-2xl px-3.5 py-2.5 text-[13px] outline-none focus:ring-2 focus:ring-accent" />
            <Tag className="text-ink-mute">Редкость</Tag>
            <div className="mt-1.5 mb-3 flex gap-1.5">
              {TIER_OPTS.map(([v, l]) => (
                <button key={v} onClick={() => setEdit({ ...edit, tier: v })} className={cn("flex-1 rounded-full py-2 text-[12px] font-700 transition-colors", edit.tier === v ? "text-white" : "tile text-ink-soft")} style={edit.tier === v ? { background: tierMeta(v).chip } : undefined}>{l}</button>
              ))}
            </div>
            <Tag className="text-ink-mute">Иконка</Tag>
            <div className="mt-1.5 grid grid-cols-8 gap-1.5">
              {ICON_OPTS.map(([key, Ico]) => (
                <button key={key} onClick={() => setEdit({ ...edit, icon: key })} className={cn("grid aspect-square place-items-center rounded-xl transition-colors", edit.icon === key ? "bg-accent text-white" : "tile text-ink-soft")}><Ico size={18} weight="fill" /></button>
              ))}
            </div>
            <button onClick={save} className="mt-5 w-full rounded-full bg-accent py-3 text-[14px] font-700 text-white transition-transform active:scale-[0.98]">{edit.cid ? "Сохранить" : "Создать награду"}</button>
          </div>
        )}
      </Modal>
    </>
  );
}

/* ————— Knowledge base ————— */
function KbSection({ notify }) {
  const [list, setList] = useState(() => kbArticles.map((a) => ({ ...a, cid: a.id })));
  const set = (cid, patch) => setList((l) => l.map((a) => (a.cid === cid ? { ...a, ...patch } : a)));
  const del = (cid) => { setList((l) => l.filter((a) => a.cid !== cid)); notify("Статья удалена"); };
  const add = () => { const cid = "kb" + Date.now(); setList((l) => [{ cid, title: "Новая статья", tag: "Черновик", icon: "book", tone: KB_TONES[l.length % 6], status: "draft", views: 0 }, ...l]); notify("Черновик создан"); };
  const published = list.filter((a) => a.status === "published").length;
  return (
    <>
      <div className="mb-3 flex items-center justify-between">
        <Tag className="text-ink-mute">{published}/{list.length} опубликовано</Tag>
        <button onClick={add} className="flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-[12.5px] font-700 text-white transition-transform active:scale-95"><Plus size={15} weight="bold" /> Статью</button>
      </div>
      <div className="space-y-2">
        {list.map((a) => {
          const pub = a.status === "published";
          return (
            <div key={a.cid} className="tile flex flex-wrap items-center gap-x-3 gap-y-2 rounded-2xl p-3">
              <IconTile icon={a.icon} tone={a.tone} size={42} />
              <input value={a.title} onChange={(e) => set(a.cid, { title: e.target.value })} className={cn(inp, "min-w-[120px] flex-1 text-[14px] font-700")} />
              <input value={a.tag} onChange={(e) => set(a.cid, { tag: e.target.value })} className={cn(inp, "w-28 text-[12px] text-ink-soft")} />
              <span className="flex items-center gap-1 text-[11px] text-ink-mute"><Eye size={12} />{a.views}</span>
              <label className="flex items-center gap-1.5"><Tag className={pub ? "text-mint" : "text-ink-mute"}>{pub ? "Опубл." : "Черновик"}</Tag><Switch on={pub} onChange={() => set(a.cid, { status: pub ? "draft" : "published" })} /></label>
              <button onClick={() => del(a.cid)} className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-ink-mute transition-colors hover:bg-pink-soft hover:text-pink"><Trash size={16} weight="bold" /></button>
            </div>
          );
        })}
      </div>
    </>
  );
}

/* ————— Levels ————— */
function LevelsSection({ notify }) {
  const [list, setList] = useState(() => levels.map((l) => ({ ...l, cid: l.n })));
  const set = (cid, patch) => setList((l) => l.map((x) => (x.cid === cid ? { ...x, ...patch } : x)));
  const del = (cid) => { setList((l) => l.filter((x) => x.cid !== cid)); notify("Уровень удалён"); };
  const add = () => { const n = list.length + 1; const cid = "l" + Date.now(); const last = list[list.length - 1]; setList((l) => [...l, { cid, n, title: "Новый уровень", xp: (Number(last?.xp) || 0) + 500 }]); notify("Уровень добавлен"); };
  return (
    <>
      <div className="mb-3 flex items-center justify-between">
        <Tag className="text-ink-mute">Пороги XP и названия уровней</Tag>
        <button onClick={add} className="flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-[12.5px] font-700 text-white transition-transform active:scale-95"><Plus size={15} weight="bold" /> Уровень</button>
      </div>
      <div className="space-y-2">
        {list.map((l, i) => (
          <div key={l.cid} className="tile flex items-center gap-3 rounded-2xl p-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-accent to-accent-2 text-[13px] font-800 text-white">{i + 1}</span>
            <input value={l.title} onChange={(e) => set(l.cid, { title: e.target.value })} className={cn(inp, "flex-1 text-[14px] font-700")} />
            <label className="flex items-center gap-1.5"><Tag className="text-ink-mute">от</Tag><input value={l.xp} onChange={(e) => set(l.cid, { xp: e.target.value })} className={cn(inp, "w-20 text-right text-[13px] font-700")} /><span className="text-[12px] text-ink-mute">XP</span></label>
            <button onClick={() => del(l.cid)} className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-ink-mute transition-colors hover:bg-pink-soft hover:text-pink"><Trash size={16} weight="bold" /></button>
          </div>
        ))}
      </div>
    </>
  );
}

export default function Builder() {
  const [sub, setSub] = useState("proc");
  const [toast, setToast] = useState(null);
  useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(null), 2200); return () => clearTimeout(t); }, [toast]);
  const notify = (msg) => setToast(msg);

  return (
    <div className="grid grid-cols-1 gap-4">
      <Reveal>
        <Panel>
          <PanelHead no="01" title="Конструктор кабинета" right="настройка под компанию" />
          <div className="no-scrollbar flex gap-2 overflow-x-auto px-5 pb-4">
            {SUBTABS.map(([k, l]) => (
              <button key={k} onClick={() => setSub(k)} className={cn("shrink-0 rounded-full px-4 py-2 text-[13px] font-700 transition-colors", sub === k ? "bg-accent text-white" : "tile text-ink-soft")}>{l}</button>
            ))}
          </div>
          <div className="px-5 pb-5">
            {sub === "proc" && <ProcessSection notify={notify} />}
            {sub === "kpi" && <KpiSection notify={notify} />}
            {sub === "awards" && <AwardsSection notify={notify} />}
            {sub === "kb" && <KbSection notify={notify} />}
            {sub === "levels" && <LevelsSection notify={notify} />}
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
