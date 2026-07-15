import { Play, CaretRight, Check } from "@phosphor-icons/react";
import { courses, knowledge } from "../data";
import { Panel, PanelHead, Tag, Hand, Bar, Reveal, cn } from "../ui";

export default function Growth() {
  const next = courses.find((c) => c.progress > 0 && c.progress < 100) ?? courses[0];
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
      <Reveal className="lg:col-span-12">
        <Panel tone="accent">
          <PanelHead no="01" title="Продолжить обучение" right={`${next.done}/${next.total} уроков`} />
          <div className="flex flex-col items-start gap-6 px-6 pb-6 sm:flex-row sm:items-center">
            <div className="grid h-20 w-20 shrink-0 place-items-center rounded-[1.4rem] bg-white/60 text-[38px] shadow-soft ring-1 ring-white/60">{next.emoji}</div>
            <div className="min-w-0 flex-1">
              <h2 className="text-[24px] font-800 leading-tight tracking-tight">{next.title}</h2>
              <div className="mt-3 flex items-center gap-3">
                <Bar value={next.progress} color="var(--color-ink)" track="rgba(35,32,48,0.15)" className="max-w-sm" />
                <span className="text-[13px] font-800">{next.progress}%</span>
              </div>
              <Hand className="mt-1.5 block text-[18px] text-ink/70">ещё чуть-чуть до финиша ▸</Hand>
            </div>
            <button className="group flex shrink-0 items-center gap-2.5 rounded-full bg-ink py-3 pl-5 pr-3 text-white transition-transform active:scale-[0.97]">
              <span className="text-[14px] font-700">Продолжить</span>
              <span className="grid h-8 w-8 place-items-center rounded-full bg-white/15 transition-transform group-hover:translate-x-0.5">
                <Play size={14} weight="fill" />
              </span>
            </button>
          </div>
        </Panel>
      </Reveal>

      <Reveal className="lg:col-span-7" delay={0.05}>
        <Panel className="h-full">
          <PanelHead no="02" title="Мои курсы" right={`${courses.length} всего`} />
          <div className="px-3 pb-3">
            {courses.map((c) => {
              const done = c.progress === 100;
              return (
                <div key={c.id} className="flex items-center gap-4 rounded-2xl p-3 transition-colors hover:bg-white/50">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white/60 text-[21px] ring-1 ring-black/[0.04]">{c.emoji}</div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="truncate text-[14px] font-700">{c.title}</span>
                      <span className="rounded-full bg-white/60 px-2 py-0.5 ring-1 ring-black/[0.05]"><Tag className="text-ink-mute">{c.cat}</Tag></span>
                    </div>
                    <Bar value={c.progress} color={done ? "var(--color-mint)" : "var(--color-indigo)"} className="mt-2 h-1.5" />
                  </div>
                  {done ? (
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-mint text-white"><Check size={13} weight="bold" /></span>
                  ) : (
                    <span className="shrink-0 text-[13px] font-800 text-indigo">{c.progress}%</span>
                  )}
                </div>
              );
            })}
          </div>
        </Panel>
      </Reveal>

      <Reveal className="lg:col-span-5" delay={0.1}>
        <Panel className="h-full">
          <PanelHead no="03" title="База знаний" right="wiki" />
          <div className="px-3 pb-3">
            {knowledge.map((k) => (
              <a key={k.id} className="group flex cursor-pointer items-center gap-3 rounded-2xl p-3 transition-colors hover:bg-white/50">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-sky-soft text-[19px]">{k.emoji}</div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[13.5px] font-700">{k.title}</div>
                  <div className="text-[11.5px] text-ink-mute">{k.tag}</div>
                </div>
                <CaretRight size={15} weight="bold" className="shrink-0 text-ink-mute transition-transform group-hover:translate-x-0.5" />
              </a>
            ))}
          </div>
        </Panel>
      </Reveal>
    </div>
  );
}
