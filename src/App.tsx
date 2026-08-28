import { useState } from "react";

/* ── Karazin UniVerse design tokens ────────────────────────────────────────
   Source: packages/ui/vars.scss
   Accent primary : #164bd7  (blue-600)
   Surface        : #f8f9fa  (gray-50)
   Border         : #e9ecef  (gray-200)
   Text primary   : #212529  (gray-900)
   Text secondary : #868e96  (gray-600)
   Success        : #22c55e
   Error          : #ef4444
   Warning        : #f59e0b
   Sidebar        : #212529  (gray-900, dark)
   ────────────────────────────────────────────────────────────────────────── */

const KZ = {
  accent: "#164bd7",
  accentHover: "#123898",
  accentLight: "#edf1fe",
  sidebar: "#212529",
  sidebarHover: "#343a40",
  sidebarActive: "#164bd7",
  surface: "#f8f9fa",
  bg: "#ffffff",
  border: "#e9ecef",
  borderStrong: "#dee2e6",
  text: "#212529",
  textSec: "#868e96",
  textDis: "#ced4da",
  success: "#22c55e",
  successLight: "#f0fdf4",
  error: "#ef4444",
  errorLight: "#fef2f2",
  warning: "#f59e0b",
  warningLight: "#fffbeb",
  shadow: "0 1px 2px 0 rgba(0,0,0,0.05)",
  shadowMd: "0 4px 6px -1px rgba(0,0,0,0.1),0 2px 4px -1px rgba(0,0,0,0.06)",
  radius: "8px",
  radiusSm: "4px",
  radiusLg: "12px",
  radiusFull: "9999px",
};

type Page = "home" | "grades" | "info";

const NAV: { id: Page; label: string; icon: string }[] = [
  { id: "home",   label: "Головна",                  icon: "⊞" },
  { id: "grades", label: "Оцінки",                   icon: "▤" },
  { id: "info",   label: "Загальна інформація",       icon: "◈" },
];

const STUDENT = {
  name: "Шевченко Олена Іванівна",
  university: "Харківський національний університет імені В.Н. Каразіна",
  faculty: "Факультет комп'ютерних наук",
  specialty: "122 — Комп'ютерні науки",
  degree: "Бакалавр",
  group: "КН-31",
  studyType: "Денна",
  paymentType: "Контракт",
  enrollmentOrder: "№ 142-к від 01.09.2022",
  duration: "4 роки",
  endDate: "30.06.2026",
};

const PAYMENT_REQUISITES = {
  recipient: "Харківський національний університет імені В.Н. Каразіна",
  edrpou: "02070889",
  bank: "Державна казначейська служба України",
  mfo: "820172",
  iban: "UA21820172313156201000000000444",
  purpose: "Оплата за навчання, Шевченко О.І., КН-31, ІІ семестр 2024–2025",
  amount: "12 500,00 грн",
  deadline: "01.02.2025",
};

const PAYMENT_HISTORY = [
  { date: "01.09.2024", amount: "12 500,00", status: "paid" },
  { date: "01.02.2024", amount: "12 500,00", status: "paid" },
  { date: "01.09.2023", amount: "11 800,00", status: "paid" },
  { date: "01.02.2023", amount: "11 800,00", status: "paid" },
];

const SUBJECTS = [
  "Алгоритми та структури даних",
  "Бази даних",
  "Операційні системи",
  "Мережі та телекомунікації",
  "Програмна інженерія",
];

const GRADES_DATA: Record<string, { task: string; date: string; grade: number }[]> = {
  "Алгоритми та структури даних": [
    { task: "Лабораторна робота №1", date: "12.09.2024", grade: 95 },
    { task: "Лабораторна робота №2", date: "26.09.2024", grade: 88 },
    { task: "Контрольна робота",      date: "10.10.2024", grade: 91 },
    { task: "Лабораторна робота №3", date: "24.10.2024", grade: 85 },
    { task: "Самостійна робота",      date: "07.11.2024", grade: 90 },
    { task: "Лабораторна робота №4", date: "21.11.2024", grade: 93 },
    { task: "Лабораторна робота №5", date: "05.12.2024", grade: 87 },
    { task: "Іспит",                  date: "20.12.2024", grade: 94 },
  ],
  "Бази даних": [
    { task: "Лабораторна робота №1", date: "14.09.2024", grade: 82 },
    { task: "Лабораторна робота №2", date: "28.09.2024", grade: 79 },
    { task: "Контрольна робота",      date: "12.10.2024", grade: 85 },
    { task: "Курсова робота (ч. 1)", date: "26.10.2024", grade: 88 },
    { task: "Лабораторна робота №3", date: "09.11.2024", grade: 76 },
    { task: "Курсова робота (ч. 2)", date: "23.11.2024", grade: 90 },
    { task: "Іспит",                  date: "18.12.2024", grade: 83 },
  ],
  "Операційні системи": [
    { task: "Лабораторна робота №1", date: "10.09.2024", grade: 78 },
    { task: "Лабораторна робота №2", date: "24.09.2024", grade: 82 },
    { task: "Контрольна робота",      date: "08.10.2024", grade: 75 },
    { task: "Лабораторна робота №3", date: "22.10.2024", grade: 80 },
    { task: "Іспит",                  date: "17.12.2024", grade: 77 },
  ],
  "Мережі та телекомунікації": [
    { task: "Лабораторна робота №1", date: "11.09.2024", grade: 91 },
    { task: "Лабораторна робота №2", date: "25.09.2024", grade: 88 },
    { task: "Самостійна робота",      date: "09.10.2024", grade: 85 },
    { task: "Іспит",                  date: "19.12.2024", grade: 90 },
  ],
  "Програмна інженерія": [
    { task: "Лабораторна робота №1", date: "13.09.2024", grade: 95 },
    { task: "Лабораторна робота №2", date: "27.09.2024", grade: 92 },
    { task: "Проектна робота",        date: "11.10.2024", grade: 96 },
    { task: "Лабораторна робота №3", date: "25.10.2024", grade: 89 },
    { task: "Фінальний проект",       date: "10.12.2024", grade: 97 },
  ],
};

const FINAL_GRADES = [
  { subject: "Алгоритми та структури даних", grade: 94, ects: "A" },
  { subject: "Бази даних",                   grade: 83, ects: "B" },
  { subject: "Операційні системи",            grade: 77, ects: "C" },
  { subject: "Мережі та телекомунікації",     grade: 90, ects: "A" },
  { subject: "Програмна інженерія",           grade: 97, ects: "A" },
  { subject: "Математичний аналіз",           grade: 88, ects: "B" },
  { subject: "Фізика",                        grade: 81, ects: "B" },
  { subject: "Англійська мова",               grade: 92, ects: "A" },
];

const SCHEDULE = [
  { time: "08:00–09:35", mon: "Алгоритми", tue: "",        wed: "Бази даних",  thu: "",            fri: "ОС"           },
  { time: "09:45–11:20", mon: "Алгоритми", tue: "Мережі",  wed: "Бази даних",  thu: "Прог. інж.",  fri: "ОС"           },
  { time: "11:30–13:05", mon: "",           tue: "Мережі",  wed: "",             thu: "Прог. інж.",  fri: ""             },
  { time: "13:30–15:05", mon: "БД",         tue: "",        wed: "Алгоритми",   thu: "",            fri: "Прог. інж."   },
  { time: "15:15–16:50", mon: "БД",         tue: "ОС",      wed: "Алгоритми",   thu: "Мережі",      fri: "Прог. інж."   },
];
const DAYS = ["Пн", "Вт", "Ср", "Чт", "Пт"];
const DAY_KEYS = ["mon", "tue", "wed", "thu", "fri"] as const;

const REMINDERS = [
  { text: "Здача лабораторної роботи №5 з Алгоритмів", date: "05.12.2024", type: "error" as const },
  { text: "Оплата за ІІ семестр 2024–2025",             date: "01.02.2025", type: "warning" as const },
  { text: "Зарахування до наступного курсу",            date: "30.06.2025", type: "info" as const },
];

function gradeInfo(g: number) {
  if (g >= 90) return { label: "A", color: KZ.success,  bg: KZ.successLight,  text: "#166534" };
  if (g >= 82) return { label: "B", color: KZ.accent,   bg: KZ.accentLight,   text: KZ.accentHover };
  if (g >= 74) return { label: "C", color: "#f59e0b",   bg: "#fffbeb",        text: "#92400e" };
  if (g >= 64) return { label: "D", color: "#f97316",   bg: "#fff7ed",        text: "#9a3412" };
  return               { label: "F", color: KZ.error,   bg: KZ.errorLight,    text: "#991b1b" };
}

function GradeBadge({ grade }: { grade: number }) {
  const gi = gradeInfo(grade);
  return (
    <span
      className="inline-flex items-center justify-center text-xs font-bold rounded px-2 py-0.5 tabular-nums"
      style={{ backgroundColor: gi.bg, color: gi.text, border: `1px solid ${gi.color}22`, borderRadius: KZ.radiusSm }}
    >
      {grade} / {gi.label}
    </span>
  );
}

function MiniProgress({ value }: { value: number }) {
  const gi = gradeInfo(value);
  return (
    <div className="w-full h-1 rounded-full overflow-hidden" style={{ backgroundColor: KZ.border, marginTop: 4 }}>
      <div style={{ width: `${value}%`, backgroundColor: gi.color, height: "100%", borderRadius: KZ.radiusFull, transition: "width 0.5s ease" }} />
    </div>
  );
}

function Card({ children, className = "", style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={className}
      style={{
        backgroundColor: KZ.bg,
        border: `1px solid ${KZ.border}`,
        borderRadius: KZ.radiusLg,
        boxShadow: KZ.shadow,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: KZ.textSec, marginBottom: 12 }}>
      {children}
    </p>
  );
}

function PrimaryButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        backgroundColor: hover ? KZ.accentHover : KZ.accent,
        color: "#fff",
        border: "none",
        borderRadius: KZ.radius,
        padding: "8px 20px",
        fontSize: 14,
        fontWeight: 500,
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        transition: "background-color 150ms cubic-bezier(0.4,0,0.2,1)",
        fontFamily: "inherit",
      }}
    >
      {children}
    </button>
  );
}

// ── PAGES ──────────────────────────────────────────────────────────────────

function HomePage() {
  const h = new Date().getHours();
  const greeting = h < 5 ? "Доброї ночі" : h < 12 ? "Доброго ранку" : h < 17 ? "Добрий день" : "Добрий вечір";

  const reminderStyles: Record<string, { dot: string; bg: string; border: string }> = {
    error:   { dot: KZ.error,   bg: KZ.errorLight,   border: "#fecaca" },
    warning: { dot: KZ.warning, bg: KZ.warningLight,  border: "#fde68a" },
    info:    { dot: KZ.accent,  bg: KZ.accentLight,  border: "#c5d3fc" },
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Top 3-col strip */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr 1fr", gap: 16 }}>
        {/* Reminders */}
        <Card style={{ padding: 20 }}>
          <SectionTitle>Нагадування</SectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {REMINDERS.map((r, i) => {
              const s = reminderStyles[r.type];
              return (
                <div key={i} style={{ display: "flex", gap: 10, padding: "10px 12px", backgroundColor: s.bg, border: `1px solid ${s.border}`, borderRadius: KZ.radius }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: s.dot, flexShrink: 0, marginTop: 5 }} />
                  <div>
                    <p style={{ fontSize: 13, color: KZ.text, lineHeight: 1.4 }}>{r.text}</p>
                    <p style={{ fontSize: 11, color: KZ.textSec, marginTop: 2, fontVariantNumeric: "tabular-nums" }}>{r.date}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Welcome */}
        <Card style={{ padding: 20, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
          <div style={{ width: 60, height: 60, borderRadius: "50%", backgroundColor: KZ.accentLight, border: `2px solid ${KZ.accent}22`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 700, color: KZ.accent, marginBottom: 12 }}>
            ОШ
          </div>
          <p style={{ fontSize: 12, color: KZ.textSec }}>{greeting},</p>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: KZ.text, margin: "4px 0" }}>Олено Шевченко</h2>
          <p style={{ fontSize: 13, color: KZ.textSec }}>Група КН-31 · Бакалавр · 3 курс</p>
          <div style={{ display: "flex", gap: 6, marginTop: 12 }}>
            {["КН-31", "Денна", "Контракт"].map(tag => (
              <span key={tag} style={{ padding: "3px 10px", backgroundColor: KZ.surface, border: `1px solid ${KZ.border}`, borderRadius: KZ.radiusFull, fontSize: 11, fontWeight: 500, color: KZ.textSec }}>
                {tag}
              </span>
            ))}
          </div>
        </Card>

        {/* Recent grades */}
        <Card style={{ padding: 20 }}>
          <SectionTitle>Останні оцінки</SectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { subject: "Прог. інженерія", task: "Фінальний проект", grade: 97 },
              { subject: "Алгоритми",        task: "Лабораторна №5",   grade: 87 },
              { subject: "Мережі",           task: "Іспит",             grade: 90 },
            ].map((g, i) => (
              <div key={i}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ minWidth: 0, flex: 1, paddingRight: 8 }}>
                    <p style={{ fontSize: 13, fontWeight: 500, color: KZ.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{g.subject}</p>
                    <p style={{ fontSize: 11, color: KZ.textSec, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{g.task}</p>
                  </div>
                  <GradeBadge grade={g.grade} />
                </div>
                <MiniProgress value={g.grade} />
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Schedule */}
      <Card style={{ padding: 20 }}>
        <SectionTitle>Розклад занять — поточний тиждень</SectionTitle>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr>
                <th style={{ width: 110, textAlign: "left", padding: "0 12px 10px 0", fontSize: 11, fontWeight: 600, color: KZ.textSec, textTransform: "uppercase", letterSpacing: "0.06em" }}>Час</th>
                {DAYS.map(d => (
                  <th key={d} style={{ textAlign: "center", padding: "0 8px 10px", fontSize: 11, fontWeight: 600, color: KZ.textSec, textTransform: "uppercase", letterSpacing: "0.06em" }}>{d}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SCHEDULE.map((row, ri) => (
                <tr key={ri} style={{ borderTop: `1px solid ${KZ.border}` }}>
                  <td style={{ padding: "10px 12px 10px 0", fontFamily: "ui-monospace, monospace", fontSize: 11, color: KZ.textSec, whiteSpace: "nowrap" }}>{row.time}</td>
                  {DAY_KEYS.map(dk => {
                    const cell = (row as Record<string, string>)[dk];
                    return (
                      <td key={dk} style={{ padding: "8px", textAlign: "center" }}>
                        {cell
                          ? <span style={{ display: "inline-block", padding: "3px 10px", backgroundColor: KZ.accentLight, color: KZ.accentHover, borderRadius: KZ.radiusSm, fontSize: 12, fontWeight: 500 }}>{cell}</span>
                          : <span style={{ color: KZ.border }}>—</span>}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function GradesPage() {
  const [selected, setSelected] = useState(SUBJECTS[0]);
  const grades = GRADES_DATA[selected];
  const avg = Math.round(grades.reduce((s, g) => s + g.grade, 0) / grades.length);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 16 }}>
      {/* Grade table */}
      <Card>
        <div style={{ padding: "16px 20px", borderBottom: `1px solid ${KZ.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ fontWeight: 600, color: KZ.text, fontSize: 15 }}>Список оцінок</p>
          <span style={{ fontSize: 12, color: KZ.textSec }}>{selected}</span>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ backgroundColor: KZ.surface }}>
              {["Завдання", "Дата", "Оцінка"].map((h, i) => (
                <th key={h} style={{ padding: "10px 20px", textAlign: i === 0 ? "left" : "center", fontSize: 11, fontWeight: 600, color: KZ.textSec, textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {grades.map((g, i) => (
              <tr key={i} style={{ borderTop: `1px solid ${KZ.border}` }}>
                <td style={{ padding: "11px 20px", color: KZ.text }}>{g.task}</td>
                <td style={{ padding: "11px 20px", textAlign: "center", color: KZ.textSec, fontFamily: "ui-monospace, monospace", fontSize: 12 }}>{g.date}</td>
                <td style={{ padding: "11px 20px", textAlign: "center" }}><GradeBadge grade={g.grade} /></td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr style={{ borderTop: `2px solid ${KZ.borderStrong}`, backgroundColor: KZ.surface }}>
              <td colSpan={2} style={{ padding: "12px 20px", fontWeight: 600, color: KZ.text, fontSize: 13 }}>Підсумкова оцінка з вибраної дисципліни</td>
              <td style={{ padding: "12px 20px", textAlign: "center" }}><GradeBadge grade={avg} /></td>
            </tr>
          </tfoot>
        </table>
      </Card>

      {/* Right col */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <Card style={{ padding: 16 }}>
          <SectionTitle>Студент</SectionTitle>
          <p style={{ fontWeight: 600, fontSize: 14, color: KZ.text }}>{STUDENT.name}</p>
          <p style={{ fontSize: 12, color: KZ.textSec, marginTop: 2 }}>{STUDENT.group} · {STUDENT.faculty}</p>
        </Card>

        <Card style={{ padding: 16 }}>
          <SectionTitle>Дисципліна</SectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {SUBJECTS.map(s => {
              const active = s === selected;
              return (
                <button
                  key={s}
                  onClick={() => setSelected(s)}
                  style={{
                    textAlign: "left",
                    padding: "8px 12px",
                    borderRadius: KZ.radius,
                    border: active ? `1px solid ${KZ.accent}33` : "1px solid transparent",
                    backgroundColor: active ? KZ.accentLight : "transparent",
                    color: active ? KZ.accentHover : KZ.text,
                    fontWeight: active ? 600 : 400,
                    fontSize: 13,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    transition: "all 150ms cubic-bezier(0.4,0,0.2,1)",
                  }}
                >
                  {s}
                </button>
              );
            })}
          </div>
        </Card>

        {/* Mini bar chart */}
        <Card style={{ padding: 16 }}>
          <SectionTitle>Динаміка оцінок</SectionTitle>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 72 }}>
            {grades.map((g, i) => {
              const gi = gradeInfo(g.grade);
              return (
                <div key={i} title={`${g.task}: ${g.grade}`} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", cursor: "default" }}>
                  <div style={{ width: "100%", height: `${g.grade}%`, backgroundColor: gi.color, borderRadius: "3px 3px 0 0", transition: "opacity 0.15s" }} />
                </div>
              );
            })}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
            <span style={{ fontSize: 11, color: KZ.textSec }}>Середній: <b style={{ color: KZ.text }}>{avg}</b></span>
            <GradeBadge grade={avg} />
          </div>
        </Card>
      </div>
    </div>
  );
}

function InfoPage() {
  const [payConfirm, setPayConfirm] = useState(false);

  const gpa = (FINAL_GRADES.reduce((s, g) => s + g.grade, 0) / FINAL_GRADES.length).toFixed(1);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Row 1: student card + final grades */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 16 }}>
        {/* Student info */}
        <Card style={{ padding: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, paddingBottom: 20, borderBottom: `1px solid ${KZ.border}`, marginBottom: 20 }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", backgroundColor: KZ.accentLight, border: `2px solid ${KZ.accent}33`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700, color: KZ.accent, flexShrink: 0 }}>
              ОШ
            </div>
            <div>
              <h2 style={{ fontSize: 17, fontWeight: 700, color: KZ.text }}>{STUDENT.name}</h2>
              <p style={{ fontSize: 13, color: KZ.textSec, marginTop: 2 }}>Студент · {STUDENT.faculty}</p>
            </div>
          </div>
          <SectionTitle>Інформація про студента</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px 24px" }}>
            {[
              ["Університет",               STUDENT.university],
              ["Факультет",                 STUDENT.faculty],
              ["Спеціальність",             STUDENT.specialty],
              ["Ступінь навчання",          STUDENT.degree],
              ["Група",                     STUDENT.group],
              ["Тип навчання",              STUDENT.studyType],
              ["Тип оплати",                STUDENT.paymentType],
              ["Наказ про зарахування",     STUDENT.enrollmentOrder],
              ["Тривалість навчання",       STUDENT.duration],
              ["Дата закінчення навчання",  STUDENT.endDate],
            ].map(([label, value], idx) => (
              <div key={label} style={idx === 0 || idx === 1 ? { gridColumn: "1 / -1" } : {}}>
                <p style={{ fontSize: 11, color: KZ.textSec, marginBottom: 2, textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 500 }}>{label}</p>
                <p style={{ fontSize: 13, fontWeight: 500, color: KZ.text }}>{value}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Final grades */}
        <Card style={{ overflow: "hidden" }}>
          <div style={{ padding: "16px 20px", borderBottom: `1px solid ${KZ.border}` }}>
            <p style={{ fontWeight: 600, fontSize: 15, color: KZ.text }}>Підсумкові оцінки</p>
          </div>
          <div>
            {FINAL_GRADES.map((g, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 20px", borderTop: i > 0 ? `1px solid ${KZ.border}` : "none" }}>
                <div style={{ flex: 1, minWidth: 0, paddingRight: 12 }}>
                  <p style={{ fontSize: 13, color: KZ.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{g.subject}</p>
                  <MiniProgress value={g.grade} />
                </div>
                <GradeBadge grade={g.grade} />
              </div>
            ))}
          </div>
          <div style={{ padding: "14px 20px", backgroundColor: KZ.surface, borderTop: `2px solid ${KZ.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p style={{ fontSize: 12, color: KZ.textSec }}>Середній бал (GPA)</p>
            <span style={{ fontSize: 18, fontWeight: 700, color: KZ.accent }}>{gpa}</span>
          </div>
        </Card>
      </div>

      {/* Row 2: Payment requisites */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 16 }}>
        {/* Requisites */}
        <Card style={{ padding: 24 }}>
          <SectionTitle>Реквізити оплати навчання</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 24px" }}>
            {[
              ["Отримувач",          PAYMENT_REQUISITES.recipient],
              ["Код ЄДРПОУ",         PAYMENT_REQUISITES.edrpou],
              ["Банк",               PAYMENT_REQUISITES.bank],
              ["МФО",                PAYMENT_REQUISITES.mfo],
              ["IBAN",               PAYMENT_REQUISITES.iban],
              ["Призначення платежу",PAYMENT_REQUISITES.purpose],
              ["Сума",               PAYMENT_REQUISITES.amount],
              ["Термін оплати",      PAYMENT_REQUISITES.deadline],
            ].map(([label, value], idx) => (
              <div key={label} style={idx === 0 || idx === 4 || idx === 5 ? { gridColumn: "1 / -1" } : {}}>
                <p style={{ fontSize: 11, color: KZ.textSec, marginBottom: 3, textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 500 }}>{label}</p>
                <p style={{ fontSize: 13, fontWeight: 500, color: KZ.text, wordBreak: "break-all" }}>{value}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 20, paddingTop: 20, borderTop: `1px solid ${KZ.border}` }}>
            <PrimaryButton onClick={() => setPayConfirm(true)}>
              → Онлайн оплата
            </PrimaryButton>
            {payConfirm && (
              <div style={{ marginTop: 12, padding: "10px 14px", backgroundColor: KZ.warningLight, border: `1px solid #fde68a`, borderRadius: KZ.radius, fontSize: 13, color: "#92400e", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>Перенаправлення на платіжний шлюз… (демо)</span>
                <button onClick={() => setPayConfirm(false)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, color: KZ.warning, fontWeight: 600, fontFamily: "inherit" }}>✕ Скасувати</button>
              </div>
            )}
          </div>
        </Card>

        {/* Payment history */}
        <Card style={{ overflow: "hidden", alignSelf: "start" }}>
          <div style={{ padding: "16px 20px", borderBottom: `1px solid ${KZ.border}` }}>
            <p style={{ fontWeight: 600, fontSize: 15, color: KZ.text }}>Історія оплат</p>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ backgroundColor: KZ.surface }}>
                {["Дата", "Сума, ₴", "Статус"].map((h, i) => (
                  <th key={h} style={{ padding: "9px 16px", textAlign: i === 1 ? "right" : "center", fontSize: 11, fontWeight: 600, color: KZ.textSec, textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PAYMENT_HISTORY.map((p, i) => (
                <tr key={i} style={{ borderTop: `1px solid ${KZ.border}` }}>
                  <td style={{ padding: "10px 16px", textAlign: "center", fontFamily: "ui-monospace, monospace", fontSize: 12, color: KZ.textSec }}>{p.date}</td>
                  <td style={{ padding: "10px 16px", textAlign: "right", fontWeight: 500, color: KZ.text }}>{p.amount}</td>
                  <td style={{ padding: "10px 16px", textAlign: "center" }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 8px", backgroundColor: KZ.successLight, border: `1px solid ${KZ.success}33`, borderRadius: KZ.radiusFull, fontSize: 11, fontWeight: 500, color: "#166534" }}>
                      <span style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: KZ.success }} />
                      Оплачено
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ padding: "12px 16px", backgroundColor: KZ.surface, borderTop: `1px solid ${KZ.border}`, display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: 12, color: KZ.textSec }}>Загалом сплачено</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: KZ.text }}>48 600,00 ₴</span>
          </div>
        </Card>
      </div>
    </div>
  );
}

// ── SHELL ───────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [notifCount, setNotifCount] = useState(3);
  const [hovered, setHovered] = useState<string | null>(null);

  const titles: Record<Page, string> = {
    home:   "Головна",
    grades: "Оцінки",
    info:   "Загальна інформація про студента",
  };

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif', fontSize: 14, color: KZ.text, backgroundColor: KZ.surface }}>
      {/* Top bar */}
      <header style={{ height: 48, backgroundColor: KZ.sidebar, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", flexShrink: 0, boxShadow: "0 1px 0 rgba(255,255,255,0.05)" }}>
        <button
          onClick={() => setPage("home")}
          style={{ padding: "5px 14px", borderRadius: KZ.radius, border: "none", backgroundColor: page === "home" ? KZ.accent : "transparent", color: "#fff", fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "inherit", transition: "background-color 150ms ease" }}
        >
          Е-Деканат
        </button>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={() => setNotifCount(0)}
            style={{ position: "relative", padding: "5px 14px", borderRadius: KZ.radiusFull, border: "1px solid rgba(255,255,255,0.12)", backgroundColor: "rgba(255,255,255,0.06)", color: "#ced4da", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}
          >
            Повідомлення
            {notifCount > 0 && (
              <span style={{ position: "absolute", top: -4, right: -4, width: 16, height: 16, backgroundColor: KZ.error, borderRadius: "50%", fontSize: 10, fontWeight: 700, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {notifCount}
              </span>
            )}
          </button>
          <button style={{ padding: "5px 14px", borderRadius: KZ.radiusFull, border: "1px solid rgba(255,255,255,0.12)", backgroundColor: "rgba(255,255,255,0.06)", color: "#ced4da", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
            Вихід
          </button>
        </div>
      </header>

      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
        {/* Sidebar */}
        <aside style={{ width: 208, backgroundColor: KZ.sidebar, display: "flex", flexDirection: "column", flexShrink: 0, borderRight: "1px solid rgba(255,255,255,0.04)" }}>
          <nav style={{ flex: 1, padding: "12px 10px", display: "flex", flexDirection: "column", gap: 2 }}>
            {NAV.map(item => {
              const active = page === item.id;
              const hover = hovered === item.id && !active;
              return (
                <button
                  key={item.id}
                  onClick={() => setPage(item.id)}
                  onMouseEnter={() => setHovered(item.id)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "9px 12px",
                    borderRadius: KZ.radius,
                    border: "none",
                    backgroundColor: active ? KZ.accent : hover ? KZ.sidebarHover : "transparent",
                    color: active ? "#fff" : "#adb5bd",
                    fontWeight: active ? 600 : 400,
                    fontSize: 13,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    textAlign: "left",
                    transition: "background-color 150ms cubic-bezier(0.4,0,0.2,1), color 150ms ease",
                  }}
                >
                  <span style={{ fontSize: 14, opacity: 0.7 }}>{item.icon}</span>
                  {item.label}
                </button>
              );
            })}
          </nav>
          <div style={{ padding: "10px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <a
              href="https://dl.karazin.ua"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "block", textAlign: "center", padding: "8px 10px", borderRadius: KZ.radius, backgroundColor: KZ.sidebarHover, color: "#868e96", fontSize: 12, textDecoration: "none", transition: "background-color 150ms ease" }}
            >
              🔗 Mirror Moodle
            </a>
          </div>
        </aside>

        {/* Main */}
        <main style={{ flex: 1, minWidth: 0, overflowY: "auto", padding: 20 }}>
          <div style={{ maxWidth: 960, margin: "0 auto" }}>
            <div style={{ marginBottom: 16 }}>
              <h1 style={{ fontSize: 20, fontWeight: 700, color: KZ.text }}>{titles[page]}</h1>
              <p style={{ fontSize: 12, color: KZ.textSec, marginTop: 2 }}>
                {new Date().toLocaleDateString("uk-UA", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
              </p>
            </div>
            {page === "home"   && <HomePage />}
            {page === "grades" && <GradesPage />}
            {page === "info"   && <InfoPage />}
          </div>
        </main>
      </div>
    </div>
  );
}
