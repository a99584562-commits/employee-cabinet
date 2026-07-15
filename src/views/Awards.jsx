import { motion } from "motion/react";
import { Fire, Lock } from "@phosphor-icons/react";
import { awards, user } from "../data";
import { Card, Bar, Reveal, cn, plural } from "../ui";

export default function Awards() {
  const earned = awards.filter((a) => a.earned);
  const locked = awards.filter((a) => !a.earned);
  return (
    <div className="grid gap-4 lg:grid-cols-12 lg:auto-rows-min">
      {/* Streak banner */}
      <Reveal className="lg:col-span-12">
        <Card inner="bg-gradient-to-r from-flame-soft via-award-soft to-surface">
          <div className="flex items-center gap-5 p-6 sm:p-7">
            <div className="grid h-16 w-16 shrink-0 place-items-center rounded-[1.3rem] bg-surface shadow-soft ring-1 ring-[--color-hairline]">
              <Fire size={32} weight="fill" className="text-flame" />
            </div>
            <div className="flex-1">
              <div className="font-display text-[28px] font-600 leading-none">{user.streakDays} {plural(user.streakDays, ["день", "дня", "дней"])} подряд</div>
              <div className="mt-1.5 text-[13.5px] font-500 text-ink-soft">Ты в огне — не пропусти сегодня, чтобы не потерять стрик 🔥</div>
            </div>
            <div className="hidden text-right sm:block">
              <div className="font-display text-[26px] font-600 text-award">{earned.length}</div>
              <div className="text-[12px] font-600 text-ink-mute">наград</div>
            </div>
          </div>
        </Card>
      </Reveal>

      {/* Earned */}
      <Reveal className="lg:col-span-12" delay={0.06}>
        <Card>
          <div className="p-6">
            <div className="mb-5 text-[11px] font-700 uppercase tracking-[0.18em] text-ink-mute">Полученные · {earned.length}</div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {earned.map((a) => (
                <motion.div
                  key={a.id}
                  whileHover={{ y: -4, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 380, damping: 20 }}
                  className="relative flex flex-col items-center gap-2 overflow-hidden rounded-[1.5rem] bg-award-soft p-5 text-center ring-1 ring-award/20"
                >
                  <span className="absolute -right-3 -top-3 h-14 w-14 rounded-full bg-white/40 blur-xl" />
                  <span className="text-[40px]">{a.emoji}</span>
                  <div className="text-[13.5px] font-700 leading-tight">{a.title}</div>
                  <div className="text-[11.5px] font-500 text-ink-soft">{a.sub}</div>
                  {a.rarity && (
                    <span className="mt-0.5 rounded-full bg-surface/70 px-2 py-0.5 text-[10px] font-700 uppercase tracking-wider text-award">{a.rarity}</span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </Card>
      </Reveal>

      {/* Locked / in progress */}
      <Reveal className="lg:col-span-12" delay={0.1}>
        <Card>
          <div className="p-6">
            <div className="mb-5 text-[11px] font-700 uppercase tracking-[0.18em] text-ink-mute">В процессе · {locked.length}</div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {locked.map((a) => (
                <div key={a.id} className="flex items-center gap-4 rounded-2xl bg-surface-2 p-4 ring-1 ring-[--color-hairline]">
                  <div className="relative grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-surface text-[26px] ring-1 ring-[--color-hairline]">
                    <span className="opacity-35 grayscale">{a.emoji}</span>
                    <span className="absolute -bottom-1 -right-1 grid h-6 w-6 place-items-center rounded-full bg-ink text-canvas">
                      <Lock size={12} weight="fill" />
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[14px] font-700">{a.title}</div>
                    <div className="mb-2 truncate text-[11.5px] font-500 text-ink-mute">{a.sub}</div>
                    <div className="flex items-center gap-2">
                      <Bar value={a.progress} color="var(--color-award)" className="h-1.5" />
                      <span className="text-[12px] font-700 text-award">{a.progress}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </Reveal>
    </div>
  );
}
