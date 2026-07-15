import { useEffect, useState } from "react";
import { Check, CheckSquare, Square, PaperPlaneRight } from "@phosphor-icons/react";
import { courses, teamMembers } from "../data";
import { Panel, PanelHead, Tag, IconTile, Portal, Reveal, cn } from "../ui";

export default function AssignTraining() {
  const [course, setCourse] = useState(courses[1]);
  const [sel, setSel] = useState(() => new Set());
  const [toast, setToast] = useState(null);
  useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(null), 2600); return () => clearTimeout(t); }, [toast]);

  const allSel = teamMembers.length > 0 && teamMembers.every((m) => sel.has(m.name));
  const toggleAll = () => setSel(allSel ? new Set() : new Set(teamMembers.map((m) => m.name)));
  const toggle = (name) => setSel((s) => { const n = new Set(s); n.has(name) ? n.delete(name) : n.add(name); return n; });
  const assign = () => { if (!sel.size) return; setToast(`«${course.title}» назначен ${sel.size} сотрудникам`); setSel(new Set()); };

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
      {/* Course picker */}
      <Reveal className="lg:col-span-5">
        <Panel className="h-full">
          <PanelHead no="01" title="Что назначаем" right="курс" />
          <div className="space-y-2 px-4 pb-4">
            {courses.map((c) => {
              const active = course.id === c.id;
              return (
                <button key={c.id} onClick={() => setCourse(c)} className={cn("flex w-full items-center gap-3 rounded-2xl p-3 text-left transition-colors", active ? "bg-accent/[0.1] ring-1 ring-accent/25" : "tile hover:bg-white/50 dark:hover:bg-white/[0.06]")}>
                  <IconTile icon={c.icon} tone={c.tone} size={44} />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[13.5px] font-700">{c.title}</div>
                    <Tag className="text-ink-mute">{c.cat}</Tag>
                  </div>
                  {active && <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent text-white"><Check size={12} weight="bold" /></span>}
                </button>
              );
            })}
          </div>
        </Panel>
      </Reveal>

      {/* People picker */}
      <Reveal className="lg:col-span-7" delay={0.05}>
        <Panel className="h-full">
          <PanelHead no="02" title="Кому назначаем" right={`выбрано ${sel.size}`} />
          <div className="flex items-center justify-between px-5 pb-2">
            <button onClick={toggleAll} className="flex items-center gap-2 text-[12.5px] font-600 text-ink-soft transition-colors hover:text-ink">
              {allSel ? <CheckSquare size={18} weight="fill" className="text-accent" /> : <Square size={18} />} Вся команда
            </button>
          </div>
          <div className="space-y-1 px-3">
            {teamMembers.map((m) => {
              const on = sel.has(m.name);
              return (
                <button key={m.name} onClick={() => toggle(m.name)} className={cn("flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition-colors", on ? "bg-accent/[0.08]" : "hover:bg-white/50 dark:hover:bg-white/[0.06]")}>
                  {on ? <CheckSquare size={20} weight="fill" className="shrink-0 text-accent" /> : <Square size={20} className="shrink-0 text-ink-mute" />}
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-accent to-accent-2 text-[11px] font-700 text-white">{m.initials}</div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[13px] font-700">{m.name}{m.me && " · ты"}</div>
                    <Tag className="text-ink-mute">{m.role}</Tag>
                  </div>
                </button>
              );
            })}
          </div>
          <div className="p-4">
            <button onClick={assign} disabled={!sel.size} className={cn("flex w-full items-center justify-center gap-2 rounded-full py-3 text-[14px] font-700 transition-transform active:scale-[0.98]", sel.size ? "bg-accent text-white" : "tile text-ink-mute")}>
              <PaperPlaneRight size={16} weight="fill" /> Назначить {sel.size ? `(${sel.size})` : ""}
            </button>
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
