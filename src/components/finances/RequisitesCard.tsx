import React from "react"
import {
  Copy,
  Check,
  QrCode,
  CreditCard,
  Building2,
  ShieldCheck,
} from "lucide-react"
import { Card } from "../ui/Card"
import { Button } from "../ui/Button"
import { UniversityRequisites } from "../../types/finances"

export interface RequisitesCardProps {
  requisites: UniversityRequisites
  onOpenQr: () => void
  onCopy: (text: string, label: string) => void
  isCopied: (text: string) => boolean
}

export const RequisitesCard: React.FC<RequisitesCardProps> = ({
  requisites,
  onOpenQr,
  onCopy,
  isCopied,
}) => {
  const fields = [
    {
      label: "Отримувач платежу",
      value: requisites.recipient,
      fullWidth: true,
    },
    { label: "Код ЄДРПОУ", value: requisites.edrpou },
    { label: "Код банку (МФО)", value: requisites.mfo },
    { label: "Банк отримувача", value: requisites.bank, fullWidth: true },
    {
      label: "Рахунок (IBAN)",
      value: requisites.iban,
      copyable: true,
      fullWidth: true,
      highlight: true,
    },
    {
      label: "Призначення платежу",
      value: requisites.purposeTemplate,
      copyable: true,
      fullWidth: true,
    },
  ]

  return (
    <Card className="space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-[var(--kz-border)]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[var(--kz-brand-primary)]/10 text-[var(--kz-brand-primary)] flex items-center justify-center font-bold">
            <Building2 size={18} />
          </div>
          <div>
            <h2 className="text-sm font-bold text-[var(--kz-text-primary)]">
              Банківські реквізити для оплати
            </h2>
            <p className="text-[11px] text-[var(--kz-text-secondary)]">
              Офіційний казначейський рахунок ХНУ імені В. Н. Каразіна
            </p>
          </div>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={<QrCode size={15} />}
          onClick={onOpenQr}
        >
          Оплатити за QR-кодом
        </Button>
      </div>

      {/* Grid of requisites */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {fields.map((f, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-[var(--kz-radius-md)] border transition-all ${
              f.highlight
                ? "bg-[var(--kz-brand-light)] dark:bg-[rgba(0,82,204,0.12)] border-[var(--kz-brand-primary)]/40"
                : "bg-[var(--kz-surface-hover)] border-[var(--kz-border)]"
            } ${f.fullWidth ? "sm:col-span-2" : ""}`}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-bold text-[var(--kz-text-muted)] uppercase tracking-wider">
                {f.label}
              </span>
              {f.copyable && (
                <button
                  onClick={() => onCopy(f.value, f.label)}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-[var(--kz-brand-primary)] dark:text-[#60A5FA] hover:underline cursor-pointer"
                >
                  {isCopied(f.value) ? (
                    <>
                      <Check size={13} className="text-[var(--kz-success)]" />
                      <span className="text-[var(--kz-success)]">
                        Скопійовано!
                      </span>
                    </>
                  ) : (
                    <>
                      <Copy size={13} />
                      <span>Скопіювати</span>
                    </>
                  )}
                </button>
              )}
            </div>
            <p
              className={`mt-1 font-mono text-xs font-semibold ${
                f.highlight
                  ? "text-[var(--kz-brand-primary)] dark:text-[#60A5FA] font-bold text-sm"
                  : "text-[var(--kz-text-primary)]"
              } break-all`}
            >
              {f.value}
            </p>
          </div>
        ))}
      </div>

      <div className="p-3 bg-[var(--kz-info-bg)] border border-[var(--kz-info-border)] rounded-[var(--kz-radius-md)] flex items-start gap-2.5 text-xs text-[var(--kz-info-text)]">
        <ShieldCheck size={16} className="shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <b>Важливо:</b> У призначенні обов’язково вказуйте прізвище студента,
          факультет, номер групи та номер договору для автоматичного зарахування
          коштів у бухгалтерії.
        </p>
      </div>
    </Card>
  )
}
