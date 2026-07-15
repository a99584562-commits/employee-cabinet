import { DownloadSimple, Fire } from "@phosphor-icons/react";
import { user, payslips } from "../data";
import { Panel, PanelHead, Tag, IconTile, Bar, Reveal, rub, plural } from "../ui";

const INFO = [
  { icon: "clock", tone: "indigo", label: "Стаж в компании", value: user.tenure },
  { icon: "calendar", tone: "mint", label: "В компании с", value: user.hireDate },
  { icon: "id", tone: "amber", label: "Руководитель", value: user.manager },
  { icon: "pin", tone: "sky", label: "Город", value: user.city },
  { icon: "phone", tone: "teal", label: "Телефон", value: user.phone },
  { icon: "mail", tone: "pink", label: "Почта", value: user.email },
  { icon: "cake", tone: "amber", label: "День рождения", value: user.birthday },
];

export default function Profile() {
  const pct = Math.round((user.xp / user.xpToNext) * 100);
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
      {/* Profile card */}
      <Reveal className="lg:col-span-5">
        <Panel tone="accent" className="h-full">
          <PanelHead no="01" title="Профиль" right="сотрудник" />
          <div className="flex flex-col items-center px-6 pb-6 text-center">
            <div className="grid h-24 w-24 place-items-center rounded-[1.8rem] bg-white/70 text-[30px] font-800 text-ink shadow-soft ring-1 ring-white/60">{user.initials}</div>
            <div className="mt-4 text-[22px] font-800">{user.firstName} {user.lastName}</div>
            <div className="text-[13px] font-500 text-ink/70">{user.role}</div>
            <div className="mt-1 text-[12px] text-ink/55">{user.department}</div>
            <div className="mt-5 w-full rounded-2xl bg-white/45 p-3.5 ring-1 ring-white/40">
              <div className="mb-1.5 flex items-center justify-between">
                <Tag className="text-ink/70">Уровень {user.level} · {user.levelTitle}</Tag>
                <span className="flex items-center gap-1 text-[12px] font-800"><Fire size={14} weight="fill" className="text-pink" />{user.streakDays}</span>
              </div>
              <Bar value={pct} color="var(--color-ink)" track="rgba(35,32,48,0.15)" />
              <div className="mt-1.5 text-left"><Tag className="text-ink/60">{user.xp} / {user.xpToNext} XP</Tag></div>
            </div>
          </div>
        </Panel>
      </Reveal>

      {/* About */}
      <Reveal className="lg:col-span-7" delay={0.05}>
        <Panel className="h-full">
          <PanelHead no="02" title="Обо мне" right="данные" />
          <div className="grid gap-2.5 px-5 pb-5 sm:grid-cols-2">
            {INFO.map((f) => (
              <div key={f.label} className="tile flex items-center gap-3 rounded-2xl p-3">
                <IconTile icon={f.icon} tone={f.tone} size={40} />
                <div className="min-w-0">
                  <Tag className="text-ink-mute">{f.label}</Tag>
                  <div className="truncate text-[13.5px] font-700">{f.value}</div>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </Reveal>

      {/* Payslips */}
      <Reveal className="lg:col-span-12" delay={0.1}>
        <Panel>
          <PanelHead no="03" title="Расчётные листки" right="PDF" />
          <div className="divide-line px-5 pb-3">
            {payslips.map((p) => (
              <div key={p.id} className="flex items-center gap-3 py-3">
                <IconTile icon="file" tone="indigo" size={40} />
                <div className="min-w-0 flex-1">
                  <div className="text-[13.5px] font-700">Расчётный лист · {p.month}</div>
                  <Tag className="text-ink-mute">К выплате {rub(p.sum)}</Tag>
                </div>
                <button className="grid h-9 w-9 place-items-center rounded-full text-ink-soft transition-colors hover:bg-ink/5 hover:text-accent">
                  <DownloadSimple size={17} weight="bold" />
                </button>
              </div>
            ))}
          </div>
        </Panel>
      </Reveal>
    </div>
  );
}
