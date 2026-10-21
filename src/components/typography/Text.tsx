import React, { forwardRef, type HTMLAttributes, type ReactElement } from "react";
import type { ComponentSize } from "../../core/types";
import { classNames } from "../../core/classNames";
import {
  parseTextShorthand,
  createTextFromShorthand,
  type TextShorthandConfig,
  type TextChainable,
} from "../../core/shorthand";

export interface TextProps extends HTMLAttributes<HTMLElement> {
  size?: ComponentSize;
  weight?: "normal" | "medium" | "semibold" | "bold";
  color?: "primary" | "secondary" | "muted" | "inverse" | "brand";
  align?: "left" | "center" | "right" | "justify";
  truncate?: boolean;
  as?: "p" | "span" | "div" | "label";
}

export const BaseText = forwardRef<HTMLElement, TextProps>(
  (
    {
      size = "md",
      weight = "normal",
      color = "primary",
      align = "left",
      truncate = false,
      as = "p",
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    const Component = as as any;

    return (
      <Component
        ref={ref}
        className={classNames(
          "cr-text",
          `cr-text--${size}`,
          `cr-text--weight-${weight}`,
          `cr-text--color-${color}`,
          `cr-text--align-${align}`,
          truncate && "cr-text--truncate",
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

BaseText.displayName = "BaseText";

/**
 * Universal Text:
 * 1. English Chaining:
 *    Text("Criation UI is awesome").muted().center().small()
 * 2. Natural English phrase:
 *    Text("Fast shipping worldwide, centered, muted, small")
 * 3. JSX Component:
 *    <Text>Hello</Text>
 */
export function Text(props: TextProps): ReactElement;
export function Text(
  content?: string,
  size?: string,
  id?: string,
  color?: string,
  align?: string,
  position?: string
): ReactElement & TextChainable;
export function Text(strings: TemplateStringsArray, ...values: any[]): ReactElement & TextChainable;
export function Text(...args: any[]): ReactElement & TextChainable {
  if (
    typeof args[0] === "string" ||
    (Array.isArray(args[0]) && (args[0] as any).raw) ||
    args.length === 0
  ) {
    const config = parseTextShorthand(args);
    return createTextFromShorthand(config);
  }

  const props = (args[0] || {}) as TextProps;
  return (<BaseText {...props} />) as any;
}

Text.displayName = "Text";
Text.create = (config: TextShorthandConfig) => createTextFromShorthand(config);

