import { useState } from "react";
import { motion } from "motion/react";
import { House, Wallet, GraduationCap, Trophy, UsersThree, MagnifyingGlass, Bell } from "@phosphor-icons/react";
import { user } from "./data";
import { cn, Tag, Hand, Bar } from "./ui";
import Dashboard from "./views/Dashboard";
import Salary from "./views/Salary";
import Growth from "./views/Growth";
import Awards from "./views/Awards";
import Team from "./views/Team";

const NAV = [
  { id: "home", label: "Главная", Icon: House, View: Dashboard },
  { id: "salary", label: "Зарплата", Icon: Wallet, View: Salary },
  { id: "growth", label: "Развитие", Icon: GraduationCap, View: Growth },
  { id: "awards", label: "Награды", Icon: Trophy, View: Awards },
  { id: "team", label: "Команда", Icon: UsersThree, View: Team },
];

const NOTIFS = [
  { id: 1, emoji: "💰", title: "Зарплата за июль начислена", time: "2 часа назад", tone: "bg-mint-soft" },
  { id: 2, emoji: "🏅", title: "Новая награда: «Марафонец»", time: "вчера", tone: "bg-amber-soft" },
  { id: 3, emoji: "📚", title: "Назначен курс «Переговоры pro»", time: "2 дня назад", tone: "bg-indigo-soft" },
  { id: 4, emoji: "⭐", title: "Коллега оценил тебя на 5", time: "3 дня назад", tone: "bg-sky-soft" },
];

function greet() {
  const h = new Date().getHours();
  if (h < 6) return "Доброй ночи";
  if (h < 12) return "Доброе утро";
  if (h < 18) return "Добрый день";
  return "Добрый вечер";
}

function NavItem({ item, active, onClick, mobile }) {
  const { Icon, label } = item;
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative flex items-center transition-colors duration-300",
        mobile ? "flex-col gap-1 px-3 py-1" : "w-full gap-3 rounded-2xl px-3.5 py-2.5",
        active ? "text-ink" : "text-ink-mute hover:text-ink-soft"
      )}
    >
      {active && (
        <motion.span
          layoutId={mobile ? "np-m" : "np-d"}
          className={cn("absolute inset-0 -z-10", mobile ? "rounded-2xl bg-white/70" : "rounded-2xl bg-white/80 shadow-soft ring-1 ring-black/[0.04]")}
          transition={{ type: "spring", stiffness: 400, damping: 34 }}
        />
      )}
      <Icon size={mobile ? 21 : 20} weight={active ? "fill" : "regular"} className={active ? "text-indigo" : ""} />
      <span className={cn("font-600", mobile ? "text-[10px]" : "text-[14.5px]")}>{label}</span>
    </button>
  );
}

export default function App() {
  const [tab, setTab] = useState("home");
  const [notifOpen, setNotifOpen] = useState(false);
  const [seen, setSeen] = useState(false);
  const active = NAV.find((n) => n.id === tab) ?? NAV[0];
  const View = active.View;
  const pct = Math.round((user.xp / user.xpToNext) * 100);

  return (
    <div className="min-h-[100dvh]">
      {/* Desktop sidebar — floating glass */}
      <aside className="fixed left-0 top-0 z-40 hidden h-[100dvh] w-[256px] p-4 md:flex">
        <div className="glass flex h-full w-full flex-col rounded-[26px] border border-white/70 p-3 shadow-lift ring-1 ring-black/[0.04]">
          <div className="flex items-center gap-2.5 px-2 py-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-2xl bg-gradient-to-br from-indigo to-violet text-[16px] text-white shadow-soft">✦</span>
            <div className="leading-tight">
              <div className="text-[15px] font-800">Моё пространство</div>
              <Tag className="text-ink-mute">employee os</Tag>
            </div>
          </div>

          <nav className="mt-3 flex flex-col gap-1">
            {NAV.map((n) => (
              <NavItem key={n.id} item={n} active={tab === n.id} onClick={() => setTab(n.id)} />
            ))}
          </nav>

          {/* level mini-card */}
          <div className="mx-1 mt-5 rounded-2xl bg-gradient-to-br from-indigo to-violet p-3.5 text-white shadow-soft">
            <div className="flex items-center justify-between">
              <Tag className="text-white/70">Уровень {user.level}</Tag>
              <span className="text-[13px] font-800">{user.levelTitle}</span>
            </div>
            <Bar value={pct} color="#fff" track="rgba(255,255,255,0.25)" className="mt-2.5 h-1.5" />
            <div className="mt-2 flex items-center justify-between">
              <Tag className="text-white/70">{user.xp}/{user.xpToNext} XP</Tag>
              <Hand className="text-[16px] text-white/90">почти ур.8!</Hand>
            </div>
          </div>

          <div className="mt-auto flex items-center gap-3 rounded-2xl bg-white/45 p-2.5 ring-1 ring-black/[0.04]">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-ink to-ink-soft text-[13px] font-700 text-white">
              {user.initials}
            </div>
            <div className="min-w-0 leading-tight">
              <div className="truncate text-[13px] font-700">{user.firstName} {user.lastName}</div>
              <div className="truncate text-[11.5px] text-ink-mute">{user.role}</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="min-h-[100dvh] px-4 pb-28 pt-5 md:pl-[256px] md:pr-6 md:pb-8 md:pt-6">
        <header className="mb-6 flex items-end justify-between gap-4">
          <div>
            <div className="mb-1.5 text-[12.5px] font-600 capitalize text-ink-soft">
              {new Date().toLocaleDateString("ru-RU", { weekday: "long", day: "numeric", month: "long" })}
            </div>
            <h1 className="text-[30px] font-800 leading-none tracking-tight sm:text-[38px]">
              {greet()}, {user.firstName}
              <span className="ml-2">👋</span>
              <Hand className="ml-3 hidden text-[26px] text-violet sm:inline">рад видеть!</Hand>
            </h1>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button className="grid h-11 w-11 place-items-center rounded-2xl glass border border-white/70 shadow-soft ring-1 ring-black/[0.04] transition-transform active:scale-95">
              <MagnifyingGlass size={18} weight="bold" className="text-ink-soft" />
            </button>
            <div className="relative">
              <button
                onClick={() => { setNotifOpen((o) => !o); setSeen(true); }}
                className="relative grid h-11 w-11 place-items-center rounded-2xl glass border border-white/70 shadow-soft ring-1 ring-black/[0.04] transition-transform active:scale-95"
              >
                <Bell size={18} weight="bold" className="text-ink-soft" />
                {!seen && <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-pink ring-2 ring-white" />}
              </button>
              {notifOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
                  <div className="popover-in absolute right-0 top-[52px] z-50 w-[320px] rounded-3xl border border-white/70 glass-strong p-2 shadow-lift ring-1 ring-black/[0.06]">
                    <div className="flex items-center justify-between px-3 py-2">
                      <Tag className="text-ink-soft">Уведомления</Tag>
                      <Tag className="text-indigo">{NOTIFS.length} новых</Tag>
                    </div>
                    <div className="max-h-[320px] overflow-auto no-scrollbar">
                      {NOTIFS.map((n) => (
                        <div key={n.id} className="flex items-start gap-3 rounded-2xl p-2.5 transition-colors hover:bg-white/60">
                          <span className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-xl text-[16px]", n.tone)}>{n.emoji}</span>
                          <div className="min-w-0 flex-1">
                            <div className="text-[13px] font-600 leading-snug">{n.title}</div>
                            <div className="mt-0.5 text-[11px] text-ink-mute">{n.time}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        <div key={tab} className="view-in">
          <View />
        </div>
      </main>

      {/* Mobile bottom nav */}
      <nav className="glass-strong fixed bottom-4 left-1/2 z-40 flex -translate-x-1/2 items-center gap-1 rounded-[22px] border border-white/70 p-1.5 shadow-lift ring-1 ring-black/[0.04] md:hidden">
        {NAV.map((n) => (
          <NavItem key={n.id} item={n} mobile active={tab === n.id} onClick={() => setTab(n.id)} />
        ))}
      </nav>
    </div>
  );
}
