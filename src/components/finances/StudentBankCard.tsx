import React, { useState } from 'react';
import { CreditCard, Copy, Check, ShieldCheck, Edit3, CheckCircle2 } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { StudentBankAccount } from '../../types/finances';
import { fireCelebrationConfetti } from '../../utils/confetti';

export interface StudentBankCardProps {
  bankAccount: StudentBankAccount;
  onCopy: (text: string, label: string) => void;
  isCopied: (text: string) => boolean;
}

export const StudentBankCard: React.FC<StudentBankCardProps> = ({
  bankAccount,
  onCopy,
  isCopied,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newIban, setNewIban] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    fireCelebrationConfetti();
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setSubmitted(false);
    setNewIban('');
  };

  return (
    <>
      <Card className="space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[var(--kz-border)]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[var(--kz-brand-primary)]/10 text-[var(--kz-brand-primary)] flex items-center justify-center font-bold">
              <CreditCard size={18} />
            </div>
            <div>
              <h3 className="text-xs font-bold text-[var(--kz-text-primary)] uppercase tracking-wider">
                Студентські реквізити для виплат
              </h3>
              <p className="text-[11px] text-[var(--kz-text-secondary)]">Рахунок, на який бухгалтерія ХНУ перераховує кошти</p>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            icon={<Edit3 size={13} />}
            onClick={() => setIsModalOpen(true)}
          >
            Змінити рахунок
          </Button>
        </div>

        {/* Bank Card representation */}
        <div className="p-4 rounded-[var(--kz-radius-lg)] bg-gradient-to-r from-[var(--kz-sidebar-bg)] to-[#1E2538] text-white space-y-3 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-white/70 uppercase tracking-wider">
              {bankAccount.bankName}
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
              <CheckCircle2 size={11} />
              <span>{bankAccount.status}</span>
            </span>
          </div>

          <div>
            <p className="text-[10px] text-white/50 uppercase tracking-widest">Номер рахунку (IBAN)</p>
            <div className="flex items-center justify-between gap-2 mt-0.5">
              <p className="font-mono text-sm sm:text-base font-bold text-white tracking-wider break-all">
                {bankAccount.iban}
              </p>
              <button
                onClick={() => onCopy(bankAccount.iban, 'Ваш рахунок IBAN')}
                className="p-1.5 rounded-md bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer shrink-0"
                title="Скопіювати IBAN"
              >
                {isCopied(bankAccount.iban) ? (
                  <Check size={14} className="text-emerald-400" />
                ) : (
                  <Copy size={14} />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
            <div>
              <p className="text-[9px] text-white/50 uppercase">Власник картки</p>
              <p className="font-semibold text-white/90">{bankAccount.accountHolder}</p>
            </div>
            <div className="text-right">
              <p className="text-[9px] text-white/50 uppercase">Маска картки</p>
              <p className="font-mono text-white/90">{bankAccount.cardNumberMasked}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Modal: Change IBAN */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleClose}
        title={submitted ? 'Заяву подано до бухгалтерії' : 'Зміна банківських реквізитів для стипендії'}
        subtitle={submitted ? 'Дані будуть перевірені бухгалтером протягом 1 робочого дня' : 'Вкажіть новий IBAN рахунок, оформлений на ваше ім’я'}
        maxWidth="md"
      >
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[var(--kz-text-secondary)] uppercase tracking-wider mb-1">
                Новий номер рахунку (IBAN)
              </label>
              <input
                type="text"
                required
                placeholder="UA68305299000002620..."
                value={newIban}
                onChange={(e) => setNewIban(e.target.value.toUpperCase())}
                className="w-full p-2.5 rounded-[var(--kz-radius-md)] bg-[var(--kz-surface-hover)] border border-[var(--kz-border)] text-xs font-mono text-[var(--kz-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--kz-brand-primary)]"
              />
              <p className="text-[10px] text-[var(--kz-text-muted)] mt-1">
                29 символів, починається з «UA». Рахунок має належати студенту (не батькам).
              </p>
            </div>

            <div className="p-3 bg-[var(--kz-info-bg)] border border-[var(--kz-info-border)] rounded-[var(--kz-radius-md)] flex items-start gap-2 text-xs text-[var(--kz-info-text)]">
              <ShieldCheck size={16} className="shrink-0 mt-0.5" />
              <p>
                Бухгалтерія автоматично оновить реєстр виплат у казначействі до наступного платіжного циклу (25-го числа).
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-[var(--kz-border)]">
              <Button variant="secondary" size="md" type="button" onClick={handleClose}>
                Скасувати
              </Button>
              <Button variant="primary" size="md" type="submit">
                Надіслати заяву
              </Button>
            </div>
          </form>
        ) : (
          <div className="text-center py-4 space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 mx-auto flex items-center justify-center">
              <CheckCircle2 size={24} />
            </div>
            <h4 className="text-sm font-bold text-[var(--kz-text-primary)]">
              Заяву успішно зареєстровано в системі
            </h4>
            <p className="text-xs text-[var(--kz-text-secondary)] max-w-sm mx-auto">
              Новий IBAN <b>{newIban}</b> прийнято в обробку під номером заявки <b>#REQ-IBAN-2024-419</b>.
            </p>
            <div className="pt-2">
              <Button variant="primary" size="md" onClick={handleClose}>
                Зрозуміло
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};