import {
  UniversityRequisites,
  PaymentTransaction,
  TuitionContractInfo,
  StudentBankAccount,
  ScholarshipInfo,
  ScholarshipPayment,
} from '../types/finances';

// ── КОНТРАКТ: Реквізити університету для оплати ──
export const MOCK_REQUISITES: UniversityRequisites = {
  recipient: 'Харківський національний університет імені В. Н. Каразіна',
  edrpou: '02070889',
  bank: 'ДКСУ м. Київ (Державна казначейська служба України)',
  mfo: '820172',
  iban: 'UA218201720314201002201020708',
  purposeTemplate: 'Оплата за навчання, Барсуков Родіон Сергійович, ННІ КН та ШІ, гр. КС-12, Договір №24-122/КС',
  standardContractAmount: '16 500,00',
  currency: 'UAH (₴)',
};

export const MOCK_CONTRACT: TuitionContractInfo = {
  contractNumber: '№ 24-122/КС-014',
  contractDate: '28.08.2024',
  payerName: 'Барсуков Родіон Сергійович',
  totalContractAmount: 132000,
  paidAmount: 66000,
  remainingAmount: 66000,
  currentSemesterDue: 16500,
  currentSemesterDeadline: '01.02.2025',
  status: 'Оплачено',
};

export const MOCK_PAYMENTS: PaymentTransaction[] = [
  {
    id: 'pay-04',
    date: '01.09.2024',
    amount: 16500,
    amountFormatted: '16 500,00 ₴',
    semester: 'І семестр 2024/2025',
    status: 'paid',
    receiptNumber: 'REC-2024-09812',
    purpose: 'Оплата за навчання, Барсуков Р.С., КС-12, І семестр 2024/2025',
    method: 'Онлайн карткою (Monobank/Приват24)',
  },
  {
    id: 'pay-03',
    date: '01.02.2024',
    amount: 16500,
    amountFormatted: '16 500,00 ₴',
    semester: 'ІІ семестр 2023/2024',
    status: 'paid',
    receiptNumber: 'REC-2024-03412',
    purpose: 'Оплата за навчання, Барсуков Р.С., КС-12, ІІ семестр 2023/2024',
    method: 'Банківський переказ',
  },
  {
    id: 'pay-02',
    date: '01.09.2023',
    amount: 16500,
    amountFormatted: '16 500,00 ₴',
    semester: 'І семестр 2023/2024',
    status: 'paid',
    receiptNumber: 'REC-2023-88910',
    purpose: 'Оплата за навчання, Барсуков Р.С., КС-12, І семестр 2023/2024',
    method: 'Онлайн карткою (Monobank/Приват24)',
  },
  {
    id: 'pay-01',
    date: '30.08.2022',
    amount: 16500,
    amountFormatted: '16 500,00 ₴',
    semester: 'Вступний внесок / І сем',
    status: 'paid',
    receiptNumber: 'REC-2022-00124',
    purpose: 'Вступний платіж за навчання за договором №24-122/КС-014',
    method: 'Каса банку',
  },
];

// ── БЮДЖЕТ: Студентський рахунок для виплати стипендії ──
export const MOCK_STUDENT_BANK_ACCOUNT: StudentBankAccount = {
  bankName: 'АТ КБ «ПриватБанк» (Студентська соціальна картка)',
  iban: 'UA683052990000026201234567890',
  cardNumberMasked: '5168 75** **** 4912',
  accountHolder: 'Барсуков Родіон Сергійович',
  status: 'Активна для виплат',
  updatedAt: '01.09.2024',
};

// ── БЮДЖЕТ: Стипендіальний статус та рейтинг ──
export const MOCK_SCHOLARSHIP: ScholarshipInfo = {
  type: 'Академічна (Підвищена за особливі успіхи)',
  monthlyAmount: 2910,
  monthlyAmountFormatted: '2 910,00 ₴',
  ratingPosition: 2,
  totalStudentsInGroup: 28,
  ratingScore: 93.4,
  academicStanding: 'Призначено на поточний семестр',
  nextPayoutDate: '25.09.2024',
  quotaPercent: 40,
  facultyQuotaRank: 'Топ-5% факультету (КС-12)',
};

export const MOCK_SCHOLARSHIP_PAYMENTS: ScholarshipPayment[] = [
  {
    id: 'sch-08',
    month: 'Серпень 2024',
    date: '23.08.2024',
    amount: 2910,
    amountFormatted: '2 910,00 ₴',
    type: 'Підвищена академічна стипендія',
    status: 'Зараховано на картку',
    taxDeduction: '0,00 ₴ (не оподатковується)',
    targetAccountIban: 'UA683052990000026201234567890',
  },
  {
    id: 'sch-07',
    month: 'Липень 2024',
    date: '25.07.2024',
    amount: 2910,
    amountFormatted: '2 910,00 ₴',
    type: 'Підвищена академічна стипендія',
    status: 'Зараховано на картку',
    taxDeduction: '0,00 ₴',
    targetAccountIban: 'UA683052990000026201234567890',
  },
  {
    id: 'sch-06',
    month: 'Червень 2024',
    date: '25.06.2024',
    amount: 2910,
    amountFormatted: '2 910,00 ₴',
    type: 'Підвищена академічна стипендія',
    status: 'Зараховано на картку',
    taxDeduction: '0,00 ₴',
    targetAccountIban: 'UA683052990000026201234567890',
  },
  {
    id: 'sch-05',
    month: 'Травень 2024',
    date: '24.05.2024',
    amount: 2910,
    amountFormatted: '2 910,00 ₴',
    type: 'Підвищена академічна стипендія',
    status: 'Зараховано на картку',
    taxDeduction: '0,00 ₴',
    targetAccountIban: 'UA683052990000026201234567890',
  },
];