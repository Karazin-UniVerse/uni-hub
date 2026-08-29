export type PaymentFinanceType = 'budget' | 'contract';

export interface UniversityRequisites {
  recipient: string;
  edrpou: string;
  bank: string;
  mfo: string;
  iban: string;
  purposeTemplate: string;
  standardContractAmount: string;
  currency: string;
}

export interface PaymentTransaction {
  id: string;
  date: string;
  amount: number;
  amountFormatted: string;
  semester: string;
  status: 'paid' | 'pending' | 'failed';
  receiptNumber: string;
  purpose: string;
  method: 'Банківський переказ' | 'Онлайн карткою (Monobank/Приват24)' | 'Каса банку';
}

export interface TuitionContractInfo {
  contractNumber: string;
  contractDate: string;
  payerName: string;
  totalContractAmount: number;
  paidAmount: number;
  remainingAmount: number;
  currentSemesterDue: number;
  currentSemesterDeadline: string;
  status: 'Оплачено' | 'Потребує оплати' | 'Заборгованість';
}

// ── Бюджет: Стипендія та студентські реквізити ──
export interface StudentBankAccount {
  bankName: string;
  iban: string;
  cardNumberMasked: string;
  accountHolder: string;
  status: 'Активна для виплат' | 'Перевіряється бухгалтерією';
  updatedAt: string;
}

export interface ScholarshipInfo {
  type: 'Академічна (Звичайна)' | 'Академічна (Підвищена за особливі успіхи)' | 'Соціальна' | 'Президентська';
  monthlyAmount: number;
  monthlyAmountFormatted: string;
  ratingPosition: number;
  totalStudentsInGroup: number;
  ratingScore: number;
  academicStanding: 'Призначено на поточний семестр' | 'Кандидат на підвищену' | 'Не призначено';
  nextPayoutDate: string;
  quotaPercent: number; // наприклад, 40% бюджетників отримують стипендію
  facultyQuotaRank: string; // наприклад, "Топ-5% факультету"
}

export interface ScholarshipPayment {
  id: string;
  month: string;
  date: string;
  amount: number;
  amountFormatted: string;
  type: string;
  status: 'Зараховано на картку' | 'В обробці казначейством';
  taxDeduction: string;
  targetAccountIban: string;
}