import {
  TrendUp, Fire, Medal, Star, CaretRight, CheckCircle, Circle, ArrowUpRight, Sparkle,
} from "@phosphor-icons/react";
import { motion } from "motion/react";
import { salary, kpis, tasks, courses, awards, team, user } from "../data";
import { Card, CountUp, Ring, Bar, Reveal, rub, cn, plural } from "../ui";

const TONE = {
  ink: "var(--color-ink)",
  money: "var(--color-money)",
  flame: "var(--color-flame)",
};
const CVAR = (c) => `var(--color-${c})`;
const CSOFT = (c) => `var(--color-${c}-soft)`;

function Eyebrow({ children }) {
  return (
    <div className="text-[11px] font-700 uppercase tracking-[0.18em] text-ink-mute">{children}</div>
  );
}

/* ————— Salary hero ————— */
function SalaryHero({ className }) {
  const delta = (((salary.total - salary.prevTotal) / salary.prevTotal) * 100).toFixed(1);
  const max = Math.max(...salary.history.map((h) => h.v));
  return (
    <Card className={className}>
      <div className="flex h-full flex-col p-6 sm:p-7">
        <div className="mb-5 flex items-start justify-between">
          <div>
            <Eyebrow>Зарплата · {salary.month}</Eyebrow>
            <div className="mt-4 flex items-end gap-3">
              <span className="font-display text-[44px] font-600 leading-none tracking-tight sm:text-[56px]">
                <CountUp to={salary.total} format={(v) => new Intl.NumberFormat("ru-RU").format(Math.round(v))} />
              </span>
              <span className="pb-1.5 font-display text-2xl text-ink-mute">₽</span>
            </div>
          </div>
          <span className="flex items-center gap-1 rounded-full bg-money-soft px-2.5 py-1 text-[12px] font-700 text-money">
            <TrendUp size={14} weight="bold" /> +{delta}%
          </span>
        </div>

        {/* proportion bar */}
        <div className="flex h-2.5 w-full overflow-hidden rounded-full">
          {salary.breakdown.map((b) => (
            <div key={b.label} style={{ width: `${(b.amount / salary.total) * 100}%`, background: TONE[b.tone] }} />
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
          {salary.breakdown.map((b) => (
            <div key={b.label} className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: TONE[b.tone] }} />
              <span className="text-[13px] font-500 text-ink-soft">{b.label}</span>
              <span className="text-[13px] font-700">{rub(b.amount)}</span>
            </div>
          ))}
        </div>

        {/* history */}
        <div className="mt-auto pt-7">
          <div className="flex items-end gap-2.5 sm:gap-3">
            {salary.history.map((h, i) => (
              <div key={h.m} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className={cn("bar-grow w-full rounded-lg", i === salary.history.length - 1 ? "bg-ink" : "bg-[rgba(45,35,20,0.16)]")}
                  style={{ "--h": `${(h.v / max) * 68 + 8}px`, height: `${(h.v / max) * 68 + 8}px`, animationDelay: `${0.2 + i * 0.06}s` }}
                />
                <span className="text-[11px] font-600 text-ink-mute">{h.m}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-[12.5px] font-500 text-ink-soft">
            <Sparkle size={15} weight="fill" className="text-flame" />
            Выплата <b className="font-700 text-ink">{salary.payday}</b>
          </div>
        </div>
      </div>
    </Card>
  );
}

/* ————— Level / streak ————— */
function LevelCard({ className }) {
  const pct = Math.round((user.xp / user.xpToNext) * 100);
  return (
    <Card className={className} inner="bg-gradient-to-br from-flame-soft to-surface">
      <div className="flex h-full flex-col justify-between p-6">
        <div className="flex items-start justify-between">
          <div>
            <Eyebrow>Мой уровень</Eyebrow>
            <div className="mt-3 font-display text-[26px] font-600 leading-none">
              {user.levelTitle}
            </div>
            <div className="mt-1 text-[13px] font-500 text-ink-soft">Уровень {user.level}</div>
          </div>
          <Ring value={pct} size={72} stroke={8} color="var(--color-flame)">
            <span className="font-display text-[19px] font-700">{user.level}</span>
          </Ring>
        </div>
        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between text-[12px] font-600">
            <span className="text-ink-soft">{user.xp} / {user.xpToNext} XP</span>
            <span className="text-flame">до ур. {user.level + 1}</span>
          </div>
          <Bar value={pct} color="var(--color-flame)" />
          <div className="mt-4 flex items-center gap-2 rounded-2xl bg-flame/10 px-3.5 py-2.5">
            <Fire size={20} weight="fill" className="text-flame" />
            <span className="text-[13.5px] font-600">
              Стрик <b className="font-800">{user.streakDays} {plural(user.streakDays, ["день", "дня", "дней"])}</b> подряд
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}

/* ————— Team rank ————— */
function TeamCard({ className }) {
  return (
    <Card className={className} inner="bg-gradient-to-br from-team-soft to-surface">
      <div className="flex h-full flex-col p-6">
        <div className="flex items-start justify-between">
          <div>
            <Eyebrow>Команда</Eyebrow>
            <div className="mt-3 flex items-end gap-1.5">
              <span className="font-display text-[34px] font-600 leading-none text-team">#{team.myRank}</span>
              <span className="pb-1 text-[13px] font-500 text-ink-soft">из {team.total}</span>
            </div>
          </div>
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-team/12">
            <Medal size={26} weight="fill" className="text-team" />
          </div>
        </div>
        <div className="mt-4 flex items-center gap-1.5">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star key={s} size={16} weight={s <= Math.round(team.peerRating) ? "fill" : "regular"} className="text-award" />
          ))}
          <span className="ml-1 text-[13px] font-700">{team.peerRating}</span>
          <span className="text-[12px] text-ink-mute">· оценка {team.peerCount} коллег</span>
        </div>
        <div className="mt-auto flex flex-col gap-1 pt-5">
          {team.leaderboard.slice(0, 3).map((p, i) => (
            <div key={p.name} className={cn("flex items-center gap-2.5 rounded-xl px-2.5 py-1.5", p.me && "bg-team/10")}>
              <span className="w-4 text-[12px] font-700 text-ink-mute">{i + 1}</span>
              <span className={cn("flex-1 truncate text-[13px]", p.me ? "font-800 text-team" : "font-500 text-ink-soft")}>
                {p.name}{p.me && " · ты"}
              </span>
              <span className="text-[12px] font-700 text-ink-soft">{p.pts}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

/* ————— KPI strip ————— */
function KpiStrip({ className }) {
  return (
    <Card className={className}>
      <div className="p-6">
        <div className="mb-5 flex items-center justify-between">
          <Eyebrow>KPI · {salary.month}</Eyebrow>
          <span className="text-[12px] font-600 text-ink-mute">данные из Битрикс24</span>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {kpis.map((k) => {
            const pct = Math.min((k.value / (k.unit === "%" && k.target === 100 ? 100 : k.target)) * 100, 100);
            return (
              <div key={k.key} className="flex flex-col items-center text-center">
                <Ring value={pct} size={78} stroke={8} color={CVAR(k.color)}>
                  <span className="font-display text-[17px] font-700">
                    {k.value}{k.unit}
                  </span>
                </Ring>
                <div className="mt-3 text-[13px] font-700">{k.name}</div>
                <div className="mt-0.5 text-[11.5px] font-500 leading-tight text-ink-mute">{k.hint}</div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}

/* ————— Tasks ————— */
function TasksCard({ className }) {
  return (
    <Card className={className}>
      <div className="flex h-full flex-col p-6">
        <div className="mb-4 flex items-center justify-between">
          <Eyebrow>Задачи</Eyebrow>
          <span className="rounded-full bg-surface-2 px-2.5 py-0.5 text-[12px] font-700 text-ink-soft ring-1 ring-[--color-hairline]">
            {tasks.length}
          </span>
        </div>
        <div className="flex flex-col gap-1.5">
          {tasks.map((t) => (
            <div key={t.id} className="group flex items-center gap-3 rounded-2xl px-2 py-2 transition-colors duration-300 hover:bg-surface-2">
              {t.hot ? (
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-task-soft">
                  <Fire size={14} weight="fill" className="text-task" />
                </span>
              ) : (
                <Circle size={22} weight="regular" className="shrink-0 text-ink-mute transition-colors group-hover:text-money" />
              )}
              <div className="min-w-0 flex-1">
                <div className="truncate text-[13.5px] font-600">{t.title}</div>
                <div className="truncate text-[11.5px] font-500 text-ink-mute">{t.project}</div>
              </div>
              <span className={cn("shrink-0 text-[11.5px] font-700", t.hot ? "text-task" : "text-ink-mute")}>{t.due}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

/* ————— Courses preview ————— */
function CoursesCard({ className }) {
  const inProgress = courses.filter((c) => c.progress < 100).length;
  return (
    <Card className={className}>
      <div className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <Eyebrow>Обучение</Eyebrow>
          <span className="text-[12px] font-600 text-ink-mute">{inProgress} в процессе</span>
        </div>
        <div className="grid gap-2.5 sm:grid-cols-2">
          {courses.map((c) => (
            <div key={c.id} className="flex items-center gap-3 rounded-2xl bg-surface-2 p-3 ring-1 ring-[--color-hairline]">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-learn-soft text-[20px]">{c.emoji}</div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <div className="truncate text-[13.5px] font-700">{c.title}</div>
                  <span className="ml-2 text-[12px] font-700 text-learn">{c.progress}%</span>
                </div>
                <Bar value={c.progress} color="var(--color-learn)" className="mt-2 h-1.5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

/* ————— Awards preview ————— */
function AwardsPreview({ className }) {
  const earned = awards.filter((a) => a.earned);
  return (
    <Card className={className}>
      <div className="flex h-full flex-col p-6">
        <div className="mb-4 flex items-center justify-between">
          <Eyebrow>Награды</Eyebrow>
          <span className="rounded-full bg-award-soft px-2.5 py-0.5 text-[12px] font-700 text-award">
            {earned.length} получено
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-5">
          {awards.slice(0, 5).map((a) => (
            <motion.div
              key={a.id}
              whileHover={{ y: -3, scale: 1.04 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className={cn(
                "flex aspect-square flex-col items-center justify-center gap-1 rounded-2xl ring-1",
                a.earned ? "bg-award-soft ring-award/20" : "bg-surface-2 ring-[--color-hairline] grayscale opacity-55"
              )}
              title={a.title}
            >
              <span className="text-[26px]">{a.emoji}</span>
            </motion.div>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-1.5 text-[12.5px] font-600 text-ink-soft">
          <span>Ближайшая: <b className="text-ink">Мастер продаж</b> — 78%</span>
        </div>
      </div>
    </Card>
  );
}

export default function Dashboard() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-12 lg:auto-rows-min">
      <Reveal className="md:col-span-2 lg:col-span-7 lg:row-span-2" delay={0.02}>
        <SalaryHero className="h-full" />
      </Reveal>
      <Reveal className="lg:col-span-5" delay={0.08}>
        <LevelCard className="h-full" />
      </Reveal>
      <Reveal className="lg:col-span-5" delay={0.12}>
        <TeamCard className="h-full" />
      </Reveal>
      <Reveal className="md:col-span-2 lg:col-span-7" delay={0.06}>
        <KpiStrip />
      </Reveal>
      <Reveal className="lg:col-span-5" delay={0.1}>
        <TasksCard className="h-full" />
      </Reveal>
      <Reveal className="md:col-span-2 lg:col-span-7" delay={0.08}>
        <CoursesCard />
      </Reveal>
      <Reveal className="lg:col-span-5" delay={0.12}>
        <AwardsPreview className="h-full" />
      </Reveal>
    </div>
  );
}
