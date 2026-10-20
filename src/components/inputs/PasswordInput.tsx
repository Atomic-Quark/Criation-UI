import React, { forwardRef, useState } from "react";
import { Input, type InputProps } from "./Input";
import { Eye, EyeOff } from "lucide-react";

export interface PasswordInputProps extends Omit<InputProps, "type" | "rightIcon"> {
  showToggle?: boolean;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ showToggle = true, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const toggleVisibility = () => {
      setShowPassword((prev) => !prev);
    };

    const toggleIcon = showToggle ? (
      <button
        type="button"
        className="cr-input__toggle-visibility"
        onClick={toggleVisibility}
        tabIndex={-1}
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    ) : undefined;

    return (
      <Input
        ref={ref}
        type={showPassword ? "text" : "password"}
        rightIcon={toggleIcon}
        {...props}
      />
    );
  }
);

PasswordInput.displayName = "PasswordInput";
