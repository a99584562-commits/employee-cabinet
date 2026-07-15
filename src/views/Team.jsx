import { Crown, Star } from "@phosphor-icons/react";
import { team } from "../data";
import { Panel, PanelHead, Tag, Hand, Bar, Reveal, cn } from "../ui";

const DIMS = [
  { label: "Надёжность", v: 4.8 },
  { label: "Командность", v: 4.5 },
  { label: "Инициатива", v: 4.6 },
];

export default function Team() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
      <Reveal className="lg:col-span-4">
        <Panel tone="dark" className="h-full">
          <PanelHead no="01" title="Моё место" right="rank" onDark />
          <div className="flex flex-col items-center px-6 pb-7 pt-2 text-center">
            <div className="bg-gradient-to-br from-white to-white/60 bg-clip-text text-[76px] font-800 leading-none text-transparent">#{team.myRank}</div>
            <Tag className="mt-1 text-white/50">из {team.total} в команде</Tag>
            <span className="mt-4 rounded-full bg-gradient-to-r from-indigo to-violet px-3.5 py-1.5"><Tag className="text-white">Топ-{Math.round((team.myRank / team.total) * 100)}% отдела</Tag></span>
          </div>
        </Panel>
      </Reveal>

      <Reveal className="lg:col-span-8" delay={0.05}>
        <Panel className="h-full">
          <PanelHead no="02" title="Оценка коллег · 360°" right="анонимно" />
          <div className="px-6 pb-6">
            <div className="flex flex-wrap items-end gap-4">
              <span className="text-[54px] font-800 leading-none">{team.peerRating}</span>
              <div className="mb-2">
                <div className="flex gap-0.5 text-amber">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={18} weight={s <= Math.round(team.peerRating) ? "fill" : "regular"} />
                  ))}
                </div>
                <Tag className="mt-1 block text-ink-mute">от {team.peerCount} коллег</Tag>
              </div>
              <Hand className="mb-2 ml-auto text-[20px] text-violet">так держать!</Hand>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {DIMS.map((d) => (
                <div key={d.label} className="rounded-2xl bg-white/40 p-3.5 ring-1 ring-black/[0.04]">
                  <div className="mb-2 flex items-center justify-between">
                    <Tag className="text-ink-soft">{d.label}</Tag>
                    <span className="text-[13px] font-800">{d.v}</span>
                  </div>
                  <Bar value={(d.v / 5) * 100} color="var(--color-teal)" />
                </div>
              ))}
            </div>
          </div>
        </Panel>
      </Reveal>

      <Reveal className="lg:col-span-12" delay={0.1}>
        <Panel>
          <PanelHead no="03" title="Рейтинг месяца" right={`${team.total} чел`} />
          <div className="px-3 pb-3">
            {team.leaderboard.map((p, i) => (
              <div key={p.name} className={cn("flex items-center gap-4 rounded-2xl px-4 py-3", p.me ? "bg-gradient-to-r from-indigo/12 to-violet/12 ring-1 ring-indigo/15" : "hover:bg-white/50")}>
                <span className={cn("grid h-8 w-8 shrink-0 place-items-center rounded-full text-[13px] font-800",
                  i === 0 ? "bg-gradient-to-br from-amber to-amber/80 text-white" : "bg-white/60 text-ink-soft ring-1 ring-black/[0.05]")}>
                  {i === 0 ? <Crown size={15} weight="fill" /> : i + 1}
                </span>
                <span className={cn("flex-1 text-[14.5px]", p.me ? "font-800 text-indigo" : "font-600")}>{p.name}{p.me && " · ты"}</span>
                <span className="text-[15px] font-800">{p.pts}</span>
                <Tag className="text-ink-mute">баллов</Tag>
              </div>
            ))}
          </div>
        </Panel>
      </Reveal>
    </div>
  );
}
