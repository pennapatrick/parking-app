import React from 'react';

interface ProgressBarProps {
  value: number; // 0-1 range
  className?: string;
  tone?: 'accent' | 'positive' | 'negative' | 'warning';
  height?: number;
}

const toneColor: Record<NonNullable<ProgressBarProps['tone']>, string> = {
  accent: 'var(--color-accent)',
  positive: 'var(--color-positive)',
  negative: 'var(--color-negative)',
  warning: 'var(--color-warning)'
};

export function ProgressBar({ value, className = '', tone = 'accent', height = 6 }: ProgressBarProps) {
  const pct = Math.min(1, Math.max(0, value));
  return (
    <div className={`w-full bg-surface-alt rounded-full overflow-hidden border border-base ${className}`} style={{ height }}>
      <div
        className="h-full rounded-full transition-all duration-300"
        style={{ width: `${pct * 100}%`, background: toneColor[tone] }}
      />
    </div>
  );
}

export default ProgressBar;
