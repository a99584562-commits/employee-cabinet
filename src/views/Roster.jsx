import { teamMembers } from "../data";
import { Panel, PanelHead, Tag, Reveal } from "../ui";

export default function Roster() {
  return (
    <div className="grid grid-cols-1 gap-4">
      <Reveal>
        <Panel>
          <PanelHead no="01" title="Команда · Отдел продаж" right={`${teamMembers.length} человек`} />
          <div className="grid gap-2 px-4 pb-4 sm:grid-cols-2">
            {teamMembers.map((m) => (
              <div key={m.name} className="tile flex items-center gap-3 rounded-2xl p-3">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-accent to-accent-2 text-[12px] font-700 text-white">{m.initials}</div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[13.5px] font-700">{m.name}{m.me && " · ты"}</div>
                  <Tag className="text-ink-mute">{m.role}</Tag>
                </div>
                <span className="rounded-full bg-mint-soft px-2.5 py-1 text-[10.5px] font-700 uppercase tracking-wide text-mint">активен</span>
              </div>
            ))}
          </div>
        </Panel>
      </Reveal>
    </div>
  );
}
