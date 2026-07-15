import { Fire, Lock } from "@phosphor-icons/react";
import { awards, user } from "../data";
import { Panel, PanelHead, Tag, Hand, DotGrid, Bar, Reveal, cn, plural } from "../ui";

export default function Awards() {
  const earned = awards.filter((a) => a.earned);
  const locked = awards.filter((a) => !a.earned);
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
      {/* Streak banner */}
      <Reveal className="lg:col-span-12">
        <Panel tone="ink">
          <div className="relative flex items-center gap-5 p-6">
            <DotGrid className="pointer-events-none absolute inset-y-0 right-6 my-auto h-12 w-40 text-paper/20" />
            <div className="grid h-16 w-16 shrink-0 place-items-center border border-paper/40 bg-yellow">
              <Fire size={32} weight="fill" className="text-ink" />
            </div>
            <div className="flex-1">
              <div className="text-[30px] font-800 uppercase leading-none text-yellow">{user.streakDays} {plural(user.streakDays, ["день", "дня", "дней"])} подряд</div>
              <Hand className="mt-1.5 block text-[19px] text-paper/80">не пропусти сегодня — иначе всё сгорит 🔥</Hand>
            </div>
            <div className="hidden text-right sm:block">
              <div className="text-[30px] font-800 text-yellow">{earned.length}/{awards.length}</div>
              <Tag className="text-paper/50">наград</Tag>
            </div>
          </div>
        </Panel>
      </Reveal>

      {/* Earned */}
      <Reveal className="lg:col-span-12" delay={0.05}>
        <Panel>
          <PanelHead no="01" title="Полученные" right={`${earned.length} ШТ`} />
          <div className="grid grid-cols-2 gap-px bg-ink/12 sm:grid-cols-3 lg:grid-cols-5">
            {earned.map((a) => (
              <div key={a.id} className="flex flex-col items-center gap-2 bg-yellow p-5 text-center">
                <span className="text-[40px]">{a.emoji}</span>
                <div className="text-[13.5px] font-800 uppercase leading-tight">{a.title}</div>
                <Tag className="text-ink/70">{a.sub}</Tag>
                {a.rarity && <span className="mt-0.5 border border-ink px-1.5 py-0.5"><Tag>{a.rarity}</Tag></span>}
              </div>
            ))}
          </div>
        </Panel>
      </Reveal>

      {/* Locked */}
      <Reveal className="lg:col-span-12" delay={0.1}>
        <Panel>
          <PanelHead no="02" title="В процессе" right={`${locked.length} ШТ`} />
          <div className="grid gap-px bg-ink/12 sm:grid-cols-2 lg:grid-cols-3">
            {locked.map((a) => (
              <div key={a.id} className="flex items-center gap-4 bg-card p-4">
                <div className="relative grid h-14 w-14 shrink-0 place-items-center border border-ink text-[26px]">
                  <span className="opacity-30 grayscale">{a.emoji}</span>
                  <span className="absolute -bottom-px -right-px grid h-5 w-5 place-items-center bg-ink text-paper"><Lock size={10} weight="fill" /></span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[14px] font-800 uppercase">{a.title}</div>
                  <Tag className="mb-2 block truncate text-mute">{a.sub}</Tag>
                  <div className="flex items-center gap-2">
                    <Bar value={a.progress} color="var(--color-pink)" />
                    <span className="mono text-[12px] font-700">{a.progress}%</span>
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
