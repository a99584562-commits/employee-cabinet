import { useState } from "react";
import { motion } from "motion/react";
import { House, Wallet, GraduationCap, Trophy, UsersThree, MagnifyingGlass, Bell } from "@phosphor-icons/react";
import { user, salary, team } from "./data";
import { cn, Ticker, Tag, Hand, DotGrid } from "./ui";
import Dashboard from "./views/Dashboard";
import Salary from "./views/Salary";
import Growth from "./views/Growth";
import Awards from "./views/Awards";
import Team from "./views/Team";

const NAV = [
  { id: "home", no: "01", label: "Главная", code: "HOME", Icon: House, View: Dashboard },
  { id: "salary", no: "02", label: "Зарплата", code: "SLRY", Icon: Wallet, View: Salary },
  { id: "growth", no: "03", label: "Развитие", code: "GRWT", Icon: GraduationCap, View: Growth },
  { id: "awards", no: "04", label: "Награды", code: "AWRD", Icon: Trophy, View: Awards },
  { id: "team", no: "05", label: "Команда", code: "TEAM", Icon: UsersThree, View: Team },
];

const TICKER = [
  "МОЁ ПРОСТРАНСТВО", "КАБИНЕТ СОТРУДНИКА", "ИЮЛЬ 2026",
  "УРОВЕНЬ 07 · ПРОФИ", `СТРИК ${user.streakDays}`, `#${team.myRank}/${team.total} В КОМАНДЕ`,
  "ЗП 87 400 ₽", "0xF1E500",
];

function greet() {
  const h = new Date().getHours();
  if (h < 6) return "Доброй ночи";
  if (h < 12) return "Доброе утро";
  if (h < 18) return "Добрый день";
  return "Добрый вечер";
}

function SideItem({ item, active, onClick }) {
  const { no, label, code, Icon } = item;
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative flex w-full items-center gap-3 border-b border-ink/12 px-4 py-3 text-left transition-colors duration-200",
        active ? "bg-ink text-paper" : "hover:bg-paper-2"
      )}
    >
      <span className={cn("mono text-[11px]", active ? "text-yellow" : "text-mute")}>{no}</span>
      <Icon size={18} weight={active ? "fill" : "regular"} className="shrink-0" />
      <span className="flex-1 text-[15px] font-600">{label}</span>
      {active ? (
        <span className="mono text-[14px] text-yellow">→</span>
      ) : (
        <span className="mono text-[10px] text-mute opacity-0 transition-opacity group-hover:opacity-100">{code}</span>
      )}
    </button>
  );
}

export default function App() {
  const [tab, setTab] = useState("home");
  const active = NAV.find((n) => n.id === tab) ?? NAV[0];
  const View = active.View;
  const now = new Date();
  const dateStr = now.toLocaleDateString("ru-RU", { weekday: "short", day: "2-digit", month: "2-digit", year: "numeric" });

  return (
    <div className="min-h-[100dvh]">
      {/* Top ticker */}
      <Ticker items={TICKER} className="fixed inset-x-0 top-0 z-50 border-b border-ink" />

      {/* Desktop sidebar */}
      <aside className="fixed bottom-0 left-0 top-[30px] z-40 hidden w-[254px] flex-col border-r border-ink bg-card md:flex">
        <div className="border-b border-ink px-4 py-4">
          <div className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center bg-ink text-[15px] leading-none text-yellow">✦</span>
            <div className="leading-none">
              <div className="text-[15px] font-800 uppercase tracking-tight">Моё</div>
              <Tag className="text-mute">пространство</Tag>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <Tag className="text-mute">EMPLOYEE OS</Tag>
            <Tag className="text-mute">v2.6</Tag>
          </div>
        </div>

        <nav className="border-b border-ink">
          {NAV.map((n) => (
            <SideItem key={n.id} item={n} active={tab === n.id} onClick={() => setTab(n.id)} />
          ))}
        </nav>

        {/* filler / technical block */}
        <div className="relative flex-1 overflow-hidden">
          <DotGrid className="absolute inset-x-4 top-5 h-16 text-ink/20" />
          <Hand className="absolute left-4 top-24 text-[20px] -rotate-6 text-ink/70">всё под рукой ▾</Hand>
        </div>

        <div className="border-t border-ink p-3">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center bg-ink font-mono text-[13px] font-700 text-yellow">
              {user.initials}
            </div>
            <div className="min-w-0 leading-tight">
              <div className="truncate text-[13px] font-700">{user.firstName} {user.lastName}</div>
              <Tag className="text-mute">EMP · 0417</Tag>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="min-h-[100dvh] pt-[30px] pb-28 md:pb-0 md:pl-[254px]">
        <div className="px-4 py-6 sm:px-7 sm:py-8">
          {/* Header */}
          <header className="mb-7 flex items-start justify-between gap-4 border-b border-ink pb-6">
            <div className="min-w-0">
              <div className="mb-2.5 flex flex-wrap items-center gap-x-3 gap-y-1">
                <Tag className="text-mute">{dateStr}</Tag>
                <span className="hidden h-3 w-px bg-ink/20 sm:block" />
                <Tag className="text-mute">
                  {now.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })}<span className="blink">_</span>
                </Tag>
              </div>
              <h1 className="text-[34px] font-800 uppercase leading-[0.92] tracking-tight sm:text-[52px]">
                {greet()},<br className="sm:hidden" /> {user.firstName}
                <Hand className="ml-3 hidden text-[30px] text-pink sm:inline">рад видеть!</Hand>
              </h1>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button className="grid h-10 w-10 place-items-center border border-ink bg-card transition-colors hover:bg-paper-2">
                <MagnifyingGlass size={17} weight="bold" />
              </button>
              <button className="relative grid h-10 w-10 place-items-center border border-ink bg-card transition-colors hover:bg-paper-2">
                <Bell size={17} weight="bold" />
                <span className="absolute right-1.5 top-1.5 h-2 w-2 bg-pink" />
              </button>
              <span className="hidden border border-ink px-2.5 py-2.5 md:block">
                <Tag>RU</Tag>
              </span>
            </div>
          </header>

          <div key={tab} className="view-in">
            <View />
          </div>
        </div>
      </main>

      {/* Mobile bottom nav */}
      <nav className="fixed inset-x-0 bottom-0 z-40 flex border-t border-ink bg-card md:hidden">
        {NAV.map((n) => {
          const on = tab === n.id;
          return (
            <button
              key={n.id}
              onClick={() => setTab(n.id)}
              className={cn(
                "relative flex flex-1 flex-col items-center gap-1 border-r border-ink/12 py-2.5 last:border-r-0",
                on ? "bg-yellow" : ""
              )}
            >
              <n.Icon size={20} weight={on ? "fill" : "regular"} />
              <span className="mono text-[9px] uppercase tracking-wider">{n.code}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
