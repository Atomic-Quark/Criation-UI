import React, { forwardRef, type TextareaHTMLAttributes } from "react";
import type { ComponentSize } from "../../core/types";
import { classNames } from "../../core/classNames";

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  size?: ComponentSize;
  error?: boolean | string;
  autoResize?: boolean;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ size = "md", error, autoResize = false, className = "", disabled, rows = 3, ...props }, ref) => {
    const hasError = Boolean(error);

    return (
      <div
        className={classNames(
          "cr-textarea-wrapper",
          `cr-textarea-wrapper--${size}`,
          hasError && "has-error",
          disabled && "is-disabled",
          className
        )}
      >
        <textarea
          ref={ref}
          rows={rows}
          disabled={disabled}
          className="cr-textarea"
          aria-invalid={hasError}
          {...props}
        />
      </div>
    );
  }
);

TextArea.displayName = "TextArea";
