import React from "react";
import type { ComponentSize, ComponentVariant } from "../../core/types";
import { classNames } from "../../core/classNames";

export interface ProgressProps {
  value: number; // 0 to 100
  max?: number;
  size?: ComponentSize;
  variant?: ComponentVariant;
  showValue?: boolean;
  indeterminate?: boolean;
  className?: string;
}

export function Progress({
  value,
  max = 100,
  size = "md",
  variant = "primary",
  showValue = false,
  indeterminate = false,
  className = "",
}: ProgressProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={classNames("cr-progress-wrapper", className)}>
      <div
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : Math.round(percentage)}
        aria-valuemin={0}
        aria-valuemax={100}
        className={classNames(
          "cr-progress",
          `cr-progress--${size}`,
          `cr-progress--${variant}`,
          indeterminate && "cr-progress--indeterminate"
        )}
      >
        <div
          className="cr-progress__bar"
          style={{ width: indeterminate ? "100%" : `${percentage}%` }}
        />
      </div>
      {showValue && !indeterminate && (
        <span className="cr-progress__value">{Math.round(percentage)}%</span>
      )}
    </div>
  );
}
