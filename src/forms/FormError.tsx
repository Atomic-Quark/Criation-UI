import React, { forwardRef, type HTMLAttributes } from "react";
import { classNames } from "../core/classNames";
import { AlertCircle } from "lucide-react";

export interface FormErrorProps extends HTMLAttributes<HTMLParagraphElement> {
  children?: React.ReactNode;
}

export const FormError = forwardRef<HTMLParagraphElement, FormErrorProps>(
  ({ className = "", children, ...props }, ref) => {
    if (!children) return null;

    return (
      <p
        ref={ref}
        role="alert"
        className={classNames("cr-form-error", className)}
        {...props}
      >
        <AlertCircle size={14} className="cr-form-error__icon" />
        <span>{children}</span>
      </p>
    );
  }
);

FormError.displayName = "FormError";
