import React, { forwardRef, type HTMLAttributes } from "react";
import { classNames } from "../../core/classNames";

export interface DividerProps extends HTMLAttributes<HTMLHRElement> {
  orientation?: "horizontal" | "vertical";
  variant?: "solid" | "dashed" | "dotted";
}

export const Divider = forwardRef<HTMLHRElement, DividerProps>(
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

Divider.displayName = "Divider";
