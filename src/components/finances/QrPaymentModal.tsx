import React from "react"
import { QRCodeSVG } from "qrcode.react"
import {
  QrCode,
  Smartphone,
  Check,
  Copy,
  ExternalLink,
  ShieldCheck,
} from "lucide-react"
import { Modal } from "../ui/Modal"
import { Button } from "../ui/Button"
import { UniversityRequisites } from "../../types/finances"

export interface QrPaymentModalProps {
  isOpen: boolean
  onClose: () => void
  requisites: UniversityRequisites
  amount: string
  onCopy: (text: string, label: string) => void
  isCopied: (text: string) => boolean
}

export const QrPaymentModal: React.FC<QrPaymentModalProps> = ({
  isOpen,
  onClose,
  requisites,
  amount,
  onCopy,
  isCopied,
}) => {
  // NBU QR standard format
  const nbuQrPayload = `BCD\n001\n1\nUAH\n${amount.replace(/\s+/g, "").replace(",", ".")}\n${requisites.recipient}\n${requisites.iban}\n${requisites.edrpou}\n\n\n${requisites.purposeTemplate}\n`

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Швидка оплата навчання за QR-кодом"
      subtitle="Скануйте через камеру або додаток Monobank / Приват24 / Ощад"
      maxWidth="md"
    >
      <div className="flex flex-col items-center text-center space-y-4">
        {/* QR Code Container */}
        <div className="p-4 bg-white rounded-2xl border-2 border-[var(--kz-brand-primary)]/30 shadow-md inline-block">
          <QRCodeSVG
            value={nbuQrPayload}
            size={190}
            level="M"
            includeMargin={false}
          />
        </div>

        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--kz-success-bg)] text-[var(--kz-success-text)] border border-[var(--kz-success-border)] text-xs font-bold font-mono">
            <Smartphone size={14} />
            <span>Сума до сплати: {amount} ₴</span>
          </div>
          <p className="text-xs text-[var(--kz-text-secondary)] max-w-sm mx-auto mt-2">
            Всі реквізити та призначення платежу вже зашифровані в коді згідно
            зі стандартом НБУ.
          </p>
        </div>

        {/* Quick App Buttons */}
        <div className="w-full grid grid-cols-2 gap-2 pt-2 border-t border-[var(--kz-border)]">
          <a
            href="https://www.monobank.ua"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 p-2.5 rounded-lg bg-[var(--kz-surface-hover)] border border-[var(--kz-border)] hover:border-[var(--kz-brand-primary)] text-xs font-bold text-[var(--kz-text-primary)] transition-colors"
          >
            <span>🐱 Monobank</span>
            <ExternalLink size={12} className="text-[var(--kz-text-muted)]" />
          </a>
          <a
            href="https://privat24.ua"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 p-2.5 rounded-lg bg-[var(--kz-surface-hover)] border border-[var(--kz-border)] hover:border-[var(--kz-brand-primary)] text-xs font-bold text-[var(--kz-text-primary)] transition-colors"
          >
            <span>🟢 Приват24</span>
            <ExternalLink size={12} className="text-[var(--kz-text-muted)]" />
          </a>
        </div>

        <div className="w-full flex justify-end pt-2">
          <Button variant="secondary" size="md" onClick={onClose}>
            Закрити
          </Button>
        </div>
      </div>
    </Modal>
  )
}
