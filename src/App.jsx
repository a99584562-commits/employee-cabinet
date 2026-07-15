import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { House, Wallet, GraduationCap, Trophy, UsersThree, FileText, ChartBar, SealCheck, BookOpen, Coins, MagnifyingGlass, Bell, Gear, Sun, SunHorizon, Moon, MoonStars, Check, X, CaretRight, CaretDown, User, Briefcase, Calculator, SlidersHorizontal, ChartLineUp, Plugs, ShieldCheck } from "@phosphor-icons/react";
import { user, approvalQueue, approvalRoutes } from "./data";
import { cn, Tag, Hand, Bar, IconTile } from "./ui";
import Dashboard from "./views/Dashboard";
import Manager from "./views/Manager";
import Salary from "./views/Salary";
import Growth from "./views/Growth";
import Awards from "./views/Awards";
import Team from "./views/Team";
import Requests from "./views/Requests";
import Approvals from "./views/Approvals";
import Payroll from "./views/Payroll";
import KnowledgeAdmin from "./views/KnowledgeAdmin";
import AssignTraining from "./views/AssignTraining";
import Roster from "./views/Roster";
import Builder from "./views/Builder";
import Analytics from "./views/Analytics";
import Integrations from "./views/Integrations";
import Security from "./views/Security";
import Profile from "./views/Profile";

const NAV_BY_ROLE = {
  employee: [
    { id: "home", label: "Главная", Icon: House },
    { id: "salary", label: "Зарплата", Icon: Wallet },
    { id: "growth", label: "Развитие", Icon: GraduationCap },
    { id: "awards", label: "Награды", Icon: Trophy },
    { id: "team", label: "Команда", Icon: UsersThree },
    { id: "requests", label: "Заявки", Icon: FileText },
  ],
  manager: [
    { id: "home", label: "Отдел", Icon: ChartBar },
    { id: "requests", label: "Согласования", Icon: SealCheck },
    { id: "salary", label: "Зарплата", Icon: Wallet },
    { id: "awards", label: "Награды", Icon: Trophy },
  ],
  hr: [
    { id: "requests", label: "Согласования", Icon: SealCheck },
    { id: "knowledge", label: "База знаний", Icon: BookOpen },
    { id: "assign", label: "Обучение", Icon: GraduationCap },
    { id: "roster", label: "Команда", Icon: UsersThree },
  ],
  accountant: [
    { id: "requests", label: "Согласования", Icon: SealCheck },
    { id: "payroll", label: "Ведомость", Icon: Coins },
    { id: "roster", label: "Команда", Icon: UsersThree },
  ],
  director: [
    { id: "analytics", label: "Аналитика", Icon: ChartLineUp },
    { id: "requests", label: "Согласования", Icon: SealCheck },
    { id: "roster", label: "Команда", Icon: UsersThree },
  ],
  admin: [
    { id: "builder", label: "Конструктор", Icon: SlidersHorizontal },
    { id: "integrations", label: "Интеграции", Icon: Plugs },
    { id: "security", label: "Безопасность", Icon: ShieldCheck },
    { id: "roster", label: "Команда", Icon: UsersThree },
  ],
};

const ROLES = [["employee", "Сотрудник"], ["manager", "Руководитель"], ["hr", "HR"], ["accountant", "Бухгалтер"], ["director", "Директор"], ["admin", "Админ"]];
const ROLE_META = { employee: { label: "Сотрудник", Icon: User }, manager: { label: "Руководитель", Icon: Briefcase }, hr: { label: "HR", Icon: UsersThree }, accountant: { label: "Бухгалтер", Icon: Calculator }, director: { label: "Директор", Icon: ChartLineUp }, admin: { label: "Админ", Icon: SlidersHorizontal } };
const ROLE_SUB = { employee: user.role, manager: "Руководитель отдела", hr: "HR-специалист", accountant: "Бухгалтер", director: "Директор", admin: "Администратор" };
const ROLE_HELLO = { employee: "рад видеть!", manager: "как отдел?", hr: "как команда?", accountant: "считаем?", director: "как компания?", admin: "настроим?" };

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
    <button onClick={onClick} className={cn("group relative flex items-center transition-colors duration-300", mobile ? "flex-1 flex-col gap-1 py-1" : "w-full gap-3 rounded-2xl px-3.5 py-2.5", active ? "text-ink" : "text-ink-mute hover:text-ink-soft")}>
      {active && <motion.span layoutId={mobile ? "np-m" : "np-d"} className="absolute inset-0 -z-10 rounded-2xl bg-white/80 shadow-soft ring-1 ring-black/[0.04] dark:bg-white/[0.09] dark:ring-white/10" transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
      <Icon size={20} weight={active ? "fill" : "regular"} className={active ? "text-accent" : ""} />
      <span className={cn("font-600", mobile ? "text-[9.5px]" : "text-[14.5px]")}>{label}</span>
    </button>
  );
}

function IconBtn({ children, onClick }) {
  return <button onClick={onClick} className="relative grid h-11 w-11 place-items-center rounded-2xl glass border panel-edge shadow-soft transition-transform active:scale-95">{children}</button>;
}

function RoleToggle({ role, onChange }) {
  return (
    <div className="grid grid-cols-2 gap-1 rounded-2xl bg-ink/[0.05] p-1 dark:bg-white/[0.05]">
      {ROLES.map(([v, l]) => (
        <button key={v} onClick={() => onChange(v)} className={cn("rounded-xl py-1.5 text-[11.5px] font-700 transition-colors", role === v ? "bg-white text-ink shadow-soft dark:bg-white/15 dark:text-white" : "text-ink-mute")}>{l}</button>
      ))}
    </div>
  );
}

export default function App() {
  const [role, setRole] = useState("employee");
  const [tab, setTab] = useState("home");
  const [requests, setRequests] = useState(() => approvalQueue.map((q) => ({ ...q, stage: q.stage ?? 1, status: "active", reason: null })));
  const [notifOpen, setNotifOpen] = useState(false);
  const [roleMenu, setRoleMenu] = useState(false);
  const [seen, setSeen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [theme, setTheme] = useState(() => { try { return localStorage.getItem("ec-theme") || "light"; } catch { return "light"; } });
  const [accent, setAccent] = useState(() => { try { const a = localStorage.getItem("ec-accent"); return a && ACCENTS[a] ? a : "indigo"; } catch { return "indigo"; } });
  const pct = Math.round((user.xp / user.xpToNext) * 100);
  const nav = NAV_BY_ROLE[role];
  const RoleCur = ROLE_META[role].Icon;

  useEffect(() => {
    const r = document.documentElement;
    r.dataset.theme = theme;
    const a = ACCENTS[accent] || ACCENTS.indigo;
    r.style.setProperty("--color-accent", a.c1);
    r.style.setProperty("--color-accent-2", a.c2);
    r.style.setProperty("--color-accent-soft", a.soft);
    try { localStorage.setItem("ec-theme", theme); localStorage.setItem("ec-accent", accent); } catch { /* ignore */ }
  }, [theme, accent]);

  const changeRole = (r) => { setRole(r); setTab(NAV_BY_ROLE[r][0].id); setNotifOpen(false); };
  const approve = (id) => setRequests((prev) => prev.map((r) => {
    if (r.id !== id || r.status !== "active") return r;
    const route = approvalRoutes[r.kind];
    const next = r.stage + 1;
    return { ...r, stage: next, status: route[next][1] === "done" ? "done" : "active" };
  }));
  const decline = (id, reason) => setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status: "declined", reason } : r)));

  const renderView = () => {
    if (tab === "profile") return <Profile />;
    switch (tab) {
      case "home": return role === "manager" ? <Manager /> : <Dashboard />;
      case "salary": return <Salary />;
      case "growth": return <Growth />;
      case "awards": return <Awards />;
      case "team": return <Team />;
      case "roster": return <Roster />;
      case "knowledge": return <KnowledgeAdmin />;
      case "assign": return <AssignTraining />;
      case "payroll": return <Payroll />;
      case "analytics": return <Analytics />;
      case "integrations": return <Integrations />;
      case "security": return <Security />;
      case "builder": return <Builder />;
      case "requests": return role === "employee" ? <Requests /> : <Approvals role={role} requests={requests} onApprove={approve} onDecline={decline} />;
      default: return <Dashboard />;
    }
  };
  const openProfile = () => { setTab("profile"); setSettingsOpen(false); };

  return (
    <div className="min-h-[100dvh]">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 hidden h-[100dvh] w-[256px] p-4 md:flex">
        <div className="glass flex h-full w-full flex-col rounded-[26px] border panel-edge p-3 shadow-lift">
          <div className="flex items-center gap-2.5 px-2 py-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-2xl bg-gradient-to-br from-accent to-accent-2 text-[16px] text-white shadow-soft">✦</span>
            <div className="leading-tight">
              <div className="text-[15px] font-800">Моё пространство</div>
              <Tag className="text-ink-mute">employee os</Tag>
            </div>
          </div>

          <nav className="mt-4 flex flex-col gap-1">
            {nav.map((n) => <NavItem key={n.id} item={n} active={tab === n.id} onClick={() => setTab(n.id)} />)}
          </nav>

          {role === "employee" && (
            <div className="mx-1 mt-4 rounded-2xl bg-gradient-to-br from-accent to-accent-2 p-3.5 text-white shadow-soft">
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
          )}

          <button onClick={openProfile} className={cn("tile group mt-auto flex items-center gap-3 rounded-2xl p-2.5 text-left transition-colors", tab === "profile" && "ring-2 ring-accent")}>
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-accent to-accent-2 text-[13px] font-700 text-white">{user.initials}</div>
            <div className="min-w-0 flex-1 leading-tight">
              <div className="truncate text-[13px] font-700">{user.firstName} {user.lastName}</div>
              <div className="truncate text-[11.5px] text-ink-mute">{ROLE_SUB[role]}</div>
            </div>
            <CaretRight size={14} weight="bold" className="shrink-0 text-ink-mute transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="min-h-[100dvh] px-4 pb-28 pt-5 md:pl-[256px] md:pr-6 md:pb-8 md:pt-6">
        <header className="mb-6 flex items-end justify-between gap-4">
          <div>
            <div className="mb-1.5 text-[12.5px] font-600 capitalize text-ink-soft">{new Date().toLocaleDateString("ru-RU", { weekday: "long", day: "numeric", month: "long" })}</div>
            <h1 className="flex items-center text-[30px] font-800 leading-none tracking-tight sm:text-[38px]">
              {greet()}, {user.firstName}
              <GreetIcon />
              <Hand className="ml-3 hidden text-[26px] text-accent sm:inline">{ROLE_HELLO[role]}</Hand>
            </h1>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <div className="relative">
              <button onClick={() => setRoleMenu((o) => !o)} className="flex h-11 items-center gap-2 rounded-2xl glass border panel-edge px-3 shadow-soft transition-transform active:scale-95">
                <RoleCur size={18} weight="bold" className="text-accent" />
                <span className="hidden text-[13px] font-700 sm:inline">{ROLE_META[role].label}</span>
                <CaretDown size={12} weight="bold" className="text-ink-mute" />
              </button>
              {roleMenu && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setRoleMenu(false)} />
                  <div className="popover-in absolute right-0 top-[52px] z-50 w-[224px] rounded-3xl border panel-edge glass-strong p-1.5 shadow-lift">
                    <div className="px-3 py-2"><Tag className="text-ink-mute">Роль в системе</Tag></div>
                    {ROLES.map(([v, l]) => {
                      const M = ROLE_META[v];
                      const on = role === v;
                      return (
                        <button key={v} onClick={() => { changeRole(v); setRoleMenu(false); }} className={cn("flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition-colors", on ? "bg-accent/[0.1]" : "hover:bg-white/60 dark:hover:bg-white/[0.06]")}>
                          <M.Icon size={18} weight={on ? "fill" : "regular"} className={on ? "text-accent" : "text-ink-soft"} />
                          <span className={cn("flex-1 text-[13.5px]", on ? "font-800 text-accent" : "font-600")}>{l}</span>
                          {on && <Check size={14} weight="bold" className="text-accent" />}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
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
                    <div className="flex items-center justify-between px-3 py-2"><Tag className="text-ink-soft">Уведомления</Tag><Tag className="text-accent">{NOTIFS.length} новых</Tag></div>
                    <div className="max-h-[320px] overflow-auto no-scrollbar">
                      {NOTIFS.map((n) => (
                        <div key={n.id} className="flex items-start gap-3 rounded-2xl p-2.5 transition-colors hover:bg-white/60 dark:hover:bg-white/[0.06]">
                          <IconTile icon={n.icon} tone={n.tone} size={38} />
                          <div className="min-w-0 flex-1"><div className="text-[13px] font-600 leading-snug">{n.title}</div><div className="mt-0.5 text-[11px] text-ink-mute">{n.time}</div></div>
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

        <div key={tab + role} className="view-in">{renderView()}</div>

        <footer className="mt-8 flex justify-center pb-1">
          <a href="https://limecrm.ru" target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2.5 rounded-full glass border panel-edge px-4 py-2 shadow-soft transition-transform hover:-translate-y-0.5 active:scale-[0.98]">
            <span className="grid h-6 w-6 place-items-center rounded-lg bg-lime text-[13px] font-900 text-ink shadow-[0_0_14px_rgba(163,230,53,0.55)]">✦</span>
            <span className="text-[12.5px] font-600 text-ink-soft">Разработано в <b className="font-800 text-ink">Агентстве ЛАЙМ</b></span>
            <span className="hidden text-[11.5px] font-500 text-ink-mute sm:inline">· limecrm.ru</span>
          </a>
        </footer>
      </main>

      {/* Mobile nav */}
      <nav className="glass-strong fixed inset-x-3 bottom-3 z-40 flex items-center gap-0.5 rounded-[22px] border panel-edge p-1.5 shadow-lift md:hidden">
        {nav.map((n) => <NavItem key={n.id} item={n} mobile active={tab === n.id} onClick={() => setTab(n.id)} />)}
      </nav>

      {/* Settings */}
      {settingsOpen && (
        <>
          <div className="fade-in fixed inset-0 z-[55] bg-ink/30 backdrop-blur-[2px]" onClick={() => setSettingsOpen(false)} />
          <aside className="slide-in fixed inset-y-0 right-0 z-[56] w-[340px] max-w-[88vw] overflow-y-auto border-l panel-edge glass-strong p-5 shadow-lift no-scrollbar">
            <div className="flex items-center justify-between">
              <h2 className="text-[18px] font-800">Настройки</h2>
              <button onClick={() => setSettingsOpen(false)} className="chip grid h-8 w-8 place-items-center rounded-full transition-opacity hover:opacity-70"><X size={15} weight="bold" /></button>
            </div>
            <button onClick={openProfile} className="tile mt-5 flex w-full items-center gap-3 rounded-2xl p-2.5 text-left">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-accent to-accent-2 text-[13px] font-700 text-white">{user.initials}</div>
              <div className="min-w-0 flex-1"><div className="truncate text-[13px] font-700">{user.firstName} {user.lastName}</div><div className="truncate text-[11.5px] text-ink-mute">Открыть профиль</div></div>
              <CaretRight size={15} weight="bold" className="shrink-0 text-ink-mute" />
            </button>
            <div className="mt-6"><Tag className="text-ink-mute">Роль в системе</Tag><div className="mt-3"><RoleToggle role={role} onChange={changeRole} /></div></div>
            <div className="mt-6">
              <Tag className="text-ink-mute">Оформление</Tag>
              <div className="mt-3 grid grid-cols-2 gap-2.5">
                {[["light", "Светлая", Sun], ["dark", "Тёмная", Moon]].map(([val, label, Ico]) => (
                  <button key={val} onClick={() => setTheme(val)} className={cn("flex flex-col items-center gap-2 rounded-2xl p-4 transition", theme === val ? "tile-2 ring-2 ring-accent" : "tile")}>
                    <Ico size={22} weight="duotone" className={theme === val ? "text-accent" : "text-ink-soft"} /><span className="text-[13px] font-700">{label}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-7">
              <Tag className="text-ink-mute">Цветовая гамма</Tag>
              <div className="mt-3 grid grid-cols-3 gap-2.5">
                {Object.entries(ACCENTS).map(([key, a]) => (
                  <button key={key} onClick={() => setAccent(key)} className={cn("flex flex-col items-center gap-2 rounded-2xl p-3 transition", accent === key ? "tile-2 ring-2 ring-accent" : "tile")}>
                    <span className="grid h-9 w-9 place-items-center rounded-full text-white shadow-soft" style={{ background: `linear-gradient(135deg, ${a.c1}, ${a.c2})` }}>{accent === key && <Check size={16} weight="bold" />}</span>
                    <span className="text-[11px] font-700">{a.name}</span>
                  </button>
                ))}
              </div>
            </div>
            <p className="mt-7 text-[11.5px] leading-relaxed text-ink-mute">Роль, тема и акцент применяются мгновенно. Переключай роль, чтобы увидеть кабинеты Руководителя, HR и Бухгалтера.</p>
          </aside>
        </>
      )}
    </div>
  );
}
