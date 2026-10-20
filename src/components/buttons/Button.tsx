import React, { forwardRef, type ButtonHTMLAttributes, type ReactNode, type ReactElement, type Ref } from "react";
import type { ComponentSize, ComponentVariant, CursorType } from "../../core/types";
import { classNames } from "../../core/classNames";
import {
  parseButtonShorthand,
  createButtonFromShorthand,
  createButtonDOMElement,
  type ButtonShorthandConfig,
  type ButtonChainable,
} from "../../core/shorthand";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ComponentVariant;
  size?: ComponentSize;
  loading?: boolean;
  loadingText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  cursor?: CursorType;
  color?: string;
  background?: string;
  ref?: Ref<HTMLButtonElement>;
}

export const BaseButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      loadingText,
      leftIcon,
      rightIcon,
      fullWidth = false,
      cursor,
      color,
      background,
      disabled,
      className = "",
      children,
      type = "button",
      style,
      ...props
    },
    ref
  ) => {
    const classes = classNames(
      "cr-button",
      `cr-button--${variant}`,
      `cr-button--${size}`,
      fullWidth && "cr-button--full-width",
      loading && "is-loading",
      disabled && "is-disabled",
      className
    );

    const inlineStyles: React.CSSProperties = {
      ...style,
      cursor: cursor || (disabled || loading ? "not-allowed" : "pointer"),
      ...(color ? { color } : {}),
      ...(background ? { background } : {}),
    };

    return (
      <button
        ref={ref}
        {...props}
        type={type}
        className={classes}
        style={inlineStyles}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        aria-disabled={disabled || loading}
      >
        {loading && (
          <span className="cr-button__spinner" aria-hidden="true">
            <svg
              className="cr-animate-spin"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
              <path d="M12 2a10 10 0 0 1 10 10" />
            </svg>
          </span>
        )}
        {!loading && leftIcon && (
          <span className="cr-button__icon cr-button__icon--left">{leftIcon}</span>
        )}
        <span className="cr-button__content">
          {loading && loadingText ? loadingText : children}
        </span>
        {!loading && rightIcon && (
          <span className="cr-button__icon cr-button__icon--right">{rightIcon}</span>
        )}
      </button>
    );
  }
);

BaseButton.displayName = "BaseButton";

/**
 * Universal Button:
 * 1. English Chaining:
 *    Button("Go to cart").red().link("/cart").auth()
 * 2. Natural English phrase / shorthand:
 *    Button("Go to cart, colored red, go to /cart, auth required")
 * 3. Tagged template literal:
 *    Button`"Go_to_cart", "10px 2px", "ID", "Auth", "path_direction", "red", "position", "pointer"`
 * 4. JSX component:
 *    <Button variant="primary">Click</Button>
 */
export function Button(props: ButtonProps): ReactElement;
export function Button(
  classNameOrLabel?: string,
  boxSize?: string,
  id?: string,
  auth?: string,
  pathDirection?: string,
  color?: string,
  position?: string,
  pointer?: string
): ReactElement & ButtonChainable;
export function Button(strings: TemplateStringsArray, ...values: any[]): ReactElement & ButtonChainable;
export function Button(...args: any[]): ReactElement & ButtonChainable {
  // If first argument is string or template strings array -> Shorthand syntax!
  if (
    typeof args[0] === "string" ||
    (Array.isArray(args[0]) && (args[0] as any).raw)
  ) {
    const config = parseButtonShorthand(args);
    return createButtonFromShorthand(config);
  }

  // Otherwise standard React props object
  const { ref, ...props } = (args[0] || {}) as ButtonProps;
  return (<BaseButton ref={ref} {...props} />) as any;
}

// Helpers attached to Button
Button.displayName = "Button";
Button.create = (config: ButtonShorthandConfig) => createButtonFromShorthand(config);
Button.element = (
  classNameOrLabel: string,
  boxSize?: string,
  id?: string,
  auth?: string,
  pathDirection?: string,
  color?: string,
  position?: string,
  pointer?: string
) => {
  const config = parseButtonShorthand([
    classNameOrLabel,
    boxSize,
    id,
    auth,
    pathDirection,
    color,
    position,
    pointer,
  ]);
  return createButtonDOMElement(config);
};
