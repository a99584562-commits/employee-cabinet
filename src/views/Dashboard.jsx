import { ArrowUpRight, Fire } from "@phosphor-icons/react";
import { salary, kpis, tasks, courses, awards, team, user } from "../data";
import { Panel, Tag, Hand, DotGrid, CountUp, Ring, Bar, Reveal, rub, cn, plural } from "../ui";

const SEG = { ink: "var(--color-ink)", yellow: "var(--color-yellow)", pink: "var(--color-pink)" };
const segTone = ["ink", "yellow", "pink"];

function Head({ no, title, right, onDark }) {
  return (
    <div className={cn("flex items-center justify-between border-b px-5 py-3", onDark ? "border-paper/20" : "border-ink/12")}>
      <div className="flex items-center gap-2.5">
        <span className={cn("mono text-[11px]", onDark ? "text-yellow" : "text-mute")}>{no}</span>
        <Tag>{title}</Tag>
      </div>
      {right && <Tag className={onDark ? "text-paper/50" : "text-mute"}>{right}</Tag>}
    </div>
  );
}

/* ————— 01 · Salary ————— */
function SalaryHero() {
  const delta = (((salary.total - salary.prevTotal) / salary.prevTotal) * 100).toFixed(1);
  const max = Math.max(...salary.history.map((h) => h.v));
  return (
    <Panel className="flex h-full flex-col">
      <Head no="01" title="Зарплата · Июль 2026" right="NET · RUB" />
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-end gap-2">
              <span className="text-[46px] font-800 leading-none tracking-tight sm:text-[60px]">
                <CountUp to={salary.total} format={(v) => new Intl.NumberFormat("ru-RU").format(Math.round(v))} />
              </span>
              <span className="mono pb-2 text-2xl text-mute">₽</span>
            </div>
            <Hand className="mt-1 block text-[20px] text-pink -rotate-2">чистыми на карту ▸</Hand>
          </div>
          <span className="flex items-center gap-1 border border-ink bg-yellow px-2 py-1">
            <ArrowUpRight size={13} weight="bold" />
            <span className="mono text-[12px] font-700">+{delta}%</span>
          </span>
        </div>

        {/* proportion */}
        <div className="mt-6 flex h-3 w-full border border-ink">
          {salary.breakdown.map((b, i) => (
            <div key={b.label} className={cn(i > 0 && "border-l border-ink")} style={{ width: `${(b.amount / salary.total) * 100}%`, background: SEG[segTone[i]] }} />
          ))}
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {salary.breakdown.map((b, i) => (
            <div key={b.label} className="flex items-start gap-2">
              <span className="mt-1 h-2.5 w-2.5 shrink-0 border border-ink" style={{ background: SEG[segTone[i]] }} />
              <div className="min-w-0">
                <div className="mono text-[10.5px] uppercase leading-tight text-mute">{b.label}</div>
                <div className="text-[13px] font-700">{rub(b.amount)}</div>
              </div>
            </div>
          ))}
        </div>

        {/* history */}
        <div className="mt-auto pt-7">
          <Tag className="text-mute">Динамика · 6 мес</Tag>
          <div className="mt-3 flex items-end gap-2">
            {salary.history.map((h, i) => {
              const last = i === salary.history.length - 1;
              return (
                <div key={h.m} className="flex flex-1 flex-col items-center gap-1.5">
                  <span className="mono text-[10px] text-mute">{Math.round(h.v / 1000)}</span>
                  <div
                    className={cn("bar-grow w-full border border-ink", last ? "bg-ink" : "bg-ink/10")}
                    style={{ "--h": `${(h.v / max) * 70 + 8}px`, height: `${(h.v / max) * 70 + 8}px`, animationDelay: `${0.15 + i * 0.05}s` }}
                  />
                  <span className="mono text-[10px] uppercase text-mute">{h.m}</span>
                </div>
              );
            })}
          </div>
          <div className="mt-5 flex items-center justify-between border-t border-ink/12 pt-4">
            <Tag>Выплата 05.08</Tag>
            <div className="flex gap-1.5">
              {["Битрикс24", "amoCRM", "1С"].map((s) => (
                <span key={s} className="border border-ink px-2 py-0.5"><Tag>{s}</Tag></span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Panel>
  );
}

/* ————— 02 · Level (yellow accent) ————— */
function LevelCard() {
  const pct = Math.round((user.xp / user.xpToNext) * 100);
  return (
    <Panel tone="yellow" className="flex h-full flex-col">
      <Head no="02" title="Уровень" right="XP" />
      <div className="relative flex flex-1 flex-col p-5">
        <DotGrid className="pointer-events-none absolute right-4 top-4 h-10 w-16 text-ink/25" />
        <div className="flex items-end gap-3">
          <span className="text-[64px] font-800 leading-[0.8]">07</span>
          <span className="mb-2 text-[18px] font-800 uppercase">Профи</span>
        </div>
        <div className="mt-5">
          <div className="mb-1.5 flex items-center justify-between">
            <Tag>{user.xp} / {user.xpToNext} XP</Tag>
            <Tag>до ур.08 · {user.xpToNext - user.xp}</Tag>
          </div>
          <Bar value={pct} color="var(--color-ink)" track="rgba(16,16,16,0.18)" />
        </div>
        <div className="mt-auto flex items-center justify-between border-t border-ink/25 pt-4">
          <div className="flex items-center gap-2">
            <Fire size={22} weight="fill" />
            <span className="text-[15px] font-800">{user.streakDays} {plural(user.streakDays, ["день", "дня", "дней"])}</span>
            <Tag className="text-ink/60">подряд</Tag>
          </div>
          <Hand className="text-[19px] -rotate-3">не теряй!</Hand>
        </div>
      </div>
    </Panel>
  );
}

/* ————— 03 · KPI ————— */
function KpiStrip() {
  const colors = ["var(--color-ink)", "var(--color-pink)", "var(--color-ink)", "var(--color-pink)"];
  return (
    <Panel>
      <Head no="03" title="KPI · Июль" right="SRC: Битрикс24" />
      <div className="grid grid-cols-2 gap-px bg-ink/12 sm:grid-cols-4">
        {kpis.map((k, i) => {
          const pct = Math.min((k.value / (k.unit === "%" && k.target === 100 ? 100 : k.target)) * 100, 100);
          return (
            <div key={k.key} className="flex flex-col items-center bg-card p-5 text-center">
              <Ring value={pct} size={74} stroke={7} color={colors[i]}>
                <span className="text-[16px] font-800">{k.value}{k.unit}</span>
              </Ring>
              <div className="mt-3 text-[13px] font-700">{k.name}</div>
              <Tag className="mt-1 text-mute">цель {k.target}{k.unit}</Tag>
            </div>
          );
        })}
      </div>
    </Panel>
  );
}

/* ————— 05 · Tasks ————— */
function TasksCard() {
  return (
    <Panel className="flex h-full flex-col">
      <Head no="05" title="Задачи" right={`${tasks.length} АКТ`} />
      <div className="flex-1 divide-y divide-ink/12">
        {tasks.map((t, i) => (
          <div key={t.id} className="flex items-center gap-3 px-5 py-3">
            <span className={cn("grid h-5 w-5 shrink-0 place-items-center border border-ink", t.hot ? "bg-pink" : "bg-card")}>
              {t.hot && <Fire size={11} weight="fill" />}
            </span>
            <div className="min-w-0 flex-1">
              <div className="truncate text-[13px] font-600">{t.title}</div>
              <Tag className="text-mute">{t.project}</Tag>
            </div>
            <Tag className={t.hot ? "text-pink" : "text-mute"}>{t.due}</Tag>
          </div>
        ))}
      </div>
    </Panel>
  );
}

/* ————— 04 · Team (ink) ————— */
function TeamCard() {
  return (
    <Panel tone="ink" className="flex h-full flex-col">
      <Head no="04" title="Команда" right="360°" onDark />
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-end justify-between">
          <div className="flex items-end gap-1.5">
            <span className="text-[48px] font-800 leading-none text-yellow">#{team.myRank}</span>
            <span className="mono mb-1.5 text-[12px] text-paper/60">/{team.total}</span>
          </div>
          <div className="text-right">
            <div className="text-[20px] font-800">★ {team.peerRating}</div>
            <Tag className="text-paper/50">{team.peerCount} коллег</Tag>
          </div>
        </div>
        <div className="mt-auto space-y-px pt-5">
          {team.leaderboard.slice(0, 3).map((p, i) => (
            <div key={p.name} className={cn("flex items-center gap-3 px-2 py-1.5", p.me && "bg-yellow text-ink")}>
              <span className="mono text-[11px]">{String(i + 1).padStart(2, "0")}</span>
              <span className={cn("flex-1 truncate text-[13px]", p.me ? "font-800" : "font-500")}>{p.name}{p.me && " · ты"}</span>
              <span className="mono text-[12px] font-700">{p.pts}</span>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}

/* ————— 06 · Learning ————— */
function CoursesCard() {
  const inProgress = courses.filter((c) => c.progress < 100).length;
  return (
    <Panel>
      <Head no="06" title="Обучение" right={`${inProgress} В ПРОЦ.`} />
      <div className="grid gap-px bg-ink/12 sm:grid-cols-2">
        {courses.map((c) => (
          <div key={c.id} className="flex items-center gap-3 bg-card p-4">
            <div className="grid h-11 w-11 shrink-0 place-items-center border border-ink text-[20px]">{c.emoji}</div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <span className="truncate text-[13px] font-700">{c.title}</span>
                <span className="mono text-[12px] font-700">{c.progress}%</span>
              </div>
              <Bar value={c.progress} color={c.progress === 100 ? "var(--color-ink)" : "var(--color-pink)"} className="mt-2" />
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}

/* ————— 07 · Awards ————— */
function AwardsPreview() {
  const earned = awards.filter((a) => a.earned).length;
  return (
    <Panel className="flex h-full flex-col">
      <Head no="07" title="Награды" right={`${earned}/${awards.length}`} />
      <div className="flex flex-1 flex-col p-5">
        <div className="grid grid-cols-4 gap-2">
          {awards.slice(0, 8).map((a) => (
            <div
              key={a.id}
              title={a.title}
              className={cn(
                "grid aspect-square place-items-center border border-ink text-[22px]",
                a.earned ? "bg-yellow" : "bg-card opacity-40 grayscale"
              )}
            >
              {a.emoji}
            </div>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between pt-4">
          <Tag className="text-mute">Ближайшая · Мастер продаж 78%</Tag>
          <Hand className="text-[19px] -rotate-3 text-pink">собери все!</Hand>
        </div>
      </div>
    </Panel>
  );
}

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12">
      <Reveal className="md:col-span-2 lg:col-span-8"><SalaryHero /></Reveal>
      <Reveal className="lg:col-span-4" delay={0.05}><LevelCard /></Reveal>

      <Reveal className="md:col-span-1 lg:col-span-5" delay={0.05}><KpiStrip /></Reveal>
      <Reveal className="md:col-span-1 lg:col-span-3" delay={0.1}><TasksCard /></Reveal>
      <Reveal className="md:col-span-2 lg:col-span-4" delay={0.1}><TeamCard /></Reveal>

      <Reveal className="md:col-span-2 lg:col-span-8" delay={0.05}><CoursesCard /></Reveal>
      <Reveal className="md:col-span-2 lg:col-span-4" delay={0.1}><AwardsPreview /></Reveal>
    </div>
  );
}
