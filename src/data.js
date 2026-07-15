// Демо-данные. В проде эти поля собираются коннекторами из Битрикс24 / amoCRM / 1С / LMS.

export const user = {
  firstName: "Кира",
  lastName: "Соколова",
  role: "Менеджер по продажам",
  department: "Отдел продаж · Команда Север",
  initials: "КС",
  emoji: "🌿",
  level: 7,
  levelTitle: "Профи",
  xp: 2140,
  xpToNext: 2600,
  streakDays: 34,
  tenure: "2 года 4 мес",
};

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
