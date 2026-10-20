import React, { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { classNames } from "../core/classNames";
import { FormLabel } from "./FormLabel";
import { FormError } from "./FormError";

export interface FormFieldProps extends HTMLAttributes<HTMLDivElement> {
  label?: ReactNode;
  required?: boolean;
  optional?: boolean;
  hint?: ReactNode;
  error?: string | null;
  htmlFor?: string;
  children: ReactNode;
}

export const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
  (
    {
      label,
      required = false,
      optional = false,
      hint,
      error,
      htmlFor,
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={classNames("cr-form-field", error && "has-error", className)}
        {...props}
      >
        {label && (
          <FormLabel htmlFor={htmlFor} required={required} optional={optional}>
            {label}
          </FormLabel>
        )}
        <div className="cr-form-field__control">{children}</div>
        {hint && !error && <p className="cr-form-field__hint">{hint}</p>}
        {error && <FormError>{error}</FormError>}
      </div>
    );
  }
);

FormField.displayName = "FormField";
