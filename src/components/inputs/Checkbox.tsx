import React, { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import type { ComponentSize } from "../../core/types";
import { classNames } from "../../core/classNames";
import { Check } from "lucide-react";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: ComponentSize;
  label?: ReactNode;
  description?: ReactNode;
  error?: boolean | string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ size = "md", label, description, error, disabled, className = "", checked, ...props }, ref) => {
    return (
      <label
        className={classNames(
          "cr-checkbox-label",
          `cr-checkbox--${size}`,
          disabled && "is-disabled",
          Boolean(error) && "has-error",
          className
        )}
      >
        <span className="cr-checkbox__box-container">
          <input
            ref={ref}
            type="checkbox"
            disabled={disabled}
            checked={checked}
            className="cr-checkbox__input"
            {...props}
          />
          <span className="cr-checkbox__indicator">
            <Check className="cr-checkbox__check-icon" size={14} strokeWidth={3} />
          </span>
        </span>
        {(label || description) && (
          <span className="cr-checkbox__text-wrapper">
            {label && <span className="cr-checkbox__label-text">{label}</span>}
            {description && <span className="cr-checkbox__desc">{description}</span>}
          </span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";
