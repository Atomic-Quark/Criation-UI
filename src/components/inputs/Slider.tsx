import React, { forwardRef, type InputHTMLAttributes } from "react";
import type { ComponentSize } from "../../core/types";
import { classNames } from "../../core/classNames";

export interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: ComponentSize;
  min?: number;
  max?: number;
  step?: number;
  showValue?: boolean;
}

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  ({ size = "md", min = 0, max = 100, step = 1, showValue = false, value, disabled, className = "", ...props }, ref) => {
    return (
      <div className={classNames("cr-slider-container", `cr-slider--${size}`, disabled && "is-disabled", className)}>
        <input
          ref={ref}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          disabled={disabled}
          className="cr-slider"
          {...props}
        />
        {showValue && <span className="cr-slider__value">{value ?? min}</span>}
      </div>
    );
  }
);

Slider.displayName = "Slider";
