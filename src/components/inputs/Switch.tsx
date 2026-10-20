import React, { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import type { ComponentSize } from "../../core/types";
import { classNames } from "../../core/classNames";

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: ComponentSize;
  label?: ReactNode;
  description?: ReactNode;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ size = "md", label, description, disabled, className = "", checked, ...props }, ref) => {
    return (
      <label
        className={classNames(
          "cr-switch-label",
          `cr-switch--${size}`,
          disabled && "is-disabled",
          className
        )}
      >
        <span className="cr-switch__track">
          <input
            ref={ref}
            type="checkbox"
            role="switch"
            disabled={disabled}
            checked={checked}
            className="cr-switch__input"
            {...props}
          />
          <span className="cr-switch__thumb" />
        </span>
        {(label || description) && (
          <span className="cr-switch__text-wrapper">
            {label && <span className="cr-switch__label-text">{label}</span>}
            {description && <span className="cr-switch__desc">{description}</span>}
          </span>
        )}
      </label>
    );
  }
);

Switch.displayName = "Switch";
