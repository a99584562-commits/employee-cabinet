import { ArrowUpRight, Fire, Star } from "@phosphor-icons/react";
import { salary, kpis, tasks, courses, awards, team, user } from "../data";
import { Panel, PanelHead, Tag, Hand, Badge, CountUp, Ring, Bar, Reveal, rub, cn, plural } from "../ui";

const SEG = ["var(--color-indigo)", "var(--color-mint)", "var(--color-amber)"];

/* 01 · Salary */
function SalaryHero() {
  const delta = (((salary.total - salary.prevTotal) / salary.prevTotal) * 100).toFixed(1);
  const max = Math.max(...salary.history.map((h) => h.v));
  return (
    <Panel className="flex h-full flex-col">
      <PanelHead no="01" title="Зарплата · Июль" right="₽ на карту" />
      <div className="flex flex-1 flex-col px-5 pb-5">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-end gap-2">
              <span className="text-[46px] font-800 leading-none tracking-tight sm:text-[58px]">
                <CountUp to={salary.total} format={(v) => new Intl.NumberFormat("ru-RU").format(Math.round(v))} />
              </span>
              <span className="pb-2 text-2xl font-600 text-ink-mute">₽</span>
            </div>
            <Hand className="mt-1 block text-[20px] text-violet">чистыми, без сюрпризов ▸</Hand>
          </div>
          <span className="flex items-center gap-1 rounded-full bg-mint-soft px-2.5 py-1 text-mint">
            <ArrowUpRight size={13} weight="bold" /><span className="text-[12.5px] font-700">+{delta}%</span>
          </span>
        </div>

        <div className="mt-6 flex h-2.5 w-full overflow-hidden rounded-full">
          {salary.breakdown.map((b, i) => (
            <div key={b.label} style={{ width: `${(b.amount / salary.total) * 100}%`, background: SEG[i] }} />
          ))}
        </div>
        <div className="mt-3.5 grid grid-cols-3 gap-2">
          {salary.breakdown.map((b, i) => (
            <div key={b.label} className="flex items-start gap-2">
              <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: SEG[i] }} />
              <div className="min-w-0">
                <div className="text-[11px] font-500 leading-tight text-ink-mute">{b.label}</div>
                <div className="text-[13px] font-700">{rub(b.amount)}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-auto pt-7">
          <Tag className="text-ink-mute">Динамика · 6 мес</Tag>
          <div className="mt-3 flex items-end gap-2.5">
            {salary.history.map((h, i) => {
              const last = i === salary.history.length - 1;
              return (
                <div key={h.m} className="flex flex-1 flex-col items-center gap-1.5">
                  <span className="text-[10.5px] font-600 text-ink-mute">{Math.round(h.v / 1000)}</span>
                  <div
                    className={cn("bar-grow w-full rounded-lg", last ? "bg-gradient-to-t from-indigo to-violet" : "bg-ink/[0.08]")}
                    style={{ "--h": `${(h.v / max) * 66 + 8}px`, height: `${(h.v / max) * 66 + 8}px`, animationDelay: `${0.15 + i * 0.05}s` }}
                  />
                  <span className="text-[10.5px] font-500 text-ink-mute">{h.m}</span>
                </div>
              );
            })}
          </div>
          <div className="mt-5 flex items-center justify-between border-t border-black/[0.06] pt-4">
            <Tag className="text-ink-soft">Выплата 05.08</Tag>
            <div className="flex gap-1.5">
              {["Битрикс24", "amoCRM", "1С"].map((s) => (
                <span key={s} className="rounded-full bg-white/60 px-2.5 py-1 ring-1 ring-black/[0.05]"><Tag className="text-ink-mute">{s}</Tag></span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Panel>
  );
}

/* 02 · Level */
function LevelCard() {
  const pct = Math.round((user.xp / user.xpToNext) * 100);
  return (
    <Panel tone="accent" className="flex h-full flex-col">
      <PanelHead no="02" title="Уровень" right="XP" />
      <div className="flex flex-1 flex-col px-5 pb-5">
        <div className="flex items-end gap-3">
          <span className="text-[60px] font-800 leading-[0.8]">07</span>
          <span className="mb-2 text-[17px] font-800">{user.levelTitle}</span>
        </div>
        <div className="mt-5">
          <div className="mb-1.5 flex items-center justify-between">
            <Tag className="text-ink/60">{user.xp} / {user.xpToNext} XP</Tag>
            <Tag className="text-ink/60">до ур.08 · {user.xpToNext - user.xp}</Tag>
          </div>
          <Bar value={pct} color="var(--color-ink)" track="rgba(35,32,48,0.15)" />
        </div>
        <div className="mt-auto flex items-center justify-between rounded-2xl bg-white/40 px-3.5 py-2.5 ring-1 ring-white/40">
          <div className="flex items-center gap-2">
            <Fire size={20} weight="fill" className="text-pink" />
            <span className="text-[14px] font-800">{user.streakDays} {plural(user.streakDays, ["день", "дня", "дней"])}</span>
            <Tag className="text-ink/50">подряд</Tag>
          </div>
          <Hand className="text-[18px] text-ink/70">не теряй!</Hand>
        </div>
      </div>
    </Panel>
  );
}

/* 03 · KPI */
function KpiStrip() {
  const colors = ["var(--color-indigo)", "var(--color-mint)", "var(--color-amber)", "var(--color-sky)"];
  return (
    <Panel>
      <PanelHead no="03" title="KPI · Июль" right="из Битрикс24" />
      <div className="grid grid-cols-2 gap-3 px-5 pb-5 sm:grid-cols-4">
        {kpis.map((k, i) => {
          const pct = Math.min((k.value / (k.unit === "%" && k.target === 100 ? 100 : k.target)) * 100, 100);
          return (
            <div key={k.key} className="flex flex-col items-center rounded-2xl bg-white/40 py-4 text-center ring-1 ring-black/[0.04]">
              <Ring value={pct} size={72} stroke={7} color={colors[i]}>
                <span className="text-[16px] font-800">{k.value}{k.unit}</span>
              </Ring>
              <div className="mt-2.5 text-[12.5px] font-700">{k.name}</div>
              <Tag className="mt-0.5 text-ink-mute">цель {k.target}{k.unit}</Tag>
            </div>
          );
        })}
      </div>
    </Panel>
  );
}

/* 05 · Tasks */
function TasksCard() {
  return (
    <Panel className="flex h-full flex-col">
      <PanelHead no="05" title="Задачи" right={`${tasks.length} акт`} />
      <div className="flex-1 px-3 pb-3">
        {tasks.map((t) => (
          <div key={t.id} className="flex items-center gap-3 rounded-2xl px-2.5 py-2 transition-colors hover:bg-white/50">
            <span className={cn("grid h-6 w-6 shrink-0 place-items-center rounded-full", t.hot ? "bg-pink-soft" : "ring-1 ring-black/12")}>
              {t.hot && <Fire size={12} weight="fill" className="text-pink" />}
            </span>
            <div className="min-w-0 flex-1">
              <div className="truncate text-[13px] font-600">{t.title}</div>
              <div className="truncate text-[11px] text-ink-mute">{t.project}</div>
            </div>
            <span className={cn("shrink-0 text-[11px] font-700", t.hot ? "text-pink" : "text-ink-mute")}>{t.due}</span>
          </div>
        ))}
      </div>
    </Panel>
  );
}

/* 04 · Team (dark glass) */
function TeamCard() {
  return (
    <Panel tone="dark" className="flex h-full flex-col">
      <PanelHead no="04" title="Команда" right="360°" onDark />
      <div className="flex flex-1 flex-col px-5 pb-5">
        <div className="flex items-end justify-between">
          <div className="flex items-end gap-1.5">
            <span className="bg-gradient-to-br from-white to-white/70 bg-clip-text text-[46px] font-800 leading-none text-transparent">#{team.myRank}</span>
            <span className="mb-1.5 text-[12px] text-white/50">/{team.total}</span>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-[19px] font-800"><Star size={16} weight="fill" className="text-amber" /> {team.peerRating}</div>
            <Tag className="text-white/45">{team.peerCount} коллег</Tag>
          </div>
        </div>
        <div className="mt-auto space-y-1 pt-5">
          {team.leaderboard.slice(0, 3).map((p, i) => (
            <div key={p.name} className={cn("flex items-center gap-3 rounded-xl px-2.5 py-1.5", p.me ? "bg-white/15" : "")}>
              <span className="text-[11px] font-700 text-white/40">{i + 1}</span>
              <span className={cn("flex-1 truncate text-[13px]", p.me ? "font-800 text-white" : "font-500 text-white/70")}>{p.name}{p.me && " · ты"}</span>
              <span className="text-[12px] font-700 text-white/80">{p.pts}</span>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}

/* 06 · Learning */
function CoursesCard() {
  const inProgress = courses.filter((c) => c.progress < 100).length;
  return (
    <Panel>
      <PanelHead no="06" title="Обучение" right={`${inProgress} в процессе`} />
      <div className="grid gap-2.5 px-5 pb-5 sm:grid-cols-2">
        {courses.map((c) => (
          <div key={c.id} className="flex items-center gap-3 rounded-2xl bg-white/40 p-3 ring-1 ring-black/[0.04]">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/70 text-[20px] ring-1 ring-black/[0.04]">{c.emoji}</div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <span className="truncate text-[13px] font-700">{c.title}</span>
                <span className="text-[12px] font-700 text-indigo">{c.progress}%</span>
              </div>
              <Bar value={c.progress} color={c.progress === 100 ? "var(--color-mint)" : "var(--color-indigo)"} className="mt-2 h-1.5" />
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}

/* 07 · Awards */
function AwardsPreview() {
  const earned = awards.filter((a) => a.earned).length;
  return (
    <Panel className="flex h-full flex-col">
      <PanelHead no="07" title="Награды" right={`${earned}/${awards.length}`} />
      <div className="flex flex-1 flex-col px-5 pb-5">
        <div className="grid grid-cols-4 place-items-center gap-x-2 gap-y-3.5">
          {awards.slice(0, 8).map((a) => (
            <Badge key={a.id} icon={a.icon} tier={a.tier} earned={a.earned} size={58} />
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between pt-4">
          <Tag className="text-ink-mute">Ближайшая · Мастер продаж 78%</Tag>
          <Hand className="text-[18px] text-violet">собери все!</Hand>
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
