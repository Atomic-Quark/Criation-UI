import React, { forwardRef, type HTMLAttributes, type ReactNode, type ReactElement } from "react";
import type { FlexAlign, FlexJustify } from "../../core/types";
import { classNames } from "../../core/classNames";
import { createChainableProxy } from "../../core/shorthand";

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  direction?: "row" | "column";
  spacing?: string | number;
  align?: FlexAlign;
  justify?: FlexJustify;
  wrap?: boolean;
}

export const BaseStack = forwardRef<HTMLDivElement, StackProps>(
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

BaseStack.displayName = "BaseStack";

export interface StackChainable {
  build(): ReactElement;
  row(): ReactElement & StackChainable;
  column(): ReactElement & StackChainable;
  gap(spacing: string | number): ReactElement & StackChainable;
  spacing(s: string | number): ReactElement & StackChainable;
  center(): ReactElement & StackChainable;
  align(a: FlexAlign): ReactElement & StackChainable;
  justify(j: FlexJustify): ReactElement & StackChainable;
  wrap(): ReactElement & StackChainable;
}

function attachStackChaining(
  element: ReactElement,
  props: StackProps,
  children: ReactNode[]
): ReactElement & StackChainable {
  const update = (patch: Partial<StackProps>) =>
    createStackElement({ ...props, ...patch }, children);

  return createChainableProxy(element, {
    build: () => element,
    row: () => update({ direction: "row" }),
    column: () => update({ direction: "column" }),
    gap: (g: string | number) => update({ spacing: g }),
    spacing: (s: string | number) => update({ spacing: s }),
    center: () => update({ align: "center", justify: "center" }),
    align: (a: FlexAlign) => update({ align: a }),
    justify: (j: FlexJustify) => update({ justify: j }),
    wrap: () => update({ wrap: true }),
  });
}

function createStackElement(props: StackProps, children: ReactNode[]): ReactElement & StackChainable {
  const mapped = React.Children.map(children, (child, i) =>
    React.isValidElement(child) ? React.cloneElement(child, { key: child.key || `stk-${i}` }) : child
  );
  const element = <BaseStack {...props}>{mapped}</BaseStack>;
  return attachStackChaining(element, props, children);
}

/**
 * Universal Stack:
 * 1. English Chaining:
 *    Stack(Heading("Welcome"), Button("Click")).row().gap("1.5rem")
 * 2. Natural Function Call:
 *    Stack([ Heading("Welcome"), Text("Hello") ])
 * 3. JSX Component:
 *    <Stack direction="row" spacing="1rem">...</Stack>
 */
export function Stack(props: StackProps): ReactElement;
export function Stack(...children: ReactNode[]): ReactElement & StackChainable;
export function Stack(direction: "row" | "column", ...children: ReactNode[]): ReactElement & StackChainable;
export function Stack(direction: "row" | "column", children: ReactNode[]): ReactElement & StackChainable;
export function Stack(first?: any, ...rest: any[]): ReactElement & StackChainable {
  if (
    first &&
    typeof first === "object" &&
    !React.isValidElement(first) &&
    !Array.isArray(first) &&
    ("direction" in first || "spacing" in first || "align" in first || "justify" in first || "children" in first || "className" in first)
  ) {
    return (<BaseStack {...first} />) as any;
  }

  let children: ReactNode[] = [];
  let direction: "row" | "column" = "column";
  let spacing = "1rem";

  if (first === "row" || first === "column") {
    direction = first;
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

  return createStackElement({ direction, spacing }, children);
}

Stack.displayName = "Stack";
