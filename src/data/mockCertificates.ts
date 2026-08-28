import { CertificateOrder } from "../types/certificate"

export const MOCK_CERTIFICATES: CertificateOrder[] = [
  {
    id: "cert-01",
    type: "study_confirmation",
    title: "Довідка про навчання за місцем вимоги",
    purpose: "Для надання за місцем роботи батьків",
    requestedDate: "24.08.2024",
    readyDate: "25.08.2024",
    status: "Підписано ЕЦП",
    trackingNumber: "KZ-DOC-2024-9182",
    verificationCode: "a8f9-4b21-98cc-12e4",
  },
  {
    id: "cert-02",
    type: "tck_military",
    title: "Довідка для ТЦК та СП (Додаток 20)",
    purpose: "Оновлення військово-облікових даних студента",
    requestedDate: "15.08.2024",
    readyDate: "16.08.2024",
    status: "Підписано ЕЦП",
    trackingNumber: "KZ-DOC-2024-8412",
    verificationCode: "f102-33cc-89aa-0981",
  },
]
