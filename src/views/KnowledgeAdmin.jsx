import { useEffect, useState } from "react";
import { Plus, Eye, Check } from "@phosphor-icons/react";
import { kbArticles } from "../data";
import { Panel, PanelHead, Tag, IconTile, Portal, Reveal, cn } from "../ui";

const TONES = ["indigo", "mint", "amber", "sky", "pink"];

export default function KnowledgeAdmin() {
  const [list, setList] = useState(() => kbArticles.map((a) => ({ ...a })));
  const [toast, setToast] = useState(null);
  useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(null), 2400); return () => clearTimeout(t); }, [toast]);

  const published = list.filter((a) => a.status === "published").length;
  const toggle = (id) => setList((l) => l.map((a) => (a.id === id ? { ...a, status: a.status === "published" ? "draft" : "published" } : a)));
  const add = () => {
    const id = Math.max(0, ...list.map((a) => a.id)) + 1;
    setList((l) => [{ id, title: "Новая статья", tag: "Черновик", icon: "book", tone: TONES[id % TONES.length], status: "draft", views: 0 }, ...l]);
    setToast("Черновик статьи создан");
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      <Reveal>
        <Panel>
          <PanelHead no="01" title="База знаний · управление" right={`${published}/${list.length} опубликовано`} />
          <div className="flex items-center justify-between px-5 pb-4">
            <Tag className="text-ink-mute">Статьи и курсы компании</Tag>
            <button onClick={add} className="flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-[12.5px] font-700 text-white transition-transform active:scale-95"><Plus size={15} weight="bold" /> Добавить статью</button>
          </div>
          <div className="space-y-2 px-4 pb-4">
            {list.map((a) => {
              const pub = a.status === "published";
              return (
                <div key={a.id} className="tile flex items-center gap-3 rounded-2xl p-3.5">
                  <IconTile icon={a.icon} tone={a.tone} size={46} />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[14px] font-700">{a.title}</div>
                    <div className="mt-0.5 flex items-center gap-2">
                      <Tag className="text-ink-mute">{a.tag}</Tag>
                      <span className="flex items-center gap-1 text-[11px] text-ink-mute"><Eye size={12} weight="regular" />{a.views}</span>
                    </div>
                  </div>
                  <span className={cn("rounded-full px-2.5 py-1 text-[10.5px] font-700 uppercase tracking-wide", pub ? "bg-mint-soft text-mint" : "bg-amber-soft text-amber")}>{pub ? "Опубликовано" : "Черновик"}</span>
                  <button onClick={() => toggle(a.id)} className={cn("rounded-full px-3.5 py-1.5 text-[12px] font-700 transition-colors", pub ? "tile text-ink-soft" : "bg-mint text-white")}>{pub ? "Снять" : "Опубликовать"}</button>
                </div>
              );
            })}
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
