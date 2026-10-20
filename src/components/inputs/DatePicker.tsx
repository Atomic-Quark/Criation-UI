import React, { forwardRef } from "react";
import { Input, type InputProps } from "./Input";
import { Calendar } from "lucide-react";

export interface DatePickerProps extends Omit<InputProps, "type"> {
  minDate?: string;
  maxDate?: string;
}

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  ({ minDate, maxDate, leftIcon = <Calendar size={16} />, ...props }, ref) => {
    return (
      <Input
        ref={ref}
        type="date"
        min={minDate}
        max={maxDate}
        leftIcon={leftIcon}
        {...props}
      />
    );
  }
);

DatePicker.displayName = "DatePicker";
