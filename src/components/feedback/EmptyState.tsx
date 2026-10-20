import React, { type ReactNode } from "react";
import { classNames } from "../../core/classNames";
import { Inbox } from "lucide-react";

export interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({
  icon = <Inbox size={48} />,
  title,
  description,
  action,
  className = "",
}: EmptyStateProps) {
  return (
    <div className={classNames("cr-empty-state", className)}>
      <div className="cr-empty-state__icon">{icon}</div>
      <h4 className="cr-empty-state__title">{title}</h4>
      {description && <p className="cr-empty-state__description">{description}</p>}
      {action && <div className="cr-empty-state__action">{action}</div>}
    </div>
  );
}
