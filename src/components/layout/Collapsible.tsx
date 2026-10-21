import React, { forwardRef, useState, type HTMLAttributes, type ReactElement, type ReactNode } from "react";
import { classNames } from "../../core/classNames";
import { createChainableProxy } from "../../core/shorthand";

export interface CollapsibleProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title?: ReactNode;
  isOpen?: boolean;
  defaultOpen?: boolean;
  onToggle?: (open: boolean) => void;
  children?: ReactNode;
}

export const BaseCollapsible = forwardRef<HTMLDivElement, CollapsibleProps>(
  (
    {
      title,
      isOpen: controlledOpen,
      defaultOpen = false,
      onToggle,
      className = "",
      style,
      children,
      ...props
    },
    ref
  ) => {
    const isControlled = controlledOpen !== undefined;
    const [internalOpen, setInternalOpen] = useState(defaultOpen);
    const isOpen = isControlled ? controlledOpen : internalOpen;

    const handleToggle = () => {
      const next = !isOpen;
      if (!isControlled) setInternalOpen(next);
      onToggle?.(next);
    };

    return (
      <div
        ref={ref}
        className={classNames("cr-collapsible", isOpen && "is-open", className)}
        style={{
          border: "1px solid var(--cr-border-subtle)",
          borderRadius: "var(--cr-radius-md)",
          overflow: "hidden",
          backgroundColor: "var(--cr-bg-surface)",
          ...style,
        }}
        {...props}
      >
        {title && (
          <button
            type="button"
            onClick={handleToggle}
            aria-expanded={isOpen}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0.875rem 1rem",
              background: "transparent",
              border: "none",
              color: "var(--cr-text-primary)",
              fontWeight: 600,
              fontSize: "0.9375rem",
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            <span>{title}</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              style={{
                transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform var(--cr-transition-fast)",
                color: "var(--cr-text-muted)",
              }}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        )}

        {isOpen && (
          <div
            style={{
              padding: "0.875rem 1rem",
              borderTop: title ? "1px solid var(--cr-border-subtle)" : "none",
              color: "var(--cr-text-secondary)",
              fontSize: "0.875rem",
              lineHeight: 1.6,
            }}
          >
            {children}
          </div>
        )}
      </div>
    );
  }
);

BaseCollapsible.displayName = "BaseCollapsible";

export interface CollapsibleChainable {
  open(o?: boolean): ReactElement & CollapsibleChainable;
}

function createCollapsibleElement(props: CollapsibleProps): ReactElement & CollapsibleChainable {
  const el = React.createElement(BaseCollapsible, props);
  return createChainableProxy(el, {
    open: (o = true) => createCollapsibleElement({ ...props, isOpen: o }),
  });
}

export function Collapsible(props: CollapsibleProps): ReactElement;
export function Collapsible(title: ReactNode, content?: ReactNode): ReactElement & CollapsibleChainable;
export function Collapsible(...args: any[]): ReactElement & CollapsibleChainable {
  if (typeof args[0] === "string" || React.isValidElement(args[0])) {
    return createCollapsibleElement({ title: args[0], children: args[1] });
  }

  const { ref, ...props } = (args[0] || {}) as CollapsibleProps & { ref?: any };
  return React.createElement(BaseCollapsible, { ref, ...props }) as any;
}

Collapsible.displayName = "Collapsible";
