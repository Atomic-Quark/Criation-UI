import React, {
  forwardRef,
  useEffect,
  useRef,
  type ReactElement,
  type ReactNode,
} from "react";
import { classNames } from "../../core/classNames";
import { createChainableProxy } from "../../core/shorthand";

export interface AlertDialogProps {
  isOpen: boolean;
  title: string;
  description?: ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: "danger" | "warning" | "info";
  className?: string;
  style?: React.CSSProperties;
}

export const BaseAlertDialog = forwardRef<HTMLDivElement, AlertDialogProps>(
  (
    {
      isOpen,
      title,
      description,
      confirmText = "Confirm",
      cancelText = "Cancel",
      onConfirm,
      onCancel,
      variant = "danger",
      className = "",
      style,
    },
    ref
  ) => {
    const dialogRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!isOpen) return;
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onCancel();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onCancel]);

    if (!isOpen) return null;

    const variantColors = {
      danger: {
        bg: "var(--cr-danger)",
        hover: "var(--cr-danger-hover)",
        iconColor: "#f43f5e",
      },
      warning: {
        bg: "var(--cr-warning)",
        hover: "var(--cr-warning-hover)",
        iconColor: "#f59e0b",
      },
      info: {
        bg: "var(--cr-primary)",
        hover: "var(--cr-primary-hover)",
        iconColor: "#6366f1",
      },
    };

    const currentStyle = variantColors[variant] || variantColors.danger;

    return (
      <div
        className="cr-alert-dialog-backdrop"
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(15, 23, 42, 0.65)",
          backdropFilter: "blur(4px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
          padding: "1rem",
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) onCancel();
        }}
      >
        <div
          ref={dialogRef}
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="cr-dialog-title"
          aria-describedby="cr-dialog-desc"
          className={classNames("cr-alert-dialog", className)}
          style={{
            backgroundColor: "var(--cr-bg-surface)",
            borderRadius: "var(--cr-radius-lg)",
            border: "1px solid var(--cr-border-subtle)",
            boxShadow: "var(--cr-shadow-xl)",
            width: "100%",
            maxWidth: "440px",
            padding: "1.5rem",
            color: "var(--cr-text-primary)",
            animation: "cr-scale-in 150ms ease-out",
            ...style,
          }}
        >
          {/* Header */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: "0.875rem" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "var(--cr-radius-full)",
                backgroundColor: `${currentStyle.iconColor}20`,
                color: currentStyle.iconColor,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <div>
              <h2
                id="cr-dialog-title"
                style={{
                  fontSize: "1.125rem",
                  fontWeight: 600,
                  margin: 0,
                  color: "var(--cr-text-primary)",
                }}
              >
                {title}
              </h2>
              {description && (
                <div
                  id="cr-dialog-desc"
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--cr-text-secondary)",
                    marginTop: "0.375rem",
                    lineHeight: 1.5,
                  }}
                >
                  {description}
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "0.75rem",
              marginTop: "1.5rem",
            }}
          >
            <button
              type="button"
              onClick={onCancel}
              style={{
                padding: "8px 16px",
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "var(--cr-text-secondary)",
                backgroundColor: "transparent",
                border: "1px solid var(--cr-border-subtle)",
                borderRadius: "var(--cr-radius-md)",
                cursor: "pointer",
              }}
            >
              {cancelText}
            </button>
            <button
              type="button"
              onClick={onConfirm}
              style={{
                padding: "8px 16px",
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "#ffffff",
                backgroundColor: currentStyle.bg,
                border: "none",
                borderRadius: "var(--cr-radius-md)",
                cursor: "pointer",
              }}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    );
  }
);

BaseAlertDialog.displayName = "BaseAlertDialog";

export interface AlertDialogChainable {
  danger(): ReactElement & AlertDialogChainable;
  warning(): ReactElement & AlertDialogChainable;
  info(): ReactElement & AlertDialogChainable;
  confirmText(txt: string): ReactElement & AlertDialogChainable;
  cancelText(txt: string): ReactElement & AlertDialogChainable;
  onConfirm(fn: () => void): ReactElement & AlertDialogChainable;
  onCancel(fn: () => void): ReactElement & AlertDialogChainable;
}

function createAlertDialogElement(props: AlertDialogProps): ReactElement & AlertDialogChainable {
  const el = React.createElement(BaseAlertDialog, props);
  return createChainableProxy(el, {
    danger: () => createAlertDialogElement({ ...props, variant: "danger" }),
    warning: () => createAlertDialogElement({ ...props, variant: "warning" }),
    info: () => createAlertDialogElement({ ...props, variant: "info" }),
    confirmText: (txt: string) => createAlertDialogElement({ ...props, confirmText: txt }),
    cancelText: (txt: string) => createAlertDialogElement({ ...props, cancelText: txt }),
    onConfirm: (fn: () => void) => createAlertDialogElement({ ...props, onConfirm: fn }),
    onCancel: (fn: () => void) => createAlertDialogElement({ ...props, onCancel: fn }),
  });
}

export function AlertDialog(props: AlertDialogProps): ReactElement;
export function AlertDialog(
  title: string,
  description?: ReactNode,
  onConfirm?: () => void,
  onCancel?: () => void
): ReactElement & AlertDialogChainable;
export function AlertDialog(...args: any[]): ReactElement & AlertDialogChainable {
  if (typeof args[0] === "string") {
    const title = args[0];
    const description = typeof args[1] === "string" || React.isValidElement(args[1]) ? args[1] : undefined;
    const onConfirm = typeof args[2] === "function" ? args[2] : () => {};
    const onCancel = typeof args[3] === "function" ? args[3] : () => {};

    return createAlertDialogElement({
      isOpen: true,
      title,
      description,
      onConfirm,
      onCancel,
    });
  }

  const { ref, ...props } = (args[0] || {}) as AlertDialogProps & { ref?: any };
  return React.createElement(BaseAlertDialog, { ref, ...props }) as any;
}

AlertDialog.displayName = "AlertDialog";
