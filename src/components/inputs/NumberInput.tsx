import React, { forwardRef } from "react";
import { Input, type InputProps } from "./Input";

export interface NumberInputProps extends Omit<InputProps, "type"> {
  min?: number;
  max?: number;
  step?: number;
}

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  ({ min, max, step = 1, ...props }, ref) => {
    return (
      <Input
        ref={ref}
        type="number"
        min={min}
        max={max}
        step={step}
        {...props}
      />
    );
  }
);

NumberInput.displayName = "NumberInput";
