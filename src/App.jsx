import { useState } from "react";
import { motion } from "motion/react";
import { House, Wallet, GraduationCap, Trophy, UsersThree, Bell } from "@phosphor-icons/react";
import { user } from "./data";
import { cn } from "./ui";
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

function greet() {
  const h = new Date().getHours();
  if (h < 6) return "Доброй ночи";
  if (h < 12) return "Доброе утро";
  if (h < 18) return "Добрый день";
  return "Добрый вечер";
}

function Brand() {
  return (
    <div className="flex items-center gap-2.5 px-3">
      <div className="grid h-9 w-9 place-items-center rounded-xl bg-ink text-[17px]">🌱</div>
      <div className="leading-tight">
        <div className="font-display text-[15px] font-600 tracking-tight">Моё</div>
        <div className="text-[11px] font-500 text-ink-mute -mt-0.5">пространство</div>
      </div>
    </div>
  );
}

function NavItem({ item, active, onClick, mobile }) {
  const { Icon, label } = item;
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative flex items-center transition-colors duration-300",
        mobile ? "flex-col gap-1 px-3 py-1.5" : "w-full gap-3 rounded-2xl px-3.5 py-2.5",
        active ? "text-ink" : "text-ink-mute hover:text-ink-soft"
      )}
    >
      {active && (
        <motion.span
          layoutId={mobile ? "navpill-m" : "navpill-d"}
          className={cn(
            "absolute inset-0 -z-10",
            mobile ? "rounded-2xl bg-flame-soft" : "rounded-2xl bg-white shadow-soft ring-1 ring-[--color-hairline]"
          )}
          transition={{ type: "spring", stiffness: 380, damping: 34 }}
        />
      )}
      <Icon size={mobile ? 22 : 21} weight={active ? "fill" : "regular"} className={active && mobile ? "text-flame" : ""} />
      <span className={cn(mobile ? "text-[10px] font-600" : "text-[14px] font-600")}>{label}</span>
    </button>
  );
}

export default function App() {
  const [tab, setTab] = useState("home");
  const active = NAV.find((n) => n.id === tab) ?? NAV[0];
  const View = active.View;

  return (
    <div className="min-h-[100dvh] w-full">
      {/* Desktop sidebar — floating, detached */}
      <aside className="fixed left-0 top-0 z-40 hidden h-[100dvh] w-[248px] flex-col p-5 md:flex">
        <div className="flex h-full flex-col rounded-[1.75rem] bg-gradient-to-b from-white/70 to-white/25 p-3 ring-1 ring-[--color-hairline] shadow-soft backdrop-blur-sm">
          <div className="py-3">
            <Brand />
          </div>
          <nav className="mt-4 flex flex-col gap-1">
            {NAV.map((n) => (
              <NavItem key={n.id} item={n} active={tab === n.id} onClick={() => setTab(n.id)} />
            ))}
          </nav>
          <div className="mt-auto">
            <div className="flex items-center gap-3 rounded-2xl bg-surface-2 p-2.5 ring-1 ring-[--color-hairline]">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-ink font-display text-[13px] font-600 text-canvas">
                {user.initials}
              </div>
              <div className="min-w-0 leading-tight">
                <div className="truncate text-[13px] font-700">{user.firstName} {user.lastName}</div>
                <div className="truncate text-[11px] text-ink-mute">{user.role}</div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="mx-auto w-full max-w-[1120px] px-4 pb-28 pt-6 md:pl-[248px] md:pr-6 md:pb-10 md:pt-8">
        {/* Top greeting bar */}
        <header className="mb-7 flex items-center justify-between gap-4">
          <div>
            <div className="mb-1 flex items-center gap-2 text-[12px] font-600 uppercase tracking-[0.16em] text-ink-mute">
              {new Date().toLocaleDateString("ru-RU", { weekday: "long", day: "numeric", month: "long" })}
            </div>
            <h1 className="font-display text-[26px] font-600 leading-none tracking-tight sm:text-[32px]">
              {greet()}, {user.firstName}
              <span className="ml-2 inline-block">👋</span>
            </h1>
          </div>
          <button className="relative grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-surface ring-1 ring-[--color-hairline] shadow-soft transition-transform duration-300 active:scale-95">
            <Bell size={20} weight="regular" className="text-ink-soft" />
            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-flame ring-2 ring-surface" />
          </button>
        </header>

        <div key={tab} className="view-in">
          <View />
        </div>
      </main>

      {/* Mobile bottom nav — floating pill */}
      <nav className="fixed bottom-4 left-1/2 z-40 flex -translate-x-1/2 items-center gap-1 rounded-[1.5rem] bg-white/80 p-1.5 ring-1 ring-[--color-hairline] shadow-lift backdrop-blur-xl md:hidden">
        {NAV.map((n) => (
          <NavItem key={n.id} item={n} mobile active={tab === n.id} onClick={() => setTab(n.id)} />
        ))}
      </nav>
    </div>
  );
}
