import React, { useState } from "react"
import { Header } from "./components/layout/Header"
import { Sidebar } from "./components/layout/Sidebar"
import { MobileNav } from "./components/layout/MobileNav"
import { ToastContainer } from "./components/ui/Toast"

// Feature components
import { WelcomeBanner } from "./components/dashboard/WelcomeBanner"
import { DeadlinesWidget } from "./components/dashboard/DeadlinesWidget"
import { RecentGradesWidget } from "./components/dashboard/RecentGradesWidget"
import { TodayScheduleWidget } from "./components/dashboard/TodayScheduleWidget"

import { DisciplineSelector } from "./components/grades/DisciplineSelector"
import { GradesTable } from "./components/grades/GradesTable"
import { GradeDynamicChart } from "./components/grades/GradeDynamicChart"

import { ScheduleWeekMatrix } from "./components/schedule/ScheduleWeekMatrix"

import { RequisitesCard } from "./components/finances/RequisitesCard"
import { QrPaymentModal } from "./components/finances/QrPaymentModal"
import { PaymentHistoryTable } from "./components/finances/PaymentHistoryTable"
import { TuitionBalanceCard } from "./components/finances/TuitionBalanceCard"

import { StudentAcademicCard } from "./components/profile/StudentAcademicCard"
import { TranscriptTable } from "./components/profile/TranscriptTable"
import { CertificateOrderModal } from "./components/profile/CertificateOrderModal"

// Mock data & Hooks
import { MOCK_STUDENT } from "./data/mockStudent"
import { MOCK_DISCIPLINES, MOCK_TRANSCRIPT } from "./data/mockGrades"
import {
  MOCK_REQUISITES,
  MOCK_PAYMENTS,
  MOCK_CONTRACT,
} from "./data/mockFinances"
import { MOCK_SCHEDULE } from "./data/mockSchedule"

import { useTheme } from "./hooks/useTheme"
import { useClipboard } from "./hooks/useClipboard"
import { useToast } from "./hooks/useToast"

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("dashboard")
  const [selectedDisciplineId, setSelectedDisciplineId] = useState<string>(
    MOCK_DISCIPLINES[0].id,
  )
  const [isQrModalOpen, setIsQrModalOpen] = useState(false)
  const [isCertModalOpen, setIsCertModalOpen] = useState(false)

  const { theme, toggleTheme, isDark } = useTheme()
  const { copy, isCopied } = useClipboard()
  const { toasts, addToast, removeToast } = useToast()

  const currentDiscipline =
    MOCK_DISCIPLINES.find((d) => d.id === selectedDisciplineId) ||
    MOCK_DISCIPLINES[0]

  const handleCopy = async (text: string, label: string) => {
    const success = await copy(text)
    if (success) {
      addToast({
        type: "success",
        title: "Успішно скопійовано",
        message: `${label} додано в буфер обміну.`,
      })
    }
  }

  const getPageTitle = () => {
    switch (activeTab) {
      case "dashboard":
        return "Головна панель (Дашборд)"
      case "grades":
        return "Журнал оцінок та аналітика успішності"
      case "schedule":
        return "Розклад навчальних занять"
      case "finances":
        return "Оплата навчання та банківські реквізити"
      case "profile":
        return "Профіль студента та електронний деканат"
      default:
        return "UniHub Студентський кабінет"
    }
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[var(--kz-bg)] text-[var(--kz-text-primary)]">
      {/* Top Header */}
      <Header
        student={MOCK_STUDENT}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isDark={isDark}
        onToggleTheme={toggleTheme}
        unreadNotificationsCount={3}
      />

      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Left Sidebar */}
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Main dynamic workspace canvas */}
        <main className="flex-1 min-w-0 overflow-y-auto p-4 sm:p-6 pb-20 md:pb-6">
          <div className="max-w-6xl mx-auto space-y-5">
            {/* Breadcrumbs & Title */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-[var(--kz-text-primary)] tracking-tight">
                  {getPageTitle()}
                </h1>
                <p className="text-xs text-[var(--kz-text-secondary)] mt-0.5">
                  Харківський національний університет імені В. Н. Каразіна ·
                  Єдиний цифровий деканат
                </p>
              </div>
            </div>

            {/* TAB 1: DASHBOARD */}
            {activeTab === "dashboard" && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <WelcomeBanner student={MOCK_STUDENT} />

                {/* 3 Widgets Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <DeadlinesWidget />
                  <TodayScheduleWidget />
                  <RecentGradesWidget
                    onOpenGrades={() => setActiveTab("grades")}
                  />
                </div>

                {/* Week Schedule Overview */}
                <div className="space-y-2">
                  <h3 className="text-xs font-bold text-[var(--kz-text-muted)] uppercase tracking-wider">
                    Розклад на тиждень
                  </h3>
                  <ScheduleWeekMatrix schedule={MOCK_SCHEDULE} />
                </div>
              </div>
            )}

            {/* TAB 2: GRADES */}
            {activeTab === "grades" && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
                  {/* Left disciplines selector */}
                  <div className="lg:col-span-1">
                    <DisciplineSelector
                      disciplines={MOCK_DISCIPLINES}
                      selectedId={selectedDisciplineId}
                      onSelect={setSelectedDisciplineId}
                    />
                  </div>

                  {/* Right grades details */}
                  <div className="lg:col-span-3 space-y-4">
                    <div className="p-4 rounded-[var(--kz-radius-lg)] bg-[var(--kz-surface)] border border-[var(--kz-border)] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-mono font-bold text-[var(--kz-brand-primary)] dark:text-[#60A5FA] bg-[var(--kz-brand-light)] dark:bg-[rgba(0,82,204,0.15)] px-2 py-0.5 rounded">
                          {currentDiscipline.code}
                        </span>
                        <h2 className="text-base font-bold text-[var(--kz-text-primary)] mt-1">
                          {currentDiscipline.name}
                        </h2>
                        <p className="text-xs text-[var(--kz-text-secondary)] mt-0.5">
                          {currentDiscipline.department} ·{" "}
                          {currentDiscipline.instructor}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-[var(--kz-text-secondary)]">
                          Тип контролю:
                        </span>
                        <span className="text-xs font-bold text-[var(--kz-text-primary)] bg-[var(--kz-surface-hover)] px-2.5 py-1 rounded-md border border-[var(--kz-border)]">
                          {currentDiscipline.controlType} (
                          {currentDiscipline.credits} ЄКТС)
                        </span>
                      </div>
                    </div>

                    {/* Chart */}
                    <GradeDynamicChart discipline={currentDiscipline} />

                    {/* Tasks Table */}
                    <div className="rounded-[var(--kz-radius-lg)] bg-[var(--kz-surface)] border border-[var(--kz-border)] shadow-xs overflow-hidden">
                      <GradesTable
                        tasks={currentDiscipline.tasks}
                        disciplineName={currentDiscipline.name}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: SCHEDULE */}
            {activeTab === "schedule" && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <ScheduleWeekMatrix schedule={MOCK_SCHEDULE} />
              </div>
            )}

            {/* TAB 4: FINANCES */}
            {activeTab === "finances" && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                  <div className="lg:col-span-2 space-y-5">
                    <RequisitesCard
                      requisites={MOCK_REQUISITES}
                      onOpenQr={() => setIsQrModalOpen(true)}
                      onCopy={handleCopy}
                      isCopied={isCopied}
                    />
                    <PaymentHistoryTable payments={MOCK_PAYMENTS} />
                  </div>

                  <div className="lg:col-span-1 space-y-5">
                    <TuitionBalanceCard contract={MOCK_CONTRACT} />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: PROFILE & E-DEAN */}
            {activeTab === "profile" && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <StudentAcademicCard
                  student={MOCK_STUDENT}
                  onOrderCertificate={() => setIsCertModalOpen(true)}
                />
                <TranscriptTable items={MOCK_TRANSCRIPT} />
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Modals */}
      <QrPaymentModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
        requisites={MOCK_REQUISITES}
        amount={MOCK_REQUISITES.standardContractAmount}
        onCopy={handleCopy}
        isCopied={isCopied}
      />

      <CertificateOrderModal
        isOpen={isCertModalOpen}
        onClose={() => setIsCertModalOpen(false)}
        student={MOCK_STUDENT}
      />

      {/* Toast notifications container */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  )
}
