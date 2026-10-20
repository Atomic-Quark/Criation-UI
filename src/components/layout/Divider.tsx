import React, { forwardRef, type HTMLAttributes, type ReactElement } from "react";
import { classNames } from "../../core/classNames";

export interface DividerProps extends HTMLAttributes<HTMLHRElement> {
  orientation?: "horizontal" | "vertical";
  variant?: "solid" | "dashed" | "dotted";
}

export const BaseDivider = forwardRef<HTMLHRElement, DividerProps>(
  ({ orientation = "horizontal", variant = "solid", className = "", ...props }, ref) => {
    return (
      <hr
        ref={ref}
        className={classNames(
          "cr-divider",
          `cr-divider--${orientation}`,
          `cr-divider--${variant}`,
          className
        )}
        {...props}
      />
    );
  }
);

BaseDivider.displayName = "BaseDivider";

/**
 * Universal Divider:
 * 1. Simple Function:
 *    Divider() or Divider("dashed")
 * 2. JSX Component:
 *    <Divider variant="dashed" />
 */
export function Divider(props?: DividerProps | "solid" | "dashed" | "dotted" | "horizontal" | "vertical"): ReactElement {
  if (typeof props === "string") {
    if (props === "vertical" || props === "horizontal") {
      return <BaseDivider orientation={props} />;
    }
    return <BaseDivider variant={props as any} />;
  }
  return <BaseDivider {...(props || {})} />;
}

Divider.displayName = "Divider";
