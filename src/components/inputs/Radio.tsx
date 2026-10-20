import React, { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import type { ComponentSize } from "../../core/types";
import { classNames } from "../../core/classNames";

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: ComponentSize;
  label?: ReactNode;
  description?: ReactNode;
  error?: boolean | string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ size = "md", label, description, error, disabled, className = "", checked, ...props }, ref) => {
    return (
      <label
        className={classNames(
          "cr-radio-label",
          `cr-radio--${size}`,
          disabled && "is-disabled",
          Boolean(error) && "has-error",
          className
        )}
      >
        <span className="cr-radio__box-container">
          <input
            ref={ref}
            type="radio"
            disabled={disabled}
            checked={checked}
            className="cr-radio__input"
            {...props}
          />
          <span className="cr-radio__indicator">
            <span className="cr-radio__dot" />
          </span>
        </span>
        {(label || description) && (
          <span className="cr-radio__text-wrapper">
            {label && <span className="cr-radio__label-text">{label}</span>}
            {description && <span className="cr-radio__desc">{description}</span>}
          </span>
        )}
      </label>
    );
  }
);

Radio.displayName = "Radio";
