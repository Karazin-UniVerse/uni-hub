import {
  UniversityRequisites,
  PaymentTransaction,
  TuitionContractInfo,
} from "../types/finances"

export const MOCK_REQUISITES: UniversityRequisites = {
  recipient: "Харківський національний університет імені В. Н. Каразіна",
  edrpou: "02070889",
  bank: "ДКСУ м. Київ (Державна казначейська служба України)",
  mfo: "820172",
  iban: "UA218201720314201002201020708",
  purposeTemplate:
    "Оплата за навчання, Барсуков Родіон Сергійович, ННІ КН та ШІ, гр. КС-12, Договір №24-122/КС",
  standardContractAmount: "16 500,00",
  currency: "UAH (₴)",
}

export const MOCK_CONTRACT: TuitionContractInfo = {
  contractNumber: "№ 24-122/КС-014",
  contractDate: "28.08.2024",
  payerName: "Барсуков Родіон Сергійович",
  totalContractAmount: 132000,
  paidAmount: 66000,
  remainingAmount: 66000,
  currentSemesterDue: 16500,
  currentSemesterDeadline: "01.02.2025",
  status: "Оплачено",
}

export const MOCK_PAYMENTS: PaymentTransaction[] = [
  {
    id: "pay-04",
    date: "01.09.2024",
    amount: 16500,
    amountFormatted: "16 500,00 ₴",
    semester: "І семестр 2024/2025",
    status: "paid",
    receiptNumber: "REC-2024-09812",
    purpose: "Оплата за навчання, Барсуков Р.С., КС-12, І семестр 2024/2025",
    method: "Онлайн карткою (Monobank/Приват24)",
  },
  {
    id: "pay-03",
    date: "01.02.2024",
    amount: 16500,
    amountFormatted: "16 500,00 ₴",
    semester: "ІІ семестр 2023/2024",
    status: "paid",
    receiptNumber: "REC-2024-03412",
    purpose: "Оплата за навчання, Барсуков Р.С., КС-12, ІІ семестр 2023/2024",
    method: "Банківський переказ",
  },
  {
    id: "pay-02",
    date: "01.09.2023",
    amount: 16500,
    amountFormatted: "16 500,00 ₴",
    semester: "І семестр 2023/2024",
    status: "paid",
    receiptNumber: "REC-2023-88910",
    purpose: "Оплата за навчання, Барсуков Р.С., КС-12, І семестр 2023/2024",
    method: "Онлайн карткою (Monobank/Приват24)",
  },
  {
    id: "pay-01",
    date: "30.08.2022",
    amount: 16500,
    amountFormatted: "16 500,00 ₴",
    semester: "Вступний внесок / І сем",
    status: "paid",
    receiptNumber: "REC-2022-00124",
    purpose: "Вступний платіж за навчання за договором №24-122/КС-014",
    method: "Каса банку",
  },
]
