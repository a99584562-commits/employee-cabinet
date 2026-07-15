import { useState } from "react";
import { Minus, Eye, PencilSimple, ShieldCheck } from "@phosphor-icons/react";
import { securityToggles, permissionSections, permissionRoles, auditLog } from "../data";
import { Panel, PanelHead, Tag, Switch, Reveal, cn } from "../ui";

const LEVELS = [
  { Icon: Minus, color: "var(--color-ink-mute)", bg: "transparent" },
  { Icon: Eye, color: "var(--color-sky)", bg: "var(--color-sky-soft)" },
  { Icon: PencilSimple, color: "var(--color-accent)", bg: "var(--color-accent-soft)" },
];

export default function Security() {
  const [toggles, setToggles] = useState(() => securityToggles.map((t) => ({ ...t })));
  const [matrix, setMatrix] = useState(() => permissionRoles.map((r) => ({ ...r, perms: [...r.perms] })));
  const flip = (id) => setToggles((l) => l.map((t) => (t.id === id ? { ...t, on: !t.on } : t)));
  const cycle = (ri, ci) => setMatrix((m) => m.map((r, i) => (i === ri ? { ...r, perms: r.perms.map((p, j) => (j === ci ? (p + 1) % 3 : p)) } : r)));

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
      {/* Toggles */}
      <Reveal className="lg:col-span-5">
        <Panel className="h-full">
          <PanelHead no="01" title="Безопасность" right="политики" />
          <div className="divide-line px-5 pb-3">
            {toggles.map((t) => (
              <div key={t.id} className="flex items-center gap-3 py-3">
                <div className="min-w-0 flex-1">
                  <div className="text-[13.5px] font-700">{t.title}</div>
                  <div className="text-[11.5px] text-ink-mute">{t.desc}</div>
                </div>
                <Switch on={t.on} onChange={() => flip(t.id)} />
              </div>
            ))}
          </div>
        </Panel>
      </Reveal>

      {/* Permission matrix */}
      <Reveal className="lg:col-span-7" delay={0.05}>
        <Panel className="h-full">
          <PanelHead no="02" title="Права доступа" right="роль × раздел" />
          <div className="px-5 pb-4">
            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="pb-2 pr-2 text-left"><Tag className="text-ink-mute">Роль</Tag></th>
                    {permissionSections.map((s) => <th key={s} className="px-1 pb-2 text-center"><Tag className="text-ink-mute">{s}</Tag></th>)}
                  </tr>
                </thead>
                <tbody>
                  {matrix.map((r, ri) => (
                    <tr key={r.role}>
                      <td className="py-1 pr-2 text-[12.5px] font-700 whitespace-nowrap">{r.role}</td>
                      {r.perms.map((p, ci) => {
                        const L = LEVELS[p];
                        return (
                          <td key={ci} className="px-1 py-1 text-center">
                            <button onClick={() => cycle(ri, ci)} className="mx-auto grid h-8 w-8 place-items-center rounded-xl transition-colors" style={{ background: L.bg, color: L.color, boxShadow: p === 0 ? "inset 0 0 0 1px var(--s-line)" : "none" }}>
                              <L.Icon size={15} weight={p === 0 ? "bold" : "fill"} />
                            </button>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-3 flex flex-wrap gap-3 border-t hairline pt-3">
              {[["Нет доступа", 0], ["Просмотр", 1], ["Редактирование", 2]].map(([l, lv]) => {
                const L = LEVELS[lv];
                return <span key={l} className="flex items-center gap-1.5"><span className="grid h-5 w-5 place-items-center rounded-md" style={{ background: L.bg, color: L.color, boxShadow: lv === 0 ? "inset 0 0 0 1px var(--s-line)" : "none" }}><L.Icon size={11} weight="fill" /></span><Tag className="text-ink-mute">{l}</Tag></span>;
              })}
              <span className="ml-auto"><Tag className="text-ink-mute">клик — изменить</Tag></span>
            </div>
          </div>
        </Panel>
      </Reveal>

      {/* Audit log */}
      <Reveal className="lg:col-span-12" delay={0.1}>
        <Panel>
          <PanelHead no="03" title="Аудит действий" right={`${auditLog.length} записей`} />
          <div className="divide-line px-5 pb-3">
            {auditLog.map((e) => (
              <div key={e.id} className="flex items-center gap-3 py-2.5">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl" style={{ background: `var(--color-${e.tone}-soft)`, color: `var(--color-${e.tone})` }}><ShieldCheck size={16} weight="duotone" /></span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[13px]"><b className="font-700">{e.who}</b> <span className="text-ink-soft">{e.action}</span></div>
                  <Tag className="text-ink-mute">{e.role}</Tag>
                </div>
                <Tag className="shrink-0 text-ink-mute">{e.time}</Tag>
              </div>
            ))}
          </div>
        </Panel>
      </Reveal>
    </div>
  );
}
