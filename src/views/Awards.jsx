import { Fire } from "@phosphor-icons/react";
import { awards, user } from "../data";
import { Panel, PanelHead, Tag, Hand, Badge, Bar, Reveal, tierMeta, plural } from "../ui";

export default function Awards() {
  const earned = awards.filter((a) => a.earned);
  const locked = awards.filter((a) => !a.earned);
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
      {/* Streak banner */}
      <Reveal className="lg:col-span-12">
        <Panel tone="accent">
          <div className="flex items-center gap-5 p-6">
            <div className="grid h-16 w-16 shrink-0 place-items-center rounded-[1.3rem] bg-white/60 shadow-soft ring-1 ring-white/60">
              <Fire size={32} weight="fill" className="text-pink" />
            </div>
            <div className="flex-1">
              <div className="text-[28px] font-800 leading-none">{user.streakDays} {plural(user.streakDays, ["день", "дня", "дней"])} подряд</div>
              <Hand className="mt-1.5 block text-[19px] text-ink/70">не пропусти сегодня — иначе всё сгорит 🔥</Hand>
            </div>
            <div className="hidden text-right sm:block">
              <div className="text-[30px] font-800">{earned.length}/{awards.length}</div>
              <Tag className="text-ink/50">наград</Tag>
            </div>
          </div>
        </Panel>
      </Reveal>

      {/* Earned */}
      <Reveal className="lg:col-span-12" delay={0.05}>
        <Panel>
          <PanelHead no="01" title="Полученные" right={`${earned.length} шт`} />
          <div className="grid grid-cols-2 gap-3 px-5 pb-5 sm:grid-cols-3 lg:grid-cols-5">
            {earned.map((a) => (
              <div key={a.id} className="flex flex-col items-center gap-2.5 rounded-3xl bg-white/45 p-5 text-center ring-1 ring-black/[0.04]">
                <Badge icon={a.icon} tier={a.tier} earned size={82} />
                <div className="text-[13.5px] font-800 leading-tight">{a.title}</div>
                <div className="text-[11.5px] font-500 text-ink-soft">{a.sub}</div>
                {a.rarity && (
                  <span
                    className="mt-0.5 rounded-full bg-white/70 px-2 py-0.5 text-[10.5px] font-700 uppercase tracking-[0.13em] ring-1 ring-black/[0.05]"
                    style={{ color: tierMeta(a.tier).chip }}
                  >
                    {a.rarity}
                  </span>
                )}
              </div>
            ))}
          </div>
        </Panel>
      </Reveal>

      {/* Locked */}
      <Reveal className="lg:col-span-12" delay={0.1}>
        <Panel>
          <PanelHead no="02" title="В процессе" right={`${locked.length} шт`} />
          <div className="grid gap-3 px-5 pb-5 sm:grid-cols-2 lg:grid-cols-3">
            {locked.map((a) => (
              <div key={a.id} className="flex items-center gap-4 rounded-2xl bg-white/40 p-4 ring-1 ring-black/[0.04]">
                <Badge icon={a.icon} tier={a.tier} earned={false} size={58} />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[14px] font-800">{a.title}</div>
                  <div className="mb-2 truncate text-[11.5px] font-500 text-ink-mute">{a.sub}</div>
                  <div className="flex items-center gap-2">
                    <Bar value={a.progress} color="var(--color-violet)" className="h-1.5" />
                    <span className="text-[12px] font-800 text-violet">{a.progress}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </Reveal>
    </div>
  );
}
