import React, { useState } from 'react';
import clsx from 'clsx';
import { Award, CreditCard, ArrowDownRight, ArrowUpRight, ShieldCheck, Sparkles } from 'lucide-react';
import { ScholarshipCard } from './ScholarshipCard';
import { StudentBankCard } from './StudentBankCard';
import { ScholarshipHistoryTable } from './ScholarshipHistoryTable';
import { RequisitesCard } from './RequisitesCard';
import { TuitionBalanceCard } from './TuitionBalanceCard';
import { PaymentHistoryTable } from './PaymentHistoryTable';
import { QrPaymentModal } from './QrPaymentModal';
import {
  MOCK_REQUISITES,
  MOCK_CONTRACT,
  MOCK_PAYMENTS,
  MOCK_STUDENT_BANK_ACCOUNT,
  MOCK_SCHOLARSHIP,
  MOCK_SCHOLARSHIP_PAYMENTS,
} from '../../data/mockFinances';
import { PaymentFinanceType } from '../../types/finances';

export interface FinancesViewProps {
  initialMode?: PaymentFinanceType;
  onCopy: (text: string, label: string) => void;
  isCopied: (text: string) => boolean;
}

export const FinancesView: React.FC<FinancesViewProps> = ({
  initialMode = 'budget',
  onCopy,
  isCopied,
}) => {
  const [financeMode, setFinanceMode] = useState<PaymentFinanceType>(initialMode);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* Interactive Mode Switcher (Бюджет vs Контракт) */}
      <div className="p-2 rounded-[var(--kz-radius-lg)] bg-[var(--kz-surface)] border border-[var(--kz-border)] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[var(--kz-brand-light)] text-[var(--kz-brand-primary)] dark:text-[#60A5FA] flex items-center justify-center font-bold">
            💰
          </div>
          <div>
            <h3 className="text-xs font-bold text-[var(--kz-text-primary)] uppercase tracking-wider">
              Фінансовий модуль кабінету
            </h3>
            <p className="text-[11px] text-[var(--kz-text-secondary)]">
              Оберіть форму фінансування для перегляду відповідних реквізитів та виплат
            </p>
          </div>
        </div>

        {/* Dual Tab Toggle */}
        <div className="grid grid-cols-2 p-1 rounded-xl bg-[var(--kz-surface-hover)] border border-[var(--kz-border)] gap-1 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setFinanceMode('budget')}
            className={clsx(
              'flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer select-none',
              financeMode === 'budget'
                ? 'bg-[var(--kz-brand-primary)] text-white shadow-xs'
                : 'text-[var(--kz-text-secondary)] hover:text-[var(--kz-text-primary)]'
            )}
          >
            <ArrowDownRight size={14} />
            <span>Бюджет (Стипендія)</span>
          </button>

          <button
            type="button"
            onClick={() => setFinanceMode('contract')}
            className={clsx(
              'flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer select-none',
              financeMode === 'contract'
                ? 'bg-[var(--kz-brand-primary)] text-white shadow-xs'
                : 'text-[var(--kz-text-secondary)] hover:text-[var(--kz-text-primary)]'
            )}
          >
            <ArrowUpRight size={14} />
            <span>Контракт (Оплата)</span>
          </button>
        </div>
      </div>

      {/* ── FLOW 1: БЮДЖЕТ (Державне замовлення) ── */}
      {financeMode === 'budget' && (
        <div className="space-y-5 animate-in fade-in duration-200">
          <div className="p-3 bg-[var(--kz-success-bg)] border border-[var(--kz-success-border)] rounded-[var(--kz-radius-md)] flex items-center justify-between text-xs text-[var(--kz-success-text)]">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="shrink-0 text-[var(--kz-success)]" />
              <span><b>Державне замовлення:</b> Студент навчається за кошти держбюджету та отримує щомісячну стипендію на свій особистий рахунок IBAN.</span>
            </div>
            <span className="font-mono font-bold shrink-0 hidden md:inline-block">2 910 ₴ / місяць</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2 space-y-5">
              <ScholarshipCard scholarship={MOCK_SCHOLARSHIP} />
              <ScholarshipHistoryTable payments={MOCK_SCHOLARSHIP_PAYMENTS} />
            </div>

            <div className="lg:col-span-1 space-y-5">
              <StudentBankCard
                bankAccount={MOCK_STUDENT_BANK_ACCOUNT}
                onCopy={onCopy}
                isCopied={isCopied}
              />
            </div>
          </div>
        </div>
      )}

      {/* ── FLOW 2: КОНТРАКТ (Платне навчання) ── */}
      {financeMode === 'contract' && (
        <div className="space-y-5 animate-in fade-in duration-200">
          <div className="p-3 bg-[var(--kz-info-bg)] border border-[var(--kz-info-border)] rounded-[var(--kz-radius-md)] flex items-center justify-between text-xs text-[var(--kz-info-text)]">
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="shrink-0 text-blue-500" />
              <span><b>Контрактна форма:</b> Оплата здійснюється на казначейський рахунок ХНУ імені В. Н. Каразіна за договором №24-122/КС-014.</span>
            </div>
            <span className="font-mono font-bold shrink-0 hidden md:inline-block">16 500 ₴ / семестр</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2 space-y-5">
              <RequisitesCard
                requisites={MOCK_REQUISITES}
                onOpenQr={() => setIsQrModalOpen(true)}
                onCopy={onCopy}
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

      {/* QR Modal for Contract flow */}
      <QrPaymentModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
        requisites={MOCK_REQUISITES}
        amount={MOCK_REQUISITES.standardContractAmount}
        onCopy={onCopy}
        isCopied={isCopied}
      />
    </div>
  );
};