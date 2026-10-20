import React, { forwardRef } from "react";
import { Input, type InputProps } from "./Input";
import { Mail } from "lucide-react";

export interface EmailInputProps extends InputProps {}

export const EmailInput = forwardRef<HTMLInputElement, EmailInputProps>(
  ({ leftIcon = <Mail size={16} />, ...props }, ref) => {
    return (
      <Input
        ref={ref}
        type="email"
        autoComplete="email"
        leftIcon={leftIcon}
        {...props}
      />
    );
  }
);

EmailInput.displayName = "EmailInput";
