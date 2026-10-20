import React, { forwardRef, type HTMLAttributes, type ReactElement } from "react";
import { classNames } from "../../core/classNames";
import {
  parseHeadingShorthand,
  createHeadingFromShorthand,
  type HeadingShorthandConfig,
} from "../../core/shorthand";

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  weight?: "semibold" | "bold" | "extrabold";
  gradient?: boolean;
}

export const BaseHeading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ level = 2, size, weight = "bold", gradient = false, className = "", children, ...props }, ref: any) => {
    const Component = `h${level}` as const;
    const computedSize = size || (level === 1 ? "2xl" : level === 2 ? "xl" : level === 3 ? "lg" : "md");

    return (
      <Component
        ref={ref}
        className={classNames(
          "cr-heading",
          `cr-heading--${computedSize}`,
          `cr-heading--weight-${weight}`,
          gradient && "cr-heading--gradient",
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

BaseHeading.displayName = "BaseHeading";

/**
 * Universal Heading:
 * 1. 1-Line Shorthand (all slots optional):
 *    Heading("Welcome to My Store", 1, "store_title", "gradient", "center")
 * 2. JSX Component:
 *    <Heading level={1}>Welcome</Heading>
 */
export function Heading(props: HeadingProps): ReactElement;
export function Heading(
  text?: string,
  levelOrSize?: number | string,
  id?: string,
  color?: string,
  align?: string,
  position?: string
): ReactElement;
export function Heading(strings: TemplateStringsArray, ...values: any[]): ReactElement;
export function Heading(...args: any[]): ReactElement {
  if (
    typeof args[0] === "string" ||
    (Array.isArray(args[0]) && (args[0] as any).raw) ||
    args.length === 0
  ) {
    const config = parseHeadingShorthand(args);
    return createHeadingFromShorthand(config);
  }

  const props = (args[0] || {}) as HeadingProps;
  return <BaseHeading {...props} />;
}

Heading.displayName = "Heading";
Heading.create = (config: HeadingShorthandConfig) => createHeadingFromShorthand(config);
