import React, { forwardRef, useRef, useEffect, type TextareaHTMLAttributes } from "react";
import type { ComponentSize } from "../../core/types";
import { classNames } from "../../core/classNames";

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  size?: ComponentSize;
  error?: boolean | string;
  autoResize?: boolean;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      size = "md",
      error,
      autoResize = false,
      className = "",
      disabled,
      rows = 3,
      style,
      onInput,
      ...props
    },
    ref
  ) => {
    const hasError = Boolean(error);
    const errorMessage = typeof error === "string" ? error : undefined;
    const internalRef = useRef<HTMLTextAreaElement | null>(null);
    const errorId = props.id ? `${props.id}-error` : undefined;

    const adjustHeight = () => {
      const el = internalRef.current;
      if (autoResize && el) {
        el.style.height = "auto";
        el.style.height = `${el.scrollHeight}px`;
      }
    };

    useEffect(() => {
      adjustHeight();
    }, [autoResize, props.value, props.defaultValue]);

    const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
      adjustHeight();
      onInput?.(e);
    };

    const textareaWrapper = (
      <div
        className={classNames(
          "cr-textarea-wrapper",
          `cr-textarea-wrapper--${size}`,
          hasError && "has-error",
          disabled && "is-disabled",
          className
        )}
        style={style}
      >
        <textarea
          ref={(node) => {
            internalRef.current = node;
            if (typeof ref === "function") {
              ref(node);
            } else if (ref) {
              (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
            }
          }}
          rows={rows}
          disabled={disabled}
          className="cr-textarea"
          aria-invalid={hasError}
          aria-describedby={errorMessage && errorId ? errorId : props["aria-describedby"]}
          onInput={handleInput}
          {...props}
        />
      </div>
    );

    if (errorMessage) {
      return (
        <div className="cr-textarea-field" style={{ display: "inline-flex", flexDirection: "column", width: style?.width || "100%" }}>
          {textareaWrapper}
          <span id={errorId} className="cr-textarea__error-message" role="alert" style={{ color: "var(--cr-danger, #f43f5e)", fontSize: "0.8125rem", marginTop: "0.25rem" }}>
            {errorMessage}
          </span>
        </div>
      );
    }

    return textareaWrapper;
  }
);

TextArea.displayName = "TextArea";
