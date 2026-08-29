import React from 'react';
import { Download, CheckCircle2, Award } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { ScholarshipPayment } from '../../types/finances';

export interface ScholarshipHistoryTableProps {
  payments: ScholarshipPayment[];
}

export const ScholarshipHistoryTable: React.FC<ScholarshipHistoryTableProps> = ({ payments }) => {
  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[var(--kz-border)]">
        <div>
          <h3 className="text-xs font-bold text-[var(--kz-text-primary)] uppercase tracking-wider">
            Історія нарахувань стипендій
          </h3>
          <p className="text-[11px] text-[var(--kz-text-secondary)]">Реєстр виплат Державного казначейства України</p>
        </div>
        <Badge variant="success" size="sm" dot>
          Усі виплати зараховано
        </Badge>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="bg-[var(--kz-surface-hover)] border-b border-[var(--kz-border)] text-[var(--kz-text-secondary)]">
              <th className="py-2.5 px-3 font-bold uppercase tracking-wider text-[10px]">Період</th>
              <th className="py-2.5 px-3 font-bold uppercase tracking-wider text-[10px]">Дата виплати</th>
              <th className="py-2.5 px-3 font-bold uppercase tracking-wider text-[10px]">Тип стипендії</th>
              <th className="py-2.5 px-3 font-bold uppercase tracking-wider text-[10px] text-right font-mono">Сума</th>
              <th className="py-2.5 px-3 font-bold uppercase tracking-wider text-[10px] text-center">Статус</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--kz-border)] font-mono">
            {payments.map((p) => (
              <tr key={p.id} className="hover:bg-[var(--kz-surface-hover)]/60 transition-colors">
                <td className="py-3 px-3 font-sans font-semibold text-[var(--kz-text-primary)]">
                  {p.month}
                </td>
                <td className="py-3 px-3 text-[var(--kz-text-secondary)]">
                  {p.date}
                </td>
                <td className="py-3 px-3 font-sans text-[var(--kz-text-secondary)]">
                  {p.type}
                </td>
                <td className="py-3 px-3 text-right font-bold text-[var(--kz-success)] text-sm">
                  +{p.amountFormatted}
                </td>
                <td className="py-3 px-3 text-center font-sans">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[var(--kz-success-bg)] text-[var(--kz-success-text)] text-[10px] font-bold border border-[var(--kz-success-border)]">
                    <CheckCircle2 size={10} />
                    <span>{p.status}</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};