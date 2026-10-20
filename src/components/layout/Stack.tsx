import React, { forwardRef, type HTMLAttributes } from "react";
import type { FlexAlign, FlexJustify } from "../../core/types";
import { classNames } from "../../core/classNames";

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  direction?: "row" | "column";
  spacing?: string | number;
  align?: FlexAlign;
  justify?: FlexJustify;
  wrap?: boolean;
}

export const Stack = forwardRef<HTMLDivElement, StackProps>(
  (
    {
      direction = "column",
      spacing = "1rem",
      align = "stretch",
      justify = "start",
      wrap = false,
      className = "",
      style,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={classNames("cr-stack", `cr-stack--${direction}`, className)}
        style={{
          display: "flex",
          flexDirection: direction,
          gap: spacing,
          alignItems: align === "start" ? "flex-start" : align === "end" ? "flex-end" : align,
          justifyContent:
            justify === "start"
              ? "flex-start"
              : justify === "end"
              ? "flex-end"
              : justify === "between"
              ? "space-between"
              : justify,
          flexWrap: wrap ? "wrap" : "nowrap",
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Stack.displayName = "Stack";
