import React from "react"
import { Download, CheckCircle2, Clock } from "lucide-react"
import { Card } from "../ui/Card"
import { Badge } from "../ui/Badge"
import { PaymentTransaction } from "../../types/finances"

export interface PaymentHistoryTableProps {
  payments: PaymentTransaction[]
}

export const PaymentHistoryTable: React.FC<PaymentHistoryTableProps> = ({
  payments,
}) => {
  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[var(--kz-border)]">
        <div>
          <h2 className="text-sm font-bold text-[var(--kz-text-primary)]">
            Історія оплат та квитанції
          </h2>
          <p className="text-[11px] text-[var(--kz-text-secondary)]">
            Архів транзакцій за всі семестри навчання
          </p>
        </div>
        <Badge variant="success" size="sm" dot>
          Усі платежі підтверджено
        </Badge>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="bg-[var(--kz-surface-hover)] border-b border-[var(--kz-border)] text-[var(--kz-text-secondary)]">
              <th className="py-2.5 px-3 font-bold uppercase tracking-wider text-[10px]">
                Дата
              </th>
              <th className="py-2.5 px-3 font-bold uppercase tracking-wider text-[10px]">
                Семестр / Призначення
              </th>
              <th className="py-2.5 px-3 font-bold uppercase tracking-wider text-[10px]">
                Спосіб оплати
              </th>
              <th className="py-2.5 px-3 font-bold uppercase tracking-wider text-[10px] text-right">
                Сума
              </th>
              <th className="py-2.5 px-3 font-bold uppercase tracking-wider text-[10px] text-center">
                Квитанція
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--kz-border)] font-mono">
            {payments.map((p) => (
              <tr
                key={p.id}
                className="hover:bg-[var(--kz-surface-hover)]/60 transition-colors"
              >
                <td className="py-3 px-3 text-[var(--kz-text-primary)] font-semibold">
                  {p.date}
                </td>
                <td className="py-3 px-3 font-sans">
                  <p className="font-semibold text-[var(--kz-text-primary)]">
                    {p.semester}
                  </p>
                  <p className="text-[10px] text-[var(--kz-text-muted)] truncate max-w-xs">
                    {p.receiptNumber}
                  </p>
                </td>
                <td className="py-3 px-3 font-sans text-[var(--kz-text-secondary)]">
                  {p.method}
                </td>
                <td className="py-3 px-3 text-right font-bold text-[var(--kz-text-primary)]">
                  {p.amountFormatted}
                </td>
                <td className="py-3 px-3 text-center font-sans">
                  <button
                    onClick={() =>
                      alert(
                        `Завантаження офіційної квитанції ${p.receiptNumber}`,
                      )
                    }
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[var(--kz-surface-active)] hover:bg-[var(--kz-brand-primary)] hover:text-white text-[11px] font-semibold text-[var(--kz-text-secondary)] transition-colors cursor-pointer"
                  >
                    <Download size={12} />
                    <span>PDF</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
