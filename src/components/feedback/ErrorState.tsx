import React, { type ReactNode } from "react";
import { classNames } from "../../core/classNames";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "../buttons/Button";

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryLabel?: string;
  icon?: ReactNode;
  className?: string;
}

export function ErrorState({
  title = "Something went wrong",
  message = "An error occurred while loading this content. Please try again.",
  onRetry,
  retryLabel = "Try Again",
  icon = <AlertCircle size={48} className="cr-text-danger" />,
  className = "",
}: ErrorStateProps) {
  return (
    <div className={classNames("cr-error-state", className)}>
      <div className="cr-error-state__icon">{icon}</div>
      <h4 className="cr-error-state__title">{title}</h4>
      <p className="cr-error-state__message">{message}</p>
      {onRetry && (
        <Button
          variant="outline"
          leftIcon={<RefreshCw size={16} />}
          onClick={onRetry}
          className="cr-error-state__retry"
        >
          {retryLabel}
        </Button>
      )}
    </div>
  );
}
