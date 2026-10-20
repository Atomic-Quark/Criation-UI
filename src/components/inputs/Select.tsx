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

    return (
      <div
        className={classNames(
          "cr-select-wrapper",
          `cr-select-wrapper--${size}`,
          hasError && "has-error",
          disabled && "is-disabled",
          className
        )}
      >
        <select ref={ref} disabled={disabled} className="cr-select" {...props}>
          {placeholder && (
            <option value="" disabled selected hidden>
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
  }
);

Select.displayName = "Select";
