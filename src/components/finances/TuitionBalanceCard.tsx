import React from "react"
import { ShieldCheck, Calendar, FileText } from "lucide-react"
import { Card } from "../ui/Card"
import { Badge } from "../ui/Badge"
import { ProgressBar } from "../ui/ProgressBar"
import { TuitionContractInfo } from "../../types/finances"

export interface TuitionBalanceCardProps {
  contract: TuitionContractInfo
}

export const TuitionBalanceCard: React.FC<TuitionBalanceCardProps> = ({
  contract,
}) => {
  const percentPaid = Math.round(
    (contract.paidAmount / contract.totalContractAmount) * 100,
  )

  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[var(--kz-border)]">
        <div>
          <h3 className="text-xs font-bold text-[var(--kz-text-primary)] uppercase tracking-wider">
            Статус договору на навчання
          </h3>
          <p className="text-[11px] text-[var(--kz-text-secondary)] font-mono mt-0.5">
            {contract.contractNumber} від {contract.contractDate}
          </p>
        </div>
        <Badge variant="success" size="sm" dot>
          {contract.status}
        </Badge>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-xs">
          <span className="text-[var(--kz-text-secondary)]">
            Виконання договору:
          </span>
          <span className="font-bold text-[var(--kz-text-primary)] font-mono">
            {percentPaid}% сплачено
          </span>
        </div>
        <ProgressBar
          value={contract.paidAmount}
          max={contract.totalContractAmount}
          colorVariant="primary"
          height="md"
        />
        <div className="flex justify-between text-[11px] text-[var(--kz-text-muted)] font-mono">
          <span>Сплачено: {contract.paidAmount.toLocaleString()} ₴</span>
          <span>
            Загальна сума: {contract.totalContractAmount.toLocaleString()} ₴
          </span>
        </div>
      </div>

      <div className="p-3 rounded-[var(--kz-radius-md)] bg-[var(--kz-surface-hover)] border border-[var(--kz-border)] grid grid-cols-2 gap-3 text-xs">
        <div>
          <p className="text-[10px] font-bold text-[var(--kz-text-muted)] uppercase">
            Наступний платіж
          </p>
          <p className="text-sm font-bold text-[var(--kz-text-primary)] font-mono mt-0.5">
            {contract.currentSemesterDue.toLocaleString()} ₴
          </p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-[var(--kz-text-muted)] uppercase">
            Кінцевий термін
          </p>
          <p className="text-xs font-semibold text-[var(--kz-warning)] font-mono mt-1 flex items-center gap-1">
            <Calendar size={12} />
            <span>{contract.currentSemesterDeadline}</span>
          </p>
        </div>
      </div>
    </Card>
  )
}
