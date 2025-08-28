import React from 'react';

interface StatCardProps {
  label: string;
  value: React.ReactNode;
  tone?: 'default' | 'positive' | 'negative' | 'warning' | 'accent';
  footer?: React.ReactNode;
}

const toneMap: Record<NonNullable<StatCardProps['tone']>, string> = {
  default: 'text-soft',
  positive: 'text-positive',
  negative: 'text-negative',
  warning: 'text-warning',
  accent: 'accent'
};

export function StatCard({ label, value, tone = 'default', footer }: StatCardProps) {
  return (
    <div className="card p-5 flex flex-col gap-1 items-start text-center sm:text-left">
      <span className="text-xs uppercase tracking-wide text-soft font-medium">{label}</span>
      <div className={`text-2xl font-semibold ${toneMap[tone]}`}>{value}</div>
      {footer && <div className="mt-1 text-xs text-soft">{footer}</div>}
    </div>
  );
}

export default StatCard;
