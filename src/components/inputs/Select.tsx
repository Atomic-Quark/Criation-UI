import React, { forwardRef, type SelectHTMLAttributes } from "react";
import type { ComponentSize } from "../../core/types";
import { classNames } from "../../core/classNames";
import { ChevronDown } from "lucide-react";

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  size?: ComponentSize;
  options?: SelectOption[];
  placeholder?: string;
  error?: boolean | string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      size = "md",
      options = [],
      placeholder,
      error,
      disabled,
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    const hasError = Boolean(error);
    const errorMessage = typeof error === "string" ? error : undefined;
    const errorId = props.id ? `${props.id}-error` : undefined;

    const selectDefaultValue =
      props.value === undefined
        ? props.defaultValue !== undefined
          ? props.defaultValue
          : placeholder
          ? ""
          : undefined
        : undefined;

    const selectWrapper = (
      <div
        className={classNames(
          "cr-select-wrapper",
          `cr-select-wrapper--${size}`,
          hasError && "has-error",
          disabled && "is-disabled",
          className
        )}
      >
        <select
          ref={ref}
          disabled={disabled}
          className="cr-select"
          defaultValue={selectDefaultValue}
          aria-invalid={hasError}
          aria-describedby={errorMessage && errorId ? errorId : props["aria-describedby"]}
          {...props}
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {options.length > 0
            ? options.map((opt) => (
                <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                  {opt.label}
                </option>
              ))
            : children}
        </select>
        <span className="cr-select__arrow" aria-hidden="true">
          <ChevronDown size={16} />
        </span>
      </div>
    );

    if (errorMessage) {
      return (
        <div className="cr-select-field" style={{ display: "inline-flex", flexDirection: "column", width: "100%" }}>
          {selectWrapper}
          <span id={errorId} className="cr-select__error-message" role="alert" style={{ color: "var(--cr-danger, #f43f5e)", fontSize: "0.8125rem", marginTop: "0.25rem" }}>
            {errorMessage}
          </span>
        </div>
      );
    }

    return selectWrapper;
  }
);

Select.displayName = "Select";
