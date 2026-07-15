import { Crown, Star } from "@phosphor-icons/react";
import { team } from "../data";
import { Panel, PanelHead, Tag, Hand, DotGrid, Bar, Reveal, cn } from "../ui";

const DIMS = [
  { label: "Надёжность", v: 4.8 },
  { label: "Командность", v: 4.5 },
  { label: "Инициатива", v: 4.6 },
];

export default function Team() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
      {/* Rank */}
      <Reveal className="lg:col-span-4">
        <Panel tone="ink" className="h-full">
          <PanelHead no="01" title="Моё место" right="RANK" onDark />
          <div className="relative flex flex-col items-center p-7 text-center">
            <DotGrid className="pointer-events-none absolute right-4 top-4 h-8 w-14 text-paper/20" />
            <div className="text-[80px] font-800 leading-none text-yellow">#{team.myRank}</div>
            <Tag className="mt-2 text-paper/60">из {team.total} в команде</Tag>
            <span className="mt-4 border border-yellow bg-yellow px-3 py-1 text-ink"><Tag>Топ-{Math.round((team.myRank / team.total) * 100)}% отдела</Tag></span>
          </div>
        </Panel>
      </Reveal>

      {/* Peer rating */}
      <Reveal className="lg:col-span-8" delay={0.05}>
        <Panel className="h-full">
          <PanelHead no="02" title="Оценка коллег · 360°" right="АНОНИМНО" />
          <div className="p-6">
            <div className="flex flex-wrap items-end gap-4">
              <span className="text-[56px] font-800 leading-none">{team.peerRating}</span>
              <div className="mb-2">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={18} weight={s <= Math.round(team.peerRating) ? "fill" : "regular"} />
                  ))}
                </div>
                <Tag className="mt-1 block text-mute">от {team.peerCount} коллег</Tag>
              </div>
              <Hand className="mb-2 ml-auto text-[20px] text-pink -rotate-3">так держать!</Hand>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {DIMS.map((d) => (
                <div key={d.label} className="border border-ink/12 p-3">
                  <div className="mb-2 flex items-center justify-between">
                    <Tag className="text-mute">{d.label}</Tag>
                    <span className="mono text-[13px] font-700">{d.v}</span>
                  </div>
                  <Bar value={(d.v / 5) * 100} color="var(--color-ink)" />
                </div>
              ))}
            </div>
          </div>
        </Panel>
      </Reveal>

      {/* Leaderboard */}
      <Reveal className="lg:col-span-12" delay={0.1}>
        <Panel>
          <PanelHead no="03" title="Рейтинг месяца" right={`${team.total} ЧЕЛ`} />
          <div className="divide-y divide-ink/12">
            {team.leaderboard.map((p, i) => (
              <div key={p.name} className={cn("flex items-center gap-4 px-5 py-3.5", p.me && "bg-yellow")}>
                <span className={cn("grid h-7 w-7 shrink-0 place-items-center border border-ink", i === 0 ? "bg-ink text-yellow" : "bg-card")}>
                  {i === 0 ? <Crown size={14} weight="fill" /> : <span className="mono text-[12px] font-700">{i + 1}</span>}
                </span>
                <span className={cn("flex-1 text-[15px]", p.me ? "font-800" : "font-600")}>{p.name}{p.me && " · ты"}</span>
                <span className="mono text-[15px] font-700">{p.pts}</span>
                <Tag className="text-mute">баллов</Tag>
              </div>
            ))}
          </div>
        </Panel>
      </Reveal>
    </div>
  );
}
