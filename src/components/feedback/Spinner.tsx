import React from "react";
import type { ComponentSize, ComponentVariant } from "../../core/types";
import { classNames } from "../../core/classNames";

export interface SpinnerProps {
  size?: ComponentSize;
  variant?: ComponentVariant;
  className?: string;
  label?: string;
}

export function Spinner({
  size = "md",
  variant = "primary",
  className = "",
  label = "Loading...",
}: SpinnerProps) {
  return (
    <span
      role="status"
      className={classNames(
        "cr-spinner",
        `cr-spinner--${size}`,
        `cr-spinner--${variant}`,
        className
      )}
      aria-label={label}
    >
      <svg
        className="cr-animate-spin"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      >
        <circle cx="12" cy="12" r="10" strokeOpacity="0.2" />
        <path d="M12 2a10 10 0 0 1 10 10" />
      </svg>
    </span>
  );
}
