import React, { forwardRef, type HTMLAttributes, type ReactElement } from "react";
import type { ComponentSize, ComponentVariant } from "../../core/types";
import { classNames } from "../../core/classNames";
import {
  parseBadgeShorthand,
  createBadgeFromShorthand,
  type BadgeShorthandConfig,
  type BadgeChainable,
} from "../../core/shorthand";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: ComponentVariant;
  size?: ComponentSize;
  pill?: boolean;
  dot?: boolean;
}

export const BaseBadge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = "primary", size = "sm", pill = true, dot = false, className = "", children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={classNames(
          "cr-badge",
          `cr-badge--${variant}`,
          `cr-badge--${size}`,
          pill && "cr-badge--pill",
          className
        )}
        {...props}
      >
        {dot && <span className="cr-badge__dot" />}
        {children}
      </span>
    );
  }
);

BaseBadge.displayName = "BaseBadge";

/**
 * Universal Badge:
 * 1. English Chaining:
 *    Badge("NEW").green().small()
 * 2. Natural English phrase:
 *    Badge("NEW, in green, small")
 * 3. JSX Component:
 *    <Badge variant="success">New</Badge>
 */
export function Badge(props: BadgeProps): ReactElement;
export function Badge(
  label?: string,
  size?: string,
  id?: string,
  color?: string,
  position?: string
): ReactElement & BadgeChainable;
export function Badge(strings: TemplateStringsArray, ...values: any[]): ReactElement & BadgeChainable;
export function Badge(...args: any[]): ReactElement & BadgeChainable {
  if (
    typeof args[0] === "string" ||
    (Array.isArray(args[0]) && (args[0] as any).raw) ||
    args.length === 0
  ) {
    const config = parseBadgeShorthand(args);
    return createBadgeFromShorthand(config);
  }

  const props = (args[0] || {}) as BadgeProps;
  return (<BaseBadge {...props} />) as any;
}

Badge.displayName = "Badge";
Badge.create = (config: BadgeShorthandConfig) => createBadgeFromShorthand(config);

