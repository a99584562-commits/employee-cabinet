import { CaretRight, CheckCircle, Clock, XCircle } from "@phosphor-icons/react";
import { requestTypes, myRequests } from "../data";
import { Panel, PanelHead, Tag, Hand, IconTile, Reveal } from "../ui";

const STATUS = {
  approved: { label: "Одобрено", color: "var(--color-mint)", soft: "var(--color-mint-soft)", Icon: CheckCircle },
  pending: { label: "На согласовании", color: "var(--color-amber)", soft: "var(--color-amber-soft)", Icon: Clock },
  declined: { label: "Отклонено", color: "var(--color-pink)", soft: "var(--color-pink-soft)", Icon: XCircle },
};

export default function Requests() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
      <Reveal className="lg:col-span-7">
        <Panel className="h-full">
          <PanelHead no="01" title="Оформить заявку" right="в 1 клик" />
          <div className="grid gap-2.5 px-5 pb-5 sm:grid-cols-2">
            {requestTypes.map((r) => (
              <button key={r.id} className="tile group flex items-center gap-3.5 rounded-2xl p-3.5 text-left transition-transform active:scale-[0.98]">
                <IconTile icon={r.icon} tone={r.tone} size={46} />
                <div className="min-w-0 flex-1">
                  <div className="text-[14px] font-700">{r.title}</div>
                  <div className="truncate text-[11.5px] text-ink-mute">{r.desc}</div>
                </div>
                <CaretRight size={16} weight="bold" className="shrink-0 text-ink-mute transition-transform group-hover:translate-x-0.5" />
              </button>
            ))}
          </div>
          <div className="px-5 pb-5">
            <Hand className="text-[18px] text-accent">обычно согласуют за 1 день ▸</Hand>
          </div>
        </Panel>
      </Reveal>

      <Reveal className="lg:col-span-5" delay={0.05}>
        <Panel className="h-full">
          <PanelHead no="02" title="Мои заявки" right={`${myRequests.length}`} />
          <div className="space-y-2 px-4 pb-4">
            {myRequests.map((q) => {
              const st = STATUS[q.status];
              return (
                <div key={q.id} className="tile rounded-2xl p-3.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[13.5px] font-700">{q.type}</span>
                    <span className="flex items-center gap-1 rounded-full px-2 py-0.5 text-[10.5px] font-700" style={{ color: st.color, background: st.soft }}>
                      <st.Icon size={12} weight="fill" /> {st.label}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-[12px] text-ink-soft">{q.detail}</span>
                    <Tag className="text-ink-mute">{q.date}</Tag>
                  </div>
                </div>
              );
            })}
          </div>
        </Panel>
      </Reveal>
    </div>
  );
}
