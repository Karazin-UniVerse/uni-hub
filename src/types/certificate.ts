export type CertificateType = "study_confirmation" | "tck_military" | "embassy_visa" | "academic_transcript" | "individual_schedule"

export interface CertificateOrder {
  id: string
  type: CertificateType
  title: string
  purpose: string
  requestedDate: string
  readyDate?: string
  status: "Нова" | "В обробці" | "Підписано ЕЦП" | "Готово до видачі"
  trackingNumber: string
  verificationCode: string
  pdfUrl?: string
}
