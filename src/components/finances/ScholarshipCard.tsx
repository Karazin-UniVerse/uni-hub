import React from 'react';
import { Award, TrendingUp, Calendar, CheckCircle2, Users, Percent, ShieldCheck } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { ScholarshipInfo } from '../../types/finances';

export interface ScholarshipCardProps {
  scholarship: ScholarshipInfo;
}

export const ScholarshipCard: React.FC<ScholarshipCardProps> = ({ scholarship }) => {
  return (
    <Card className="space-y-4 border-[var(--kz-brand-primary)]/30 bg-gradient-to-br from-[var(--kz-surface)] via-[var(--kz-surface)] to-[var(--kz-brand-light)] dark:to-[rgba(0,240,255,0.06)]">
      {/* Header with Type & Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[var(--kz-border)]">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold shrink-0">
            <Award size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-[var(--kz-text-muted)] uppercase tracking-wider">
                Стипендіальне забезпечення (Бюджет)
              </span>
              <Badge variant="success" size="sm" dot>
                {scholarship.academicStanding}
              </Badge>
            </div>
            <h2 className="text-base font-extrabold text-[var(--kz-text-primary)] mt-0.5">
              {scholarship.type}
            </h2>
          </div>
        </div>

        <div className="text-left sm:text-right shrink-0">
          <p className="text-[10px] font-bold text-[var(--kz-text-muted)] uppercase">Щомісячна виплата</p>
          <p className="text-xl font-black text-[var(--kz-brand-primary)] dark:text-[#60A5FA] font-mono mt-0.5">
            {scholarship.monthlyAmountFormatted}
          </p>
        </div>
      </div>

      {/* 3 Metric Chips */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Rating rank */}
        <div className="p-3 rounded-[var(--kz-radius-md)] bg-[var(--kz-surface-hover)] border border-[var(--kz-border)] space-y-1">
          <div className="flex items-center justify-between text-[10px] font-bold text-[var(--kz-text-muted)] uppercase">
            <span className="flex items-center gap-1">
              <Users size={12} className="text-blue-500" />
              <span>Рейтинг у групі</span>
            </span>
            <span className="text-[var(--kz-brand-primary)] font-bold">Топ-10%</span>
          </div>
          <p className="text-lg font-black text-[var(--kz-text-primary)]">
            #{scholarship.ratingPosition} <span className="text-xs font-normal text-[var(--kz-text-muted)]">з {scholarship.totalStudentsInGroup} студентів</span>
          </p>
          <p className="text-[11px] text-[var(--kz-success-text)] font-semibold flex items-center gap-1">
            <TrendingUp size={11} />
            <span>Рейтинговий бал: {scholarship.ratingScore}</span>
          </p>
        </div>

        {/* Quota limit */}
        <div className="p-3 rounded-[var(--kz-radius-md)] bg-[var(--kz-surface-hover)] border border-[var(--kz-border)] space-y-1">
          <div className="flex items-center justify-between text-[10px] font-bold text-[var(--kz-text-muted)] uppercase">
            <span className="flex items-center gap-1">
              <Percent size={12} className="text-emerald-500" />
              <span>Ліміт стипендіатів</span>
            </span>
            <span>{scholarship.quotaPercent}% квоти</span>
          </div>
          <p className="text-lg font-black text-[var(--kz-success)]">
            Гарантовано
          </p>
          <p className="text-[11px] text-[var(--kz-text-secondary)]">
            {scholarship.facultyQuotaRank}
          </p>
        </div>

        {/* Next payout */}
        <div className="p-3 rounded-[var(--kz-radius-md)] bg-[var(--kz-surface-hover)] border border-[var(--kz-border)] space-y-1">
          <div className="flex items-center justify-between text-[10px] font-bold text-[var(--kz-text-muted)] uppercase">
            <span className="flex items-center gap-1">
              <Calendar size={12} className="text-amber-500" />
              <span>Наступна виплата</span>
            </span>
            <span className="text-[var(--kz-text-muted)]">Казначейство</span>
          </div>
          <p className="text-lg font-black text-[var(--kz-text-primary)] font-mono">
            {scholarship.nextPayoutDate}
          </p>
          <p className="text-[11px] text-[var(--kz-text-muted)]">
            Згідно з графіком ДКСУ
          </p>
        </div>
      </div>
    </Card>
  );
};