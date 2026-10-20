import React, { useState, type ReactNode, type ReactElement } from "react";
import { classNames } from "../../core/classNames";
import { Info, CheckCircle2, AlertTriangle, XCircle, X } from "lucide-react";
import { createChainableProxy } from "../../core/shorthand";

export interface AlertProps {
  variant?: "info" | "success" | "warning" | "danger";
  title?: ReactNode;
  children?: ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  icon?: ReactNode;
  className?: string;
}

export function BaseAlert({
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

BaseAlert.displayName = "BaseAlert";

export interface AlertChainable {
  success(): ReactElement & AlertChainable;
  warning(): ReactElement & AlertChainable;
  danger(): ReactElement & AlertChainable;
  info(): ReactElement & AlertChainable;
  title(t: ReactNode): ReactElement & AlertChainable;
  dismissible(): ReactElement & AlertChainable;
}

function attachAlertChaining(element: ReactElement, props: AlertProps): ReactElement & AlertChainable {
  const update = (patch: Partial<AlertProps>) =>
    createAlertElement({ ...props, ...patch });

  return createChainableProxy(element, {
    success: () => update({ variant: "success" }),
    warning: () => update({ variant: "warning" }),
    danger: () => update({ variant: "danger" }),
    info: () => update({ variant: "info" }),
    title: (t: ReactNode) => update({ title: t }),
    dismissible: () => update({ dismissible: true }),
  });
}

function createAlertElement(props: AlertProps): ReactElement & AlertChainable {
  const element = <BaseAlert {...props} />;
  return attachAlertChaining(element, props);
}

/**
 * Universal Alert:
 * 1. English Chaining:
 *    Alert("Payment completed successfully!").success().title("Order Placed")
 * 2. Simple Function:
 *    Alert("Item deleted", "danger")
 * 3. JSX Component:
 *    <Alert variant="success">Payment completed</Alert>
 */
export function Alert(props: AlertProps): ReactElement;
export function Alert(
  message: ReactNode,
  variant?: "info" | "success" | "warning" | "danger" | string,
  title?: ReactNode
): ReactElement & AlertChainable;
export function Alert(first?: any, second?: any, third?: any): ReactElement & AlertChainable {
  if (
    first &&
    typeof first === "object" &&
    !React.isValidElement(first) &&
    ("variant" in first || "title" in first || "children" in first || "dismissible" in first)
  ) {
    return (<BaseAlert {...first} />) as any;
  }

  let children: ReactNode = first;
  let variant: "info" | "success" | "warning" | "danger" = "info";
  let title: ReactNode = third;

  if (typeof second === "string") {
    const s = second.toLowerCase();
    if (s === "success" || s === "warning" || s === "danger" || s === "info") {
      variant = s as any;
    }
  }

  return createAlertElement({ children, variant, title });
}

Alert.displayName = "Alert";
