import React, { forwardRef, useState, type HTMLAttributes } from "react";
import { classNames } from "../../core/classNames";
import { Check, Copy } from "lucide-react";

export interface CodeProps extends HTMLAttributes<HTMLElement> {
  block?: boolean;
  copyable?: boolean;
  language?: string;
}

export const Code = forwardRef<HTMLElement, CodeProps>(
  ({ block = false, copyable = false, language, className = "", children, ...props }, ref: any) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
      const textToCopy = typeof children === "string" ? children : "";
      if (textToCopy && navigator.clipboard) {
        navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    };

    if (block) {
      return (
        <div className={classNames("cr-code-block", className)}>
          <div className="cr-code-block__header">
            {language && <span className="cr-code-block__lang">{language}</span>}
            {copyable && (
              <button
                type="button"
                className="cr-code-block__copy-btn"
                onClick={handleCopy}
                aria-label={copied ? "Copied" : "Copy code"}
              >
                {copied ? <Check size={14} className="cr-text-success" /> : <Copy size={14} />}
                <span>{copied ? "Copied!" : "Copy"}</span>
              </button>
            )}
          </div>
          <pre className="cr-code-block__pre">
            <code ref={ref} className="cr-code-block__code" {...props}>
              {children}
            </code>
          </pre>
        </div>
      );
    }

    return (
      <code ref={ref} className={classNames("cr-code-inline", className)} {...props}>
        {children}
      </code>
    );
  }
);

Code.displayName = "Code";
