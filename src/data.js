// Демо-данные. В проде эти поля собираются коннекторами из Битрикс24 / amoCRM / 1С / LMS.

export const user = {
  firstName: "Кира",
  lastName: "Соколова",
  role: "Менеджер по продажам",
  department: "Отдел продаж · Команда Север",
  initials: "КС",
  level: 7,
  levelTitle: "Профи",
  xp: 2140,
  xpToNext: 2600,
  streakDays: 34,
  tenure: "2 года 4 мес",
  hireDate: "03.03.2024",
  birthday: "14 марта",
  phone: "+7 912 345-67-89",
  email: "k.sokolova@company.ru",
  manager: "Дмитрий Волков",
  city: "Ижевск",
};

// Вид руководителя (РОП): команда с метриками. В проде — из Б24/amo/1С.
export const teamMembers = [
  { name: "Аня Мороз", initials: "АМ", role: "Ст. менеджер", planPct: 118, deals: 31, conv: 38, avgCheck: 62000, salary: 104000, status: "top" },
  { name: "Олег Дым", initials: "ОД", role: "Менеджер", planPct: 104, deals: 27, conv: 33, avgCheck: 51000, salary: 92000, status: "top" },
  { name: "Кира Соколова", initials: "КС", role: "Менеджер", planPct: 92, deals: 24, conv: 31, avgCheck: 48200, salary: 87400, status: "ok", me: true },
  { name: "Лев Гай", initials: "ЛГ", role: "Менеджер", planPct: 86, deals: 21, conv: 28, avgCheck: 44000, salary: 79000, status: "ok" },
  { name: "Ника Рой", initials: "НР", role: "Менеджер", planPct: 74, deals: 18, conv: 24, avgCheck: 41000, salary: 71000, status: "behind" },
  { name: "Пётр Юн", initials: "ПЮ", role: "Стажёр", planPct: 58, deals: 11, conv: 19, avgCheck: 36000, salary: 52000, status: "behind" },
];

export const requestTypes = [
  { id: "vacation", title: "Отпуск", desc: "оплачиваемый / за свой счёт", icon: "umbrella", tone: "mint" },
  { id: "cert", title: "Справка 2-НДФЛ", desc: "или с места работы", icon: "file", tone: "indigo" },
  { id: "advance", title: "Аванс", desc: "часть зарплаты раньше", icon: "coins", tone: "amber" },
  { id: "dayoff", title: "Отгул", desc: "на несколько часов / день", icon: "clock", tone: "sky" },
];

export const myRequests = [
  { id: 1, type: "Отпуск", detail: "12–26 августа · 14 дней", status: "approved", date: "03.07" },
  { id: 2, type: "Справка 2-НДФЛ", detail: "для банка", status: "pending", date: "14.07" },
  { id: 3, type: "Аванс", detail: "20 000 ₽", status: "declined", date: "28.06" },
];

// Очередь на согласование (вид руководителя) — workflow/RPA
export const approvalQueue = [
  { id: 1, name: "Ника Рой", initials: "НР", role: "Менеджер", type: "Отпуск", detail: "04–10 августа · 7 дней", submitted: "сегодня, 10:20", kind: "vacation" },
  { id: 2, name: "Лев Гай", initials: "ЛГ", role: "Менеджер", type: "Аванс", detail: "25 000 ₽ до 20 числа", submitted: "вчера, 17:04", kind: "advance" },
  { id: 3, name: "Пётр Юн", initials: "ПЮ", role: "Стажёр", type: "Отгул", detail: "18 июля · 4 часа", submitted: "вчера, 09:31", kind: "dayoff" },
  { id: 4, name: "Аня Мороз", initials: "АМ", role: "Ст. менеджер", type: "Справка 2-НДФЛ", detail: "для визы", submitted: "2 дня назад", kind: "cert" },
  { id: 5, name: "Олег Дым", initials: "ОД", role: "Менеджер", type: "Отпуск", detail: "22–24 августа · 3 дня", submitted: "сегодня, 08:12", kind: "vacation" },
  { id: 6, name: "Лев Гай", initials: "ЛГ", role: "Менеджер", type: "Отгул", detail: "21 июля · 2 часа", submitted: "сегодня, 11:40", kind: "dayoff" },
  // уже согласованы руководителем — ждут HR / Бухгалтерию
  { id: 7, name: "Влад Сан", initials: "ВС", role: "Менеджер", type: "Отпуск", detail: "01–05 сентября · 5 дней", submitted: "вчера, 12:10", kind: "vacation", stage: 2 },
  { id: 8, name: "Юля Ро", initials: "ЮР", role: "Ст. менеджер", type: "Аванс", detail: "30 000 ₽ к выплате", submitted: "вчера, 15:35", kind: "advance", stage: 2 },
];

export const declineReasons = ["Недостаточно данных", "Нет замены на период", "Перенести срок", "Превышен лимит"];

// Маршруты согласования: [ярлык этапа, роль, кто действует]
export const approvalRoutes = {
  vacation: [["Подано", "employee"], ["Руководитель", "manager"], ["HR", "hr"], ["Готово", "done"]],
  advance: [["Подано", "employee"], ["Руководитель", "manager"], ["Бухгалтерия", "accountant"], ["Выплата", "done"]],
  dayoff: [["Подано", "employee"], ["Руководитель", "manager"], ["Готово", "done"]],
  cert: [["Подано", "employee"], ["HR", "hr"], ["Готово", "done"]],
};

// База знаний (управление — вид HR)
export const kbArticles = [
  { id: 1, title: "Регламент продаж", tag: "Процессы", icon: "book", tone: "indigo", status: "published", views: 214 },
  { id: 2, title: "Скрипты звонков", tag: "Скрипты", icon: "phone", tone: "mint", status: "published", views: 189 },
  { id: 3, title: "База по продукту", tag: "Продукт", icon: "brain", tone: "pink", status: "published", views: 342 },
  { id: 4, title: "FAQ для клиентов", tag: "Поддержка", icon: "chat", tone: "sky", status: "draft", views: 0 },
  { id: 5, title: "Онбординг новичка", tag: "Онбординг", icon: "cap", tone: "amber", status: "draft", views: 0 },
];

export const payslips = [
  { id: 1, month: "Июнь 2026", sum: 82100 },
  { id: 2, month: "Май 2026", sum: 79500 },
  { id: 3, month: "Апрель 2026", sum: 74800 },
];

export const salary = {
  month: "Июль",
  total: 87400,
  prevTotal: 82100,
  payday: "5 августа",
  breakdown: [
    { label: "Оклад", amount: 45000, tone: "ink" },
    { label: "Бонус за KPI", amount: 32400, tone: "money" },
    { label: "Разовая премия", amount: 10000, tone: "flame" },
  ],
  // как считается бонус — прозрачность
  formula: "Оклад + (выполнение плана × ставка бонуса) + премии",
  history: [
    { m: "Фев", v: 68000 },
    { m: "Мар", v: 72400 },
    { m: "Апр", v: 74800 },
    { m: "Май", v: 79500 },
    { m: "Июн", v: 82100 },
    { m: "Июл", v: 87400 },
  ],
};

export const kpis = [
  { key: "plan", name: "План продаж", value: 92, unit: "%", target: 100, color: "kpi", hint: "1.84 млн из 2.0 млн ₽" },
  { key: "conv", name: "Конверсия", value: 31, unit: "%", target: 25, color: "money", hint: "выше нормы отдела" },
  { key: "deals", name: "Сделки", value: 24, unit: "", target: 20, color: "team", hint: "закрыто в этом месяце" },
  { key: "check", name: "Средний чек", value: 76, unit: "%", target: 100, color: "award", hint: "48 200 ₽ · растёт", raw: "48 200 ₽" },
];

export const awards = [
  { id: 1, icon: "trophy", tier: "legendary", title: "Лучший месяц", sub: "×3", earned: true, rarity: "Легендарная" },
  { id: 2, icon: "cap", tier: "rare", title: "Ментор", sub: "обучила 2 новичков", earned: true, rarity: "Редкая" },
  { id: 3, icon: "bolt", tier: "common", title: "Скорость", sub: "ответ < 5 мин", earned: true, rarity: "Обычная" },
  { id: 4, icon: "fire", tier: "rare", title: "Марафонец", sub: "стрик 30 дней", earned: true, rarity: "Редкая" },
  { id: 5, icon: "target", tier: "common", title: "Снайпер", sub: "5 сделок подряд", earned: true, rarity: "Обычная" },
  { id: 6, icon: "diamond", tier: "rare", title: "Мастер продаж", sub: "78 из 100 сделок", earned: false, progress: 78 },
  { id: 7, icon: "crown", tier: "legendary", title: "Легенда квартала", sub: "стань №1 за квартал", earned: false, progress: 40 },
  { id: 8, icon: "rocket", tier: "rare", title: "Рекорд чека", sub: "чек > 100 000 ₽", earned: false, progress: 62 },
];

export const courses = [
  { id: 1, title: "Продукт 2.0", cat: "Обязательный", progress: 88, done: 7, total: 8, icon: "package", tone: "indigo" },
  { id: 2, title: "Работа с возражениями", cat: "Продажи", progress: 45, done: 5, total: 11, icon: "puzzle", tone: "amber" },
  { id: 3, title: "Переговоры pro", cat: "Продажи", progress: 12, done: 1, total: 9, icon: "handshake", tone: "mint" },
  { id: 4, title: "CRM за 1 час", cat: "Онбординг", progress: 100, done: 6, total: 6, icon: "gear", tone: "sky" },
];

export const knowledge = [
  { id: 1, title: "Регламент продаж", tag: "Процессы", icon: "book", tone: "indigo" },
  { id: 2, title: "Скрипты звонков", tag: "Скрипты", icon: "phone", tone: "mint" },
  { id: 3, title: "База по продукту", tag: "Продукт", icon: "brain", tone: "pink" },
  { id: 4, title: "FAQ для клиентов", tag: "Поддержка", icon: "chat", tone: "sky" },
];

export const tasks = [
  { id: 1, title: "Позвонить ООО «Ромашка»", due: "Сегодня, 15:00", hot: true, project: "Сделка №2417" },
  { id: 2, title: "Отправить КП «Северсталь»", due: "Завтра", hot: false, project: "Сделка №2431" },
  { id: 3, title: "Тест по курсу «Продукт 2.0»", due: "Чт", hot: false, project: "Обучение" },
  { id: 4, title: "Отчёт за неделю", due: "Пт", hot: false, project: "Отдел" },
];

export const team = {
  myRank: 3,
  total: 18,
  peerRating: 4.6,
  peerCount: 9,
  leaderboard: [
    { name: "Аня Мороз", pts: 1240, me: false },
    { name: "Олег Дым", pts: 1180, me: false },
    { name: "Кира Соколова", pts: 1120, me: true },
    { name: "Лев Гай", pts: 1040, me: false },
    { name: "Ника Рой", pts: 980, me: false },
  ],
};

export const sources = ["Битрикс24", "amoCRM", "1С:ЗУП", "LMS Ориентир"];
