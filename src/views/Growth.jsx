import { Play, CaretRight, Check } from "@phosphor-icons/react";
import { courses, knowledge } from "../data";
import { Panel, PanelHead, Tag, Hand, Bar, Reveal, cn } from "../ui";

export default function Growth() {
  const next = courses.find((c) => c.progress > 0 && c.progress < 100) ?? courses[0];
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
      {/* Continue */}
      <Reveal className="lg:col-span-12">
        <Panel tone="yellow">
          <PanelHead no="01" title="Продолжить обучение" right={`${next.done}/${next.total} УРОКОВ`} />
          <div className="flex flex-col items-start gap-6 p-6 sm:flex-row sm:items-center">
            <div className="grid h-20 w-20 shrink-0 place-items-center border border-ink bg-card text-[38px]">{next.emoji}</div>
            <div className="min-w-0 flex-1">
              <h2 className="text-[26px] font-800 uppercase leading-none tracking-tight">{next.title}</h2>
              <div className="mt-3 flex items-center gap-3">
                <Bar value={next.progress} color="var(--color-ink)" track="rgba(16,16,16,0.18)" className="max-w-sm" />
                <span className="mono text-[13px] font-700">{next.progress}%</span>
              </div>
              <Hand className="mt-2 block text-[18px] -rotate-1">ещё чуть-чуть до финиша ▸</Hand>
            </div>
            <button className="group flex shrink-0 items-center gap-3 border border-ink bg-ink py-3 pl-5 pr-3 text-paper transition-colors hover:bg-pink hover:text-ink">
              <span className="text-[14px] font-700 uppercase">Продолжить</span>
              <span className="grid h-8 w-8 place-items-center border border-current transition-transform group-hover:translate-x-0.5">
                <Play size={14} weight="fill" />
              </span>
            </button>
          </div>
        </Panel>
      </Reveal>

      {/* Courses */}
      <Reveal className="lg:col-span-7" delay={0.05}>
        <Panel className="h-full">
          <PanelHead no="02" title="Мои курсы" right={`${courses.length} ВСЕГО`} />
          <div className="divide-y divide-ink/12">
            {courses.map((c, i) => {
              const done = c.progress === 100;
              return (
                <div key={c.id} className="flex items-center gap-4 p-4">
                  <span className="mono text-[11px] text-mute">{String(i + 1).padStart(2, "0")}</span>
                  <div className="grid h-11 w-11 shrink-0 place-items-center border border-ink text-[20px]">{c.emoji}</div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="truncate text-[14px] font-700">{c.title}</span>
                      <span className="border border-ink px-1.5 py-0.5"><Tag>{c.cat}</Tag></span>
                    </div>
                    <Bar value={c.progress} color={done ? "var(--color-ink)" : "var(--color-pink)"} className="mt-2" />
                  </div>
                  {done ? (
                    <span className="grid h-6 w-6 shrink-0 place-items-center bg-ink text-paper"><Check size={13} weight="bold" /></span>
                  ) : (
                    <span className="mono shrink-0 text-[13px] font-700">{c.progress}%</span>
                  )}
                </div>
              );
            })}
          </div>
        </Panel>
      </Reveal>

      {/* Knowledge */}
      <Reveal className="lg:col-span-5" delay={0.1}>
        <Panel className="h-full">
          <PanelHead no="03" title="База знаний" right="WIKI" />
          <div className="divide-y divide-ink/12">
            {knowledge.map((k) => (
              <a key={k.id} className="group flex cursor-pointer items-center gap-3 p-4 transition-colors hover:bg-paper-2">
                <div className="grid h-11 w-11 shrink-0 place-items-center border border-ink text-[19px]">{k.emoji}</div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[14px] font-700">{k.title}</div>
                  <Tag className="text-mute">{k.tag}</Tag>
                </div>
                <CaretRight size={15} weight="bold" className="shrink-0 transition-transform group-hover:translate-x-0.5" />
              </a>
            ))}
          </div>
        </Panel>
      </Reveal>
    </div>
  );
}
