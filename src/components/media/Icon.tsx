import React, { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import type { ComponentSize } from "../../core/types";
import { classNames } from "../../core/classNames";

export interface IconProps extends HTMLAttributes<HTMLSpanElement> {
  size?: ComponentSize | number;
  color?: string;
  spin?: boolean;
  children: ReactNode;
}

export const Icon = forwardRef<HTMLSpanElement, IconProps>(
  ({ size = "md", color, spin = false, className = "", style, children, ...props }, ref) => {
    const sizeMap: Record<ComponentSize, string> = {
      xs: "0.875rem",
      sm: "1rem",
      md: "1.25rem",
      lg: "1.5rem",
      xl: "2rem",
    };

    const finalSize = typeof size === "number" ? `${size}px` : sizeMap[size];

    return (
      <span
        ref={ref}
        className={classNames(
          "cr-icon",
          spin && "cr-animate-spin",
          className
        )}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: finalSize,
          width: finalSize,
          height: finalSize,
          color,
          ...style,
        }}
        aria-hidden="true"
        {...props}
      >
        {children}
      </span>
    );
  }
);

Icon.displayName = "Icon";
