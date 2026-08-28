import React, { useState } from "react"
import { QRCodeSVG } from "qrcode.react"
import {
  FileText,
  CheckCircle2,
  ShieldCheck,
  Printer,
  Download,
  Sparkles,
} from "lucide-react"
import { Modal } from "../ui/Modal"
import { Button } from "../ui/Button"
import { StudentProfile } from "../../types/student"

export interface CertificateOrderModalProps {
  isOpen: boolean
  onClose: () => void
  student: StudentProfile
}

export const CertificateOrderModal: React.FC<CertificateOrderModalProps> = ({
  isOpen,
  onClose,
  student,
}) => {
  const [certType, setCertType] = useState("study_confirmation")
  const [purpose, setPurpose] = useState("")
  const [isGenerated, setIsGenerated] = useState(false)

  const verificationUrl = `https://universemvp.tech/verify/doc?id=KZ-DOC-2026-9812&code=a8f9-4b21`

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault()
    setIsGenerated(true)
  }

  const handleReset = () => {
    setIsGenerated(false)
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleReset}
      title={
        isGenerated
          ? "Офіційна електронна довідка (Згенеровано)"
          : "Замовлення довідки з ЕЦП деканату"
      }
      subtitle={
        isGenerated
          ? "Документ засвідчено цифровим підписом та QR-верифікацією ХНУ"
          : "Оберіть тип довідки та вкажіть місце пред’явлення"
      }
      maxWidth="lg"
    >
      {!isGenerated ? (
        <form onSubmit={handleGenerate} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[var(--kz-text-secondary)] uppercase tracking-wider mb-1.5">
              Тип документа
            </label>
            <select
              value={certType}
              onChange={(e) => setCertType(e.target.value)}
              className="w-full p-2.5 rounded-[var(--kz-radius-md)] bg-[var(--kz-surface-hover)] border border-[var(--kz-border)] text-xs font-semibold text-[var(--kz-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--kz-brand-primary)]"
            >
              <option value="study_confirmation">
                Довідка про навчання за місцем вимоги
              </option>
              <option value="tck_military">
                Довідка для ТЦК та СП (Додаток 20 для відстрочки)
              </option>
              <option value="embassy_visa">
                Довідка для візи / посольства (англійською мовою)
              </option>
              <option value="academic_transcript">
                Академічна довідка з оцінками (виписка)
              </option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[var(--kz-text-secondary)] uppercase tracking-wider mb-1.5">
              Місце пред’явлення / Мета отримання
            </label>
            <input
              type="text"
              required
              placeholder="Наприклад: За місцем роботи батьків / ТЦК Шевченківського р-ну"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="w-full p-2.5 rounded-[var(--kz-radius-md)] bg-[var(--kz-surface-hover)] border border-[var(--kz-border)] text-xs text-[var(--kz-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--kz-brand-primary)]"
            />
          </div>

          <div className="p-3 bg-[var(--kz-info-bg)] border border-[var(--kz-info-border)] rounded-[var(--kz-radius-md)] flex items-start gap-2.5 text-xs text-[var(--kz-info-text)]">
            <Sparkles size={16} className="shrink-0 text-blue-500 mt-0.5" />
            <p>
              Завдяки електронній системі документообігу UniHub довідка
              генерується автоматично за 5 секунд з накладанням сертифікованого
              QR-коду перевірки легітимності в базі ЄДЕБО.
            </p>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-[var(--kz-border)]">
            <Button
              variant="secondary"
              size="md"
              type="button"
              onClick={onClose}
            >
              Скасувати
            </Button>
            <Button variant="primary" size="md" type="submit">
              Сформувати довідку →
            </Button>
          </div>
        </form>
      ) : (
        /* Certificate Preview */
        <div className="space-y-5">
          <div className="p-6 bg-white text-gray-900 rounded-xl border-2 border-gray-200 shadow-inner font-serif text-xs space-y-4">
            {/* Header of official Karazin form */}
            <div className="text-center border-b pb-3 border-gray-300">
              <p className="font-bold uppercase text-[11px] tracking-wider text-gray-700">
                Міністерство освіти і науки України
              </p>
              <p className="font-extrabold text-sm uppercase text-blue-900 mt-0.5">
                Харківський національний університет імені В. Н. Каразіна
              </p>
              <p className="text-[10px] text-gray-500 mt-0.5">
                пл. Свободи, 4, м. Харків, 61022 | ЄДРПОУ 02070889
              </p>
            </div>

            <div className="flex justify-between items-center text-[10px] text-gray-500 font-mono">
              <span>Реєстр. № KZ-DOC-2026-9812</span>
              <span>Дата видачі: {new Date().toLocaleDateString("uk-UA")}</span>
            </div>

            <div className="text-center py-2">
              <h4 className="font-bold text-sm uppercase tracking-widest text-gray-900">
                Д О В І Д К А
              </h4>
            </div>

            <p className="leading-relaxed text-justify indent-6">
              Видана студенту <b>{student.name}</b> про те, що він дійсно є
              здобувачем вищої освіти денної форми навчання <b>2 курсу</b>{" "}
              (академічна група <b>{student.group}</b>) навчально-наукового
              інституту комп'ютерних наук та штучного інтелекту за спеціальністю{" "}
              <b>122 «Комп'ютерні науки»</b> (ступінь вищої освіти:{" "}
              <b>{student.degree}</b>).
            </p>

            <p className="leading-relaxed text-justify indent-6">
              Зарахований на підставі наказу ректора{" "}
              <b>{student.enrollmentOrder}</b>. Термін закінчення навчання:{" "}
              <b>{student.endDate}</b>.
            </p>

            <p className="leading-relaxed text-justify indent-6 text-gray-600">
              Довідка видана для пред’явлення:{" "}
              <i>{purpose || "за місцем вимоги"}</i>.
            </p>

            {/* Official Seal, Signatures & QR Code */}
            <div className="pt-4 border-t border-gray-300 flex items-center justify-between">
              <div>
                <p className="font-bold text-gray-800">Директор ННІ КН та ШІ</p>
                <p className="text-[10px] text-gray-500 mt-0.5">
                  Електронний цифровий підпис: ВАЛІДНИЙ
                </p>
                <div className="inline-flex items-center gap-1 px-2 py-0.5 mt-1 rounded bg-green-50 border border-green-300 text-green-800 text-[10px] font-mono font-bold">
                  <CheckCircle2 size={11} className="text-green-600" />
                  <span>ЕЦП Сертифікат № 492019-ХНУ</span>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <QRCodeSVG value={verificationUrl} size={70} />
                <span className="text-[8px] text-gray-400 font-mono mt-1">
                  Верифікація в ЄДЕБО
                </span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex justify-between items-center pt-2 border-t border-[var(--kz-border)]">
            <Button variant="secondary" size="md" onClick={handleReset}>
              Закрити
            </Button>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="md"
                icon={<Printer size={15} />}
                onClick={() => window.print()}
              >
                Роздрукувати
              </Button>
              <Button
                variant="primary"
                size="md"
                icon={<Download size={15} />}
                onClick={() => alert("PDF файл довідки успішно збережено")}
              >
                Завантажити PDF
              </Button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  )
}
