import React, { forwardRef, type InputHTMLAttributes, type ReactNode, type ReactElement, type Ref } from "react";
import type { ComponentSize, CursorType } from "../../core/types";
import { classNames } from "../../core/classNames";
import {
  parseInputShorthand,
  createInputFromShorthand,
  type InputShorthandConfig,
  type InputChainable,
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
    const errorMessage = typeof error === "string" ? error : undefined;
    const showClear = isClearable && !disabled && Boolean(value);
    const errorId = props.id ? `${props.id}-error` : undefined;

    const inputWrapper = (
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
          aria-describedby={errorMessage && errorId ? errorId : props["aria-describedby"]}
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

    if (errorMessage) {
      return (
        <div className="cr-input-field" style={{ display: "inline-flex", flexDirection: "column", width: style?.width || "100%" }}>
          {inputWrapper}
          <span id={errorId} className="cr-input__error-message" role="alert" style={{ color: "var(--cr-danger, #f43f5e)", fontSize: "0.8125rem", marginTop: "0.25rem" }}>
            {errorMessage}
          </span>
        </div>
      );
    }

    return inputWrapper;
  }
);

BaseInput.displayName = "BaseInput";

/**
 * Universal Input:
 * 1. English Chaining:
 *    Input("Enter your email").email().width("350px").label("Email")
 * 2. Natural English phrase:
 *    Input("Enter your email, type email, width 320px, labeled Email Address")
 * 3. JSX Component:
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
): ReactElement & InputChainable;
export function Input(strings: TemplateStringsArray, ...values: any[]): ReactElement & InputChainable;
export function Input(...args: any[]): ReactElement & InputChainable {
  if (
    typeof args[0] === "string" ||
    (Array.isArray(args[0]) && (args[0] as any).raw) ||
    args.length === 0
  ) {
    const config = parseInputShorthand(args);
    return createInputFromShorthand(config);
  }

  const { ref, ...props } = (args[0] || {}) as InputProps;
  return (<BaseInput ref={ref} {...props} />) as any;
}

Input.displayName = "Input";
Input.create = (config: InputShorthandConfig) => createInputFromShorthand(config);
