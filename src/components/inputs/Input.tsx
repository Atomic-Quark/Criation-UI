import React, { forwardRef, type InputHTMLAttributes, type ReactNode, type ReactElement, type Ref } from "react";
import type { ComponentSize, CursorType } from "../../core/types";
import { classNames } from "../../core/classNames";
import {
  parseInputShorthand,
  createInputFromShorthand,
  type InputShorthandConfig,
} from "../../core/shorthand";

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: ComponentSize;
  error?: boolean | string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  isClearable?: boolean;
  onClear?: () => void;
  cursor?: CursorType;
  ref?: Ref<HTMLInputElement>;
}

export const BaseInput = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = "md",
      error,
      leftIcon,
      rightIcon,
      isClearable = false,
      onClear,
      cursor,
      disabled,
      className = "",
      style,
      value,
      ...props
    },
    ref
  ) => {
    const hasError = Boolean(error);
    const showClear = isClearable && !disabled && Boolean(value);

    return (
      <div
        className={classNames(
          "cr-input-wrapper",
          `cr-input-wrapper--${size}`,
          hasError && "has-error",
          disabled && "is-disabled",
          leftIcon && "has-left-icon",
          (rightIcon || showClear) && "has-right-icon",
          className
        )}
        style={style}
      >
        {leftIcon && <span className="cr-input__icon cr-input__icon--left">{leftIcon}</span>}
        <input
          ref={ref}
          disabled={disabled}
          value={value}
          className="cr-input"
          style={{ cursor }}
          aria-invalid={hasError}
          {...props}
        />
        {showClear && (
          <button
            type="button"
            className="cr-input__clear"
            onClick={onClear}
            tabIndex={-1}
            aria-label="Clear input"
          >
            ✕
          </button>
        )}
        {!showClear && rightIcon && (
          <span className="cr-input__icon cr-input__icon--right">{rightIcon}</span>
        )}
      </div>
    );
  }
);

BaseInput.displayName = "BaseInput";

/**
 * Universal Input:
 * 1. 1-Line Shorthand (all slots optional):
 *    Input("Enter your email", "300px", "email_id", "email")
 * 2. JSX Component:
 *    <Input placeholder="Enter your email" />
 */
export function Input(props: InputProps): ReactElement;
export function Input(
  placeholderOrClass?: string,
  boxSize?: string,
  id?: string,
  type?: string,
  label?: string,
  color?: string,
  position?: string,
  pointer?: string
): ReactElement;
export function Input(strings: TemplateStringsArray, ...values: any[]): ReactElement;
export function Input(...args: any[]): ReactElement {
  if (
    typeof args[0] === "string" ||
    (Array.isArray(args[0]) && (args[0] as any).raw) ||
    args.length === 0
  ) {
    const config = parseInputShorthand(args);
    return createInputFromShorthand(config);
  }

  const { ref, ...props } = (args[0] || {}) as InputProps;
  return <BaseInput ref={ref} {...props} />;
}

Input.displayName = "Input";
Input.create = (config: InputShorthandConfig) => createInputFromShorthand(config);
