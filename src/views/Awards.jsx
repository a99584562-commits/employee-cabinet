import { useState } from "react";
import { Fire, X, CheckCircle } from "@phosphor-icons/react";
import { awards, user } from "../data";
import { Panel, PanelHead, Tag, Hand, Badge, Bar, Reveal, Modal, tierMeta, plural } from "../ui";

const TIER_LABEL = { legendary: "Легендарная", rare: "Редкая", common: "Обычная" };

export default function Awards() {
  const earned = awards.filter((a) => a.earned);
  const locked = awards.filter((a) => !a.earned);
  const [sel, setSel] = useState(null);

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
      <Reveal className="lg:col-span-12">
        <Panel tone="accent">
          <div className="flex items-center gap-5 p-6">
            <div className="grid h-16 w-16 shrink-0 place-items-center rounded-[1.3rem] bg-white/60 shadow-soft ring-1 ring-white/60">
              <Fire size={32} weight="fill" className="text-pink" />
            </div>
            <div className="flex-1">
              <div className="text-[28px] font-800 leading-none">{user.streakDays} {plural(user.streakDays, ["день", "дня", "дней"])} подряд</div>
              <Hand className="mt-1.5 block text-[19px] text-ink/70">не пропусти сегодня — иначе стрик сгорит</Hand>
            </div>
            <div className="hidden text-right sm:block">
              <div className="text-[30px] font-800">{earned.length}/{awards.length}</div>
              <Tag className="text-ink/50">наград</Tag>
            </div>
          </div>
        </Panel>
      </Reveal>

      <Reveal className="lg:col-span-12" delay={0.05}>
        <Panel>
          <PanelHead no="01" title="Полученные" right={`${earned.length} шт`} />
          <div className="grid grid-cols-2 gap-3 px-5 pb-5 sm:grid-cols-3 lg:grid-cols-5">
            {earned.map((a) => (
              <div key={a.id} className="tile flex flex-col items-center gap-2.5 rounded-3xl p-5 text-center">
                <Badge icon={a.icon} tier={a.tier} earned size={82} onClick={() => setSel(a)} />
                <div className="text-[13.5px] font-800 leading-tight">{a.title}</div>
                <div className="text-[11.5px] font-500 text-ink-soft">{a.sub}</div>
                {a.rarity && (
                  <span className="chip mt-0.5 rounded-full px-2 py-0.5 text-[10.5px] font-700 uppercase tracking-[0.13em]" style={{ color: tierMeta(a.tier).chip }}>
                    {a.rarity}
                  </span>
                )}
              </div>
            ))}
          </div>
        </Panel>
      </Reveal>

      <Reveal className="lg:col-span-12" delay={0.1}>
        <Panel>
          <PanelHead no="02" title="В процессе" right={`${locked.length} шт`} />
          <div className="grid gap-3 px-5 pb-5 sm:grid-cols-2 lg:grid-cols-3">
            {locked.map((a) => (
              <button key={a.id} onClick={() => setSel(a)} className="tile flex items-center gap-4 rounded-2xl p-4 text-left transition-colors hover:bg-white/60 dark:hover:bg-white/[0.09]">
                <Badge icon={a.icon} tier={a.tier} earned={false} size={58} />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[14px] font-800">{a.title}</div>
                  <div className="mb-2 truncate text-[11.5px] font-500 text-ink-mute">{a.sub}</div>
                  <div className="flex items-center gap-2">
                    <Bar value={a.progress} color="var(--color-accent)" className="h-1.5" />
                    <span className="text-[12px] font-800 text-accent">{a.progress}%</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </Panel>
      </Reveal>

      <Modal open={!!sel} onClose={() => setSel(null)}>
        {sel && (
          <>
            <button onClick={() => setSel(null)} className="chip absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full transition-opacity hover:opacity-70">
              <X size={15} weight="bold" />
            </button>
            <div className="flex justify-center pt-2">
              <Badge icon={sel.icon} tier={sel.tier} earned={sel.earned} size={116} />
            </div>
            <div className="mt-4 text-[22px] font-800">{sel.title}</div>
            <span className="chip mt-2 inline-block rounded-full px-3 py-1 text-[11px] font-700 uppercase tracking-[0.13em]" style={{ color: tierMeta(sel.tier).chip }}>
              {TIER_LABEL[sel.tier]} награда
            </span>
            <p className="mt-4 text-[14px] font-500 text-ink-soft">{sel.sub}</p>
            {sel.earned ? (
              <div className="mt-5 flex items-center justify-center gap-2 rounded-2xl bg-mint-soft py-3 text-mint">
                <CheckCircle size={18} weight="fill" />
                <span className="text-[13.5px] font-700">Награда получена</span>
              </div>
            ) : (
              <div className="tile-2 mt-5 rounded-2xl p-4">
                <div className="mb-2 flex items-center justify-between">
                  <Tag className="text-ink-soft">Прогресс</Tag>
                  <span className="text-[13px] font-800 text-accent">{sel.progress}%</span>
                </div>
                <Bar value={sel.progress} color="var(--color-accent)" />
                <div className="mt-2.5 text-[12.5px] font-600 text-ink-soft">Осталось {100 - sel.progress}% до награды</div>
              </div>
            )}
          </>
        )}
      </Modal>
    </div>
  );
}
