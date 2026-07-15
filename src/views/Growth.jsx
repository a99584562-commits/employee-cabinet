import { motion } from "motion/react";
import { Play, BookOpen, CaretRight, CheckCircle } from "@phosphor-icons/react";
import { courses, knowledge } from "../data";
import { Card, Bar, Reveal, cn } from "../ui";

export default function Growth() {
  return (
    <div className="grid gap-4 lg:grid-cols-12 lg:auto-rows-min">
      {/* Continue learning — hero course */}
      {(() => {
        const next = courses.find((c) => c.progress > 0 && c.progress < 100) ?? courses[0];
        return (
          <Reveal className="lg:col-span-12">
            <Card inner="bg-gradient-to-br from-learn-soft via-surface to-surface">
              <div className="flex flex-col items-start gap-6 p-7 sm:flex-row sm:items-center">
                <div className="grid h-20 w-20 shrink-0 place-items-center rounded-[1.4rem] bg-surface text-[38px] ring-1 ring-[--color-hairline] shadow-soft">
                  {next.emoji}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] font-700 uppercase tracking-[0.18em] text-learn">Продолжить обучение</div>
                  <h2 className="mt-2 font-display text-[24px] font-600 leading-tight">{next.title}</h2>
                  <div className="mt-3 flex items-center gap-3">
                    <Bar value={next.progress} color="var(--color-learn)" className="max-w-xs" />
                    <span className="text-[13px] font-700 text-learn">{next.progress}%</span>
                  </div>
                  <div className="mt-1.5 text-[12.5px] font-500 text-ink-mute">Пройдено {next.done} из {next.total} уроков</div>
                </div>
                <button className="group flex shrink-0 items-center gap-2 rounded-full bg-ink py-3 pl-6 pr-2.5 text-canvas transition-transform duration-300 active:scale-[0.97]">
                  <span className="text-[14px] font-600">Продолжить</span>
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-white/15 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5">
                    <Play size={15} weight="fill" />
                  </span>
                </button>
              </div>
            </Card>
          </Reveal>
        );
      })()}

      {/* All courses */}
      <Reveal className="lg:col-span-7" delay={0.06}>
        <Card>
          <div className="p-6">
            <div className="mb-5 text-[11px] font-700 uppercase tracking-[0.18em] text-ink-mute">Мои курсы</div>
            <div className="flex flex-col gap-2.5">
              {courses.map((c) => {
                const done = c.progress === 100;
                return (
                  <div key={c.id} className="flex items-center gap-4 rounded-2xl bg-surface-2 p-3.5 ring-1 ring-[--color-hairline]">
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-surface text-[22px] ring-1 ring-[--color-hairline]">{c.emoji}</div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="truncate text-[14px] font-700">{c.title}</span>
                        <span className="rounded-full bg-surface px-2 py-0.5 text-[10.5px] font-600 text-ink-mute ring-1 ring-[--color-hairline]">{c.cat}</span>
                      </div>
                      <Bar value={c.progress} color={done ? "var(--color-money)" : "var(--color-learn)"} className="mt-2 h-1.5" />
                    </div>
                    {done ? (
                      <CheckCircle size={24} weight="fill" className="shrink-0 text-money" />
                    ) : (
                      <span className="shrink-0 text-[13px] font-700 text-learn">{c.progress}%</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      </Reveal>

      {/* Knowledge base */}
      <Reveal className="lg:col-span-5" delay={0.1}>
        <Card>
          <div className="p-6">
            <div className="mb-5 flex items-center gap-2 text-[11px] font-700 uppercase tracking-[0.18em] text-ink-mute">
              <BookOpen size={15} weight="fill" /> База знаний
            </div>
            <div className="flex flex-col gap-2">
              {knowledge.map((k) => (
                <motion.a
                  key={k.id}
                  whileHover={{ x: 3 }}
                  transition={{ type: "spring", stiffness: 400, damping: 24 }}
                  className="group flex cursor-pointer items-center gap-3 rounded-2xl p-3 transition-colors duration-300 hover:bg-surface-2"
                >
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-team-soft text-[19px]">{k.emoji}</div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[13.5px] font-700">{k.title}</div>
                    <div className="text-[11.5px] font-500 text-ink-mute">{k.tag}</div>
                  </div>
                  <CaretRight size={16} weight="bold" className="shrink-0 text-ink-mute transition-transform duration-300 group-hover:translate-x-0.5" />
                </motion.a>
              ))}
            </div>
          </div>
        </Card>
      </Reveal>
    </div>
  );
}
