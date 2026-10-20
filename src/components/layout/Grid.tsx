import React, { forwardRef, type HTMLAttributes, type ReactNode, type ReactElement } from "react";
import { classNames } from "../../core/classNames";
import { createChainableProxy } from "../../core/shorthand";

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  columns?: number | string;
  rows?: number | string;
  minChildWidth?: string;
  gap?: string | number;
  rowGap?: string | number;
  columnGap?: string | number;
}

export const BaseGrid = forwardRef<HTMLDivElement, GridProps>(
  ({ columns = 1, rows, minChildWidth, gap, rowGap, columnGap, className = "", style, children, ...props }, ref) => {
    const templateColumns = minChildWidth
      ? `repeat(auto-fit, minmax(${minChildWidth}, 1fr))`
      : typeof columns === "number"
      ? `repeat(${columns}, minmax(0, 1fr))`
      : columns;
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

BaseGrid.displayName = "BaseGrid";

export interface GridChainable {
  columns(n: number | string): ReactElement & GridChainable;
  gap(g: string | number): ReactElement & GridChainable;
  autoFit(minWidth: string): ReactElement & GridChainable;
}

function attachGridChaining(
  element: ReactElement,
  props: GridProps,
  children: ReactNode[]
): ReactElement & GridChainable {
  const update = (patch: Partial<GridProps>) =>
    createGridElement({ ...props, ...patch }, children);

  return createChainableProxy(element, {
    columns: (n: number | string) => update({ columns: n }),
    gap: (g: string | number) => update({ gap: g }),
    autoFit: (minWidth: string) => update({ minChildWidth: minWidth }),
  });
}

function createGridElement(props: GridProps, children: ReactNode[]): ReactElement & GridChainable {
  const mapped = React.Children.map(children, (child, i) =>
    React.isValidElement(child) ? React.cloneElement(child, { key: child.key || `grd-${i}` }) : child
  );
  const element = <BaseGrid {...props}>{mapped}</BaseGrid>;
  return attachGridChaining(element, props, children);
}

/**
 * Universal Grid:
 * 1. English Chaining:
 *    Grid(3, [ Card(1), Card(2), Card(3) ]).gap("1.5rem")
 * 2. Natural Function Call:
 *    Grid(2, Card("A"), Card("B"))
 * 3. JSX Component:
 *    <Grid columns={3}>...</Grid>
 */
export function Grid(props: GridProps): ReactElement;
export function Grid(columns: number | string, children: ReactNode[]): ReactElement & GridChainable;
export function Grid(columns: number | string, ...children: ReactNode[]): ReactElement & GridChainable;
export function Grid(children: ReactNode[]): ReactElement & GridChainable;
export function Grid(...children: ReactNode[]): ReactElement & GridChainable;
export function Grid(first?: any, ...rest: any[]): ReactElement & GridChainable {
  if (
    first &&
    typeof first === "object" &&
    !React.isValidElement(first) &&
    !Array.isArray(first) &&
    ("columns" in first || "rows" in first || "gap" in first || "children" in first || "className" in first)
  ) {
    return (<BaseGrid {...first} />) as any;
  }

  let columns: number | string = 1;
  let children: ReactNode[] = [];
  let gap: string | number = "1rem";

  if (typeof first === "number" || (typeof first === "string" && !isElementLike(first))) {
    columns = first;
    if (rest.length === 1 && Array.isArray(rest[0])) {
      children = rest[0];
    } else {
      children = rest;
    }
  } else if (Array.isArray(first)) {
    children = first;
  } else if (first !== undefined) {
    children = [first, ...rest];
  }

  return createGridElement({ columns, gap }, children);
}

function isElementLike(val: any): boolean {
  return React.isValidElement(val) || (typeof val === "object" && val !== null && "$$typeof" in val);
}

Grid.displayName = "Grid";
