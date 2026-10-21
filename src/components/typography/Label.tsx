import React, { forwardRef, type LabelHTMLAttributes, type ReactElement, type ReactNode } from "react";
import type { ComponentSize } from "../../core/types";
import { classNames } from "../../core/classNames";
import { createChainableProxy } from "../../core/shorthand";

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  size?: ComponentSize;
  required?: boolean;
  disabled?: boolean;
  optionalText?: string;
  children?: ReactNode;
}

export const BaseLabel = forwardRef<HTMLLabelElement, LabelProps>(
  (
    {
      size = "md",
      required = false,
      disabled = false,
      optionalText,
      className = "",
      style,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <label
        ref={ref}
        className={classNames(
          "cr-label",
          `cr-label--${size}`,
          required && "is-required",
          disabled && "is-disabled",
          className
        )}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.25rem",
          fontSize: size === "sm" ? "0.8125rem" : size === "lg" ? "1.0625rem" : "0.9375rem",
          fontWeight: 500,
          color: disabled ? "var(--cr-text-muted)" : "var(--cr-text-primary)",
          cursor: disabled ? "not-allowed" : "pointer",
          userSelect: "none",
          ...style,
        }}
        {...props}
      >
        <span>{children}</span>
        {required && (
          <span
            className="cr-label__required"
            style={{ color: "var(--cr-danger)", marginLeft: "0.125rem" }}
            aria-hidden="true"
          >
            *
          </span>
        )}
        {optionalText && (
          <span
            className="cr-label__optional"
            style={{
              fontSize: "0.75rem",
              color: "var(--cr-text-muted)",
              fontWeight: 400,
              marginLeft: "0.25rem",
            }}
          >
            ({optionalText})
          </span>
        )}
      </label>
    );
  }
);

BaseLabel.displayName = "BaseLabel";

export interface LabelChainable {
  required(req?: boolean): ReactElement & LabelChainable;
  disabled(dis?: boolean): ReactElement & LabelChainable;
  for(htmlFor: string): ReactElement & LabelChainable;
  htmlFor(id: string): ReactElement & LabelChainable;
  small(): ReactElement & LabelChainable;
  large(): ReactElement & LabelChainable;
}

function createLabelElement(props: LabelProps): ReactElement & LabelChainable {
  const el = React.createElement(BaseLabel, props);
  return createChainableProxy(el, {
    required: (req = true) => createLabelElement({ ...props, required: req }),
    disabled: (dis = true) => createLabelElement({ ...props, disabled: dis }),
    for: (htmlFor: string) => createLabelElement({ ...props, htmlFor }),
    htmlFor: (htmlFor: string) => createLabelElement({ ...props, htmlFor }),
    small: () => createLabelElement({ ...props, size: "sm" }),
    large: () => createLabelElement({ ...props, size: "lg" }),
  });
}

export function Label(props: LabelProps): ReactElement;
export function Label(text: ReactNode, ...rest: any[]): ReactElement & LabelChainable;
export function Label(...args: any[]): ReactElement & LabelChainable {
  if (typeof args[0] === "string" || React.isValidElement(args[0])) {
    const text = args[0];
    let required = false;
    let htmlFor: string | undefined;

    for (let i = 1; i < args.length; i++) {
      const a = args[i];
      if (typeof a === "string") {
        const s = a.trim().toLowerCase();
        if (s === "required" || s === "*") required = true;
        else if (!htmlFor) htmlFor = a.trim();
      } else if (typeof a === "boolean") {
        required = a;
      }
    }

    return createLabelElement({ children: text, required, htmlFor });
  }

  const { ref, ...props } = (args[0] || {}) as LabelProps & { ref?: any };
  return React.createElement(BaseLabel, { ref, ...props }) as any;
}

Label.displayName = "Label";
