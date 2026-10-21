import React, { forwardRef, type HTMLAttributes, type ReactNode, type ReactElement } from "react";
import type { FlexAlign, FlexJustify, FlexDirection } from "../../core/types";
import { classNames } from "../../core/classNames";
import { createChainableProxy } from "../../core/shorthand";

export interface FlexProps extends HTMLAttributes<HTMLDivElement> {
  direction?: FlexDirection;
  align?: FlexAlign;
  justify?: FlexJustify;
  wrap?: boolean | "wrap" | "nowrap" | "wrap-reverse";
  gap?: string | number;
  inline?: boolean;
}

export const BaseFlex = forwardRef<HTMLDivElement, FlexProps>(
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

BaseFlex.displayName = "BaseFlex";

export interface FlexChainable {
  center(): ReactElement & FlexChainable;
  between(): ReactElement & FlexChainable;
  around(): ReactElement & FlexChainable;
  gap(g: string | number): ReactElement & FlexChainable;
  column(): ReactElement & FlexChainable;
  row(): ReactElement & FlexChainable;
  wrap(): ReactElement & FlexChainable;
}

function attachFlexChaining(
  element: ReactElement,
  props: FlexProps,
  children: ReactNode[]
): ReactElement & FlexChainable {
  const update = (patch: Partial<FlexProps>) =>
    createFlexElement({ ...props, ...patch }, children);

  return createChainableProxy(element, {
    center: () => update({ align: "center", justify: "center" }),
    between: () => update({ justify: "between" }),
    around: () => update({ justify: "around" }),
    gap: (g: string | number) => update({ gap: g }),
    column: () => update({ direction: "column" }),
    row: () => update({ direction: "row" }),
    wrap: () => update({ wrap: true }),
  });
}

function createFlexElement(props: FlexProps, children: ReactNode[]): ReactElement & FlexChainable {
  const mapped = React.Children.map(children, (child, i) =>
    React.isValidElement(child) ? React.cloneElement(child, { key: child.key || `flx-${i}` }) : child
  );
  const element = <BaseFlex {...props}>{mapped}</BaseFlex>;
  return attachFlexChaining(element, props, children);
}

/**
 * Universal Flex:
 * 1. English Chaining:
 *    Flex(Button("A"), Button("B")).between().gap("1rem")
 * 2. Natural Function Call:
 *    Flex([ Button("A"), Button("B") ])
 * 3. JSX Component:
 *    <Flex justify="between">...</Flex>
 */
export function Flex(props: FlexProps): ReactElement;
export function Flex(...children: ReactNode[]): ReactElement & FlexChainable;
export function Flex(children: ReactNode[]): ReactElement & FlexChainable;
export function Flex(first?: any, ...rest: any[]): ReactElement & FlexChainable {
  if (
    first &&
    typeof first === "object" &&
    !React.isValidElement(first) &&
    !Array.isArray(first) &&
    ("direction" in first || "align" in first || "justify" in first || "gap" in first || "children" in first || "className" in first)
  ) {
    return (<BaseFlex {...first} />) as any;
  }

  let children: ReactNode[] = [];
  if (Array.isArray(first)) {
    children = first;
  } else if (first !== undefined) {
    children = [first, ...rest];
  }

  return createFlexElement({}, children);
}

Flex.displayName = "Flex";
