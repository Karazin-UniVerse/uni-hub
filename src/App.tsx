import React, { useState } from 'react';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { MobileNav } from './components/layout/MobileNav';
import { ToastContainer } from './components/ui/Toast';

// Feature components
import { WelcomeBanner } from './components/dashboard/WelcomeBanner';
import { DeadlinesWidget } from './components/dashboard/DeadlinesWidget';
import { RecentGradesWidget } from './components/dashboard/RecentGradesWidget';
import { TodayScheduleWidget } from './components/dashboard/TodayScheduleWidget';

import { DisciplineSelector } from './components/grades/DisciplineSelector';
import { GradesTable } from './components/grades/GradesTable';
import { GradeDynamicChart } from './components/grades/GradeDynamicChart';

import { ScheduleWeekMatrix } from './components/schedule/ScheduleWeekMatrix';
import { FinancesView } from './components/finances/FinancesView';

import { StudentAcademicCard } from './components/profile/StudentAcademicCard';
import { TranscriptTable } from './components/profile/TranscriptTable';
import { CertificateOrderModal } from './components/profile/CertificateOrderModal';
import { LoginModal } from './components/auth/LoginModal';

// Mock data & Hooks & Context
import { MOCK_STUDENT } from './data/mockStudent';
import { MOCK_DISCIPLINES, MOCK_TRANSCRIPT } from './data/mockGrades';
import { MOCK_SCHEDULE } from './data/mockSchedule';

import { useClipboard } from './hooks/useClipboard';
import { useToast } from './hooks/useToast';
import { AuthProvider, useAuth } from './context/AuthContext';

function UniHubMain() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [selectedDisciplineId, setSelectedDisciplineId] = useState<string>(
    MOCK_DISCIPLINES[0].id
  );
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const { user, isLoggedIn, courses } = useAuth();
  const { copy, isCopied } = useClipboard();
  const { toasts, addToast, removeToast } = useToast();

  const currentStudent = {
    ...MOCK_STUDENT,
    name: user?.name || MOCK_STUDENT.name,
    email: user?.email || MOCK_STUDENT.email,
  };

  // Convert live Moodle courses to disciplines if logged in and courses exist
  const activeDisciplines =
    isLoggedIn && courses.length > 0
      ? courses.map((c, idx) => ({
          id: String(c.id),
          name: c.fullname,
          code: c.shortname || `CS-${c.id}`,
          department: 'Кафедра комп’ютерних наук',
          instructor: 'Викладач кафедри',
          credits: 4,
          controlType: 'Іспит' as const,
          currentGrade: 85 + (idx % 10),
          maxGrade: 100,
          averageGrade: 88,
          tasks: MOCK_DISCIPLINES[0].tasks,
        }))
      : MOCK_DISCIPLINES;

  const currentDiscipline =
    activeDisciplines.find((d) => d.id === selectedDisciplineId) ||
    activeDisciplines[0];

  const handleCopy = async (text: string, label: string) => {
    const success = await copy(text);
    if (success) {
      addToast({
        type: 'success',
        title: 'Успішно скопійовано',
        message: `${label} додано в буфер обміну.`,
      });
    }
  };

  const getPageTitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'Головна панель (Дашборд)';
      case 'grades':
        return 'Журнал оцінок та аналітика успішності';
      case 'schedule':
        return 'Розклад навчальних занять';
      case 'finances':
        return 'Фінанси, стипендія та реквізити';
      case 'profile':
        return 'Профіль студента та електронний деканат';
      default:
        return 'UniHub Студентський кабінет';
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[var(--kz-bg)] text-[var(--kz-text-primary)] transition-colors">
      {/* Top Header */}
      <Header
        student={currentStudent}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenLogin={() => setIsLoginModalOpen(true)}
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
            {activeTab === 'dashboard' && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <WelcomeBanner student={currentStudent} />

                {/* 3 Widgets Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <DeadlinesWidget />
                  <TodayScheduleWidget />
                  <RecentGradesWidget
                    onOpenGrades={() => setActiveTab('grades')}
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
            {activeTab === 'grades' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
                  {/* Left disciplines selector */}
                  <div className="lg:col-span-1">
                    <DisciplineSelector
                      disciplines={activeDisciplines}
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
                          {currentDiscipline.department} ·{' '}
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
            {activeTab === 'schedule' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <ScheduleWeekMatrix schedule={MOCK_SCHEDULE} />
              </div>
            )}

            {/* TAB 4: FINANCES (Бюджет + Контракт) */}
            {activeTab === 'finances' && (
              <FinancesView
                initialMode="budget"
                onCopy={handleCopy}
                isCopied={isCopied}
              />
            )}

            {/* TAB 5: PROFILE & E-DEAN */}
            {activeTab === 'profile' && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <StudentAcademicCard
                  student={currentStudent}
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
      <CertificateOrderModal
        isOpen={isCertModalOpen}
        onClose={() => setIsCertModalOpen(false)}
        student={currentStudent}
      />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />

      {/* Toast notifications container */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <UniHubMain />
    </AuthProvider>
  );
}
