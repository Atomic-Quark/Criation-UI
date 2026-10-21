import React, { forwardRef, type HTMLAttributes, type ReactNode, type ReactElement } from "react";
import type { ComponentSize } from "../../core/types";
import { classNames } from "../../core/classNames";
import {
  parseCardShorthand,
  createCardFromShorthand,
  type CardShorthandConfig,
  type CardChainable,
} from "../../core/shorthand";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "elevated" | "outline" | "glass" | "subtle";
  padding?: ComponentSize | "none";
  interactive?: boolean;
  header?: ReactNode;
  footer?: ReactNode;
}

export const BaseCard = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = "outline",
      padding = "md",
      interactive = false,
      header,
      footer,
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={classNames(
          "cr-card",
          `cr-card--${variant}`,
          `cr-card--padding-${padding}`,
          interactive && "cr-card--interactive",
          className
        )}
        {...props}
      >
        {header && <div className="cr-card__header">{header}</div>}
        <div className="cr-card__body">{children}</div>
        {footer && <div className="cr-card__footer">{footer}</div>}
      </div>
    );
  }
);

BaseCard.displayName = "BaseCard";

/**
 * Universal Card:
 * 1. English Chaining:
 *    Card("Pro Plan").glass().width("350px")
 * 2. Natural English phrase:
 *    Card("Pro Plan, glass, width 350px")
 * 3. JSX Component:
 *    <Card variant="glass">...</Card>
 */
export function Card(props: CardProps): ReactElement;
export function Card(
  content?: ReactNode,
  boxSize?: string,
  id?: string,
  variant?: "glass" | "outline" | "elevated" | "subtle",
  color?: string,
  position?: string,
  pointer?: string
): ReactElement & CardChainable;
export function Card(...args: any[]): ReactElement & CardChainable {
  // If first argument is React props object with children or variant and NOT an array or primitive
  const first = args[0];
  const isPropsObject =
    first &&
    typeof first === "object" &&
    !Array.isArray(first) &&
    !React.isValidElement(first) &&
    ("children" in first || "variant" in first || "padding" in first);

  if (isPropsObject) {
    return (<BaseCard {...first} />) as any;
  }

  const config = parseCardShorthand(args);
  return createCardFromShorthand(config);
}

Card.displayName = "Card";
Card.create = (config: CardShorthandConfig) => createCardFromShorthand(config);

