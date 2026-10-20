import React, { forwardRef, type HTMLAttributes } from "react";
import { classNames } from "../../core/classNames";

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  columns?: number | string;
  rows?: number | string;
  gap?: string | number;
  rowGap?: string | number;
  columnGap?: string | number;
}

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ columns = 1, rows, gap, rowGap, columnGap, className = "", style, children, ...props }, ref) => {
    const templateColumns =
      typeof columns === "number" ? `repeat(${columns}, minmax(0, 1fr))` : columns;
    const templateRows =
      typeof rows === "number" ? `repeat(${rows}, minmax(0, 1fr))` : rows;

    return (
      <div
        ref={ref}
        className={classNames("cr-grid", className)}
        style={{
          display: "grid",
          gridTemplateColumns: templateColumns,
          gridTemplateRows: templateRows,
          gap,
          rowGap,
          columnGap,
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Grid.displayName = "Grid";
