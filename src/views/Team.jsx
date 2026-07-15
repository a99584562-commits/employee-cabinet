import { Star, Medal, Crown } from "@phosphor-icons/react";
import { team } from "../data";
import { Card, Bar, Reveal, cn } from "../ui";

const DIMS = [
  { label: "Надёжность", v: 4.8 },
  { label: "Командность", v: 4.5 },
  { label: "Инициатива", v: 4.6 },
];

export default function Team() {
  return (
    <div className="grid gap-4 lg:grid-cols-12 lg:auto-rows-min">
      {/* My rank */}
      <Reveal className="lg:col-span-4">
        <Card inner="bg-gradient-to-br from-team-soft to-surface">
          <div className="flex h-full flex-col items-center justify-center p-7 text-center">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-team/12">
              <Medal size={30} weight="fill" className="text-team" />
            </div>
            <div className="mt-4 font-display text-[56px] font-600 leading-none text-team">#{team.myRank}</div>
            <div className="mt-1 text-[13px] font-600 text-ink-soft">из {team.total} в команде</div>
            <div className="mt-4 rounded-full bg-team/10 px-3.5 py-1.5 text-[12.5px] font-700 text-team">Топ-{Math.round((team.myRank / team.total) * 100)}% отдела</div>
          </div>
        </Card>
      </Reveal>

      {/* Peer rating — Team 360 */}
      <Reveal className="lg:col-span-8" delay={0.06}>
        <Card>
          <div className="p-7">
            <div className="mb-1 text-[11px] font-700 uppercase tracking-[0.18em] text-ink-mute">Оценка коллег · 360°</div>
            <div className="flex flex-wrap items-end gap-4">
              <span className="font-display text-[52px] font-600 leading-none">{team.peerRating}</span>
              <div className="mb-1.5">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={18} weight={s <= Math.round(team.peerRating) ? "fill" : "regular"} className="text-award" />
                  ))}
                </div>
                <div className="mt-1 text-[12.5px] font-500 text-ink-mute">анонимно от {team.peerCount} коллег</div>
              </div>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {DIMS.map((d) => (
                <div key={d.label}>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-[13px] font-600 text-ink-soft">{d.label}</span>
                    <span className="text-[13px] font-700">{d.v}</span>
                  </div>
                  <Bar value={(d.v / 5) * 100} color="var(--color-team)" className="h-1.5" />
                </div>
              ))}
            </div>
          </div>
        </Card>
      </Reveal>

      {/* Leaderboard */}
      <Reveal className="lg:col-span-12" delay={0.1}>
        <Card>
          <div className="p-6">
            <div className="mb-5 text-[11px] font-700 uppercase tracking-[0.18em] text-ink-mute">Рейтинг месяца</div>
            <div className="flex flex-col gap-1.5">
              {team.leaderboard.map((p, i) => (
                <div
                  key={p.name}
                  className={cn(
                    "flex items-center gap-4 rounded-2xl px-4 py-3 ring-1 transition-colors",
                    p.me ? "bg-team/10 ring-team/20" : "bg-surface-2 ring-[--color-hairline]"
                  )}
                >
                  <span className={cn(
                    "grid h-8 w-8 shrink-0 place-items-center rounded-full font-display text-[14px] font-700",
                    i === 0 ? "bg-award text-white" : "bg-surface text-ink-soft ring-1 ring-[--color-hairline]"
                  )}>
                    {i === 0 ? <Crown size={16} weight="fill" /> : i + 1}
                  </span>
                  <span className={cn("flex-1 text-[14.5px]", p.me ? "font-800 text-team" : "font-600")}>
                    {p.name}{p.me && " · ты"}
                  </span>
                  <span className="font-display text-[15px] font-700">{p.pts}</span>
                  <span className="text-[12px] font-500 text-ink-mute">баллов</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </Reveal>
    </div>
  );
}
