import React, { useState, type ReactNode } from "react";
import type { ComponentVariant } from "../../core/types";
import { classNames } from "../../core/classNames";
import { Info, CheckCircle2, AlertTriangle, XCircle, X } from "lucide-react";

export interface AlertProps {
  variant?: "info" | "success" | "warning" | "danger";
  title?: ReactNode;
  children: ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  icon?: ReactNode;
  className?: string;
}

export function Alert({
  variant = "info",
  title,
  children,
  dismissible = false,
  onDismiss,
  icon,
  className = "",
}: AlertProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const defaultIcons = {
    info: <Info size={18} />,
    success: <CheckCircle2 size={18} />,
    warning: <AlertTriangle size={18} />,
    danger: <XCircle size={18} />,
  };

  const handleDismiss = () => {
    setDismissed(true);
    onDismiss?.();
  };

  return (
    <div
      role="alert"
      className={classNames("cr-alert", `cr-alert--${variant}`, className)}
    >
      <div className="cr-alert__icon">{icon || defaultIcons[variant]}</div>
      <div className="cr-alert__content">
        {title && <h5 className="cr-alert__title">{title}</h5>}
        <div className="cr-alert__description">{children}</div>
      </div>
      {dismissible && (
        <button
          type="button"
          onClick={handleDismiss}
          className="cr-alert__close"
          aria-label="Dismiss alert"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
