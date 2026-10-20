import React, { forwardRef, type HTMLAttributes } from "react";
import type { FlexAlign, FlexJustify, FlexDirection } from "../../core/types";
import { classNames } from "../../core/classNames";

export interface FlexProps extends HTMLAttributes<HTMLDivElement> {
  direction?: FlexDirection;
  align?: FlexAlign;
  justify?: FlexJustify;
  wrap?: boolean | "wrap" | "nowrap" | "wrap-reverse";
  gap?: string | number;
  inline?: boolean;
}

export const Flex = forwardRef<HTMLDivElement, FlexProps>(
  (
    {
      direction = "row",
      align = "stretch",
      justify = "start",
      wrap = false,
      gap,
      inline = false,
      className = "",
      style,
      children,
      ...props
    },
    ref
  ) => {
    const inlineStyles: React.CSSProperties = {
      ...style,
      display: inline ? "inline-flex" : "flex",
      flexDirection: direction,
      alignItems: align === "start" ? "flex-start" : align === "end" ? "flex-end" : align,
      justifyContent:
        justify === "start"
          ? "flex-start"
          : justify === "end"
          ? "flex-end"
          : justify === "between"
          ? "space-between"
          : justify === "around"
          ? "space-around"
          : justify === "evenly"
          ? "space-evenly"
          : justify,
      flexWrap: typeof wrap === "boolean" ? (wrap ? "wrap" : "nowrap") : wrap,
      ...(gap !== undefined ? { gap } : {}),
    };

    return (
      <div ref={ref} className={classNames("cr-flex", className)} style={inlineStyles} {...props}>
        {children}
      </div>
    );
  }
);

Flex.displayName = "Flex";
