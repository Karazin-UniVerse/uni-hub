export interface UniversityRequisites {
  recipient: string
  edrpou: string
  bank: string
  mfo: string
  iban: string
  purposeTemplate: string
  standardContractAmount: string
  currency: string
}

export interface PaymentTransaction {
  id: string
  date: string
  amount: number
  amountFormatted: string
  semester: string
  status: "paid" | "pending" | "failed"
  receiptNumber: string
  purpose: string
  method: "Банківський переказ" | "Онлайн карткою (Monobank/Приват24)" | "Каса банку"
}

export interface TuitionContractInfo {
  contractNumber: string
  contractDate: string
  payerName: string
  totalContractAmount: number
  paidAmount: number
  remainingAmount: number
  currentSemesterDue: number
  currentSemesterDeadline: string
  status: "Оплачено" | "Потребує оплати" | "Заборгованість"
}
