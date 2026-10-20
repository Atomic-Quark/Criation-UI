import React, { forwardRef, type LabelHTMLAttributes } from "react";
import { classNames } from "../core/classNames";

export interface FormLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  optional?: boolean;
}

export const FormLabel = forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ required = false, optional = false, className = "", children, ...props }, ref) => {
    return (
      <label ref={ref} className={classNames("cr-form-label", className)} {...props}>
        {children}
        {required && <span className="cr-form-label__required" aria-hidden="true">*</span>}
        {optional && <span className="cr-form-label__optional">(optional)</span>}
      </label>
    );
  }
);

FormLabel.displayName = "FormLabel";
