import React, { forwardRef, type FormHTMLAttributes } from "react";
import { classNames } from "../core/classNames";

export interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  spacing?: string | number;
}

export const Form = forwardRef<HTMLFormElement, FormProps>(
  ({ spacing = "1.25rem", className = "", style, children, ...props }, ref) => {
    return (
      <form
        ref={ref}
        className={classNames("cr-form", className)}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: spacing,
          ...style,
        }}
        {...props}
      >
        {children}
      </form>
    );
  }
);

Form.displayName = "Form";
