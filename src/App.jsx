import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { House, Wallet, GraduationCap, Trophy, UsersThree, MagnifyingGlass, Bell, Gear, Sun, SunHorizon, Moon, MoonStars, Check, X } from "@phosphor-icons/react";
import { user } from "./data";
import { cn, Tag, Hand, Bar, IconTile } from "./ui";
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

const ACCENTS = {
  indigo: { name: "Индиго", c1: "#6a5af0", c2: "#9366f2", soft: "#ece9fe" },
  violet: { name: "Фиалка", c1: "#8b5cf6", c2: "#c07ef7", soft: "#f1e9fe" },
  mint: { name: "Мята", c1: "#12b083", c2: "#34d39e", soft: "#dff5ec" },
  amber: { name: "Янтарь", c1: "#ef9724", c2: "#f7b73e", soft: "#fdeecf" },
  pink: { name: "Розовый", c1: "#ec4899", c2: "#f472b6", soft: "#fde7f1" },
  sky: { name: "Небо", c1: "#3b82f6", c2: "#60a5fa", soft: "#e3eefe" },
};

const NOTIFS = [
  { id: 1, icon: "coins", tone: "mint", title: "Зарплата за июль начислена", time: "2 часа назад" },
  { id: 2, icon: "medal", tone: "amber", title: "Новая награда: «Марафонец»", time: "вчера" },
  { id: 3, icon: "cap", tone: "indigo", title: "Назначен курс «Переговоры pro»", time: "2 дня назад" },
  { id: 4, icon: "star", tone: "sky", title: "Коллега оценил тебя на 5", time: "3 дня назад" },
];

function greet() {
  const h = new Date().getHours();
  if (h < 6) return "Доброй ночи";
  if (h < 12) return "Доброе утро";
  if (h < 18) return "Добрый день";
  return "Добрый вечер";
}

function GreetIcon() {
  const h = new Date().getHours();
  const cls = "ml-2.5 shrink-0";
  if (h < 6) return <MoonStars size={27} weight="fill" className={cn(cls, "text-accent")} />;
  if (h < 12) return <SunHorizon size={29} weight="fill" className={cn(cls, "text-amber")} />;
  if (h < 18) return <Sun size={29} weight="fill" className={cn(cls, "text-amber")} />;
  return <MoonStars size={27} weight="fill" className={cn(cls, "text-accent")} />;
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
          className={cn("absolute inset-0 -z-10 rounded-2xl bg-white/80 shadow-soft ring-1 ring-black/[0.04] dark:bg-white/[0.09] dark:ring-white/10")}
          transition={{ type: "spring", stiffness: 400, damping: 34 }}
        />
      )}
      <Icon size={mobile ? 21 : 20} weight={active ? "fill" : "regular"} className={active ? "text-accent" : ""} />
      <span className={cn("font-600", mobile ? "text-[10px]" : "text-[14.5px]")}>{label}</span>
    </button>
  );
}

function IconBtn({ children, onClick, className }) {
  return (
    <button onClick={onClick} className={cn("relative grid h-11 w-11 place-items-center rounded-2xl glass border panel-edge shadow-soft transition-transform active:scale-95", className)}>
      {children}
    </button>
  );
}

export default function App() {
  const [tab, setTab] = useState("home");
  const [notifOpen, setNotifOpen] = useState(false);
  const [seen, setSeen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const [accent, setAccent] = useState("indigo");
  const active = NAV.find((n) => n.id === tab) ?? NAV[0];
  const View = active.View;
  const pct = Math.round((user.xp / user.xpToNext) * 100);

  useEffect(() => {
    const r = document.documentElement;
    r.dataset.theme = theme;
    const a = ACCENTS[accent];
    r.style.setProperty("--color-accent", a.c1);
    r.style.setProperty("--color-accent-2", a.c2);
    r.style.setProperty("--color-accent-soft", a.soft);
  }, [theme, accent]);

  return (
    <div className="min-h-[100dvh]">
      {/* Desktop sidebar */}
      <aside className="fixed left-0 top-0 z-40 hidden h-[100dvh] w-[256px] p-4 md:flex">
        <div className="glass flex h-full w-full flex-col rounded-[26px] border panel-edge p-3 shadow-lift">
          <div className="flex items-center gap-2.5 px-2 py-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-2xl bg-gradient-to-br from-accent to-accent-2 text-[16px] text-white shadow-soft">✦</span>
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

          <div className="mx-1 mt-5 rounded-2xl bg-gradient-to-br from-accent to-accent-2 p-3.5 text-white shadow-soft">
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

          <div className="tile mt-auto flex items-center gap-3 rounded-2xl p-2.5">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-accent to-accent-2 text-[13px] font-700 text-white">
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
            <h1 className="flex items-center text-[30px] font-800 leading-none tracking-tight sm:text-[38px]">
              {greet()}, {user.firstName}
              <GreetIcon />
              <Hand className="ml-3 hidden text-[26px] text-accent sm:inline">рад видеть!</Hand>
            </h1>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <IconBtn><MagnifyingGlass size={18} weight="bold" className="text-ink-soft" /></IconBtn>
            <div className="relative">
              <IconBtn onClick={() => { setNotifOpen((o) => !o); setSeen(true); }}>
                <Bell size={18} weight="bold" className="text-ink-soft" />
                {!seen && <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-pink ring-2 ring-[color:var(--color-canvas)]" />}
              </IconBtn>
              {notifOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
                  <div className="popover-in absolute right-0 top-[52px] z-50 w-[320px] rounded-3xl border panel-edge glass-strong p-2 shadow-lift">
                    <div className="flex items-center justify-between px-3 py-2">
                      <Tag className="text-ink-soft">Уведомления</Tag>
                      <Tag className="text-accent">{NOTIFS.length} новых</Tag>
                    </div>
                    <div className="max-h-[320px] overflow-auto no-scrollbar">
                      {NOTIFS.map((n) => (
                        <div key={n.id} className="flex items-start gap-3 rounded-2xl p-2.5 transition-colors hover:bg-white/60 dark:hover:bg-white/[0.06]">
                          <IconTile icon={n.icon} tone={n.tone} size={38} />
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
            <IconBtn onClick={() => setSettingsOpen(true)}><Gear size={18} weight="bold" className="text-ink-soft" /></IconBtn>
          </div>
        </header>

        <div key={tab} className="view-in">
          <View />
        </div>
      </main>

      {/* Mobile bottom nav */}
      <nav className="glass-strong fixed bottom-4 left-1/2 z-40 flex -translate-x-1/2 items-center gap-1 rounded-[22px] border panel-edge p-1.5 shadow-lift md:hidden">
        {NAV.map((n) => (
          <NavItem key={n.id} item={n} mobile active={tab === n.id} onClick={() => setTab(n.id)} />
        ))}
      </nav>

      {/* Settings slide-over */}
      {settingsOpen && (
        <>
          <div className="fade-in fixed inset-0 z-[55] bg-ink/30 backdrop-blur-[2px]" onClick={() => setSettingsOpen(false)} />
          <aside className="slide-in fixed inset-y-0 right-0 z-[56] w-[340px] max-w-[88vw] overflow-y-auto border-l panel-edge glass-strong p-5 shadow-lift no-scrollbar">
            <div className="flex items-center justify-between">
              <h2 className="text-[18px] font-800">Настройки</h2>
              <button onClick={() => setSettingsOpen(false)} className="chip grid h-8 w-8 place-items-center rounded-full transition-opacity hover:opacity-70">
                <X size={15} weight="bold" />
              </button>
            </div>

            <div className="mt-6">
              <Tag className="text-ink-mute">Оформление</Tag>
              <div className="mt-3 grid grid-cols-2 gap-2.5">
                {[["light", "Светлая", Sun], ["dark", "Тёмная", Moon]].map(([val, label, Ico]) => (
                  <button key={val} onClick={() => setTheme(val)} className={cn("flex flex-col items-center gap-2 rounded-2xl p-4 transition", theme === val ? "tile-2 ring-2 ring-accent" : "tile")}>
                    <Ico size={22} weight="duotone" className={theme === val ? "text-accent" : "text-ink-soft"} />
                    <span className="text-[13px] font-700">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-7">
              <Tag className="text-ink-mute">Цветовая гамма</Tag>
              <div className="mt-3 grid grid-cols-3 gap-2.5">
                {Object.entries(ACCENTS).map(([key, a]) => (
                  <button key={key} onClick={() => setAccent(key)} className={cn("flex flex-col items-center gap-2 rounded-2xl p-3 transition", accent === key ? "tile-2 ring-2 ring-accent" : "tile")}>
                    <span className="grid h-9 w-9 place-items-center rounded-full text-white shadow-soft" style={{ background: `linear-gradient(135deg, ${a.c1}, ${a.c2})` }}>
                      {accent === key && <Check size={16} weight="bold" />}
                    </span>
                    <span className="text-[11px] font-700">{a.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <p className="mt-7 text-[11.5px] leading-relaxed text-ink-mute">
              Тема и акцент применяются мгновенно. В реальном кабинете сохранятся для каждого сотрудника.
            </p>
          </aside>
        </>
      )}
    </div>
  );
}
