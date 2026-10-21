import React, {
  forwardRef,
  useState,
  useRef,
  type ReactElement,
  type ClipboardEvent,
  type KeyboardEvent,
  type ChangeEvent,
} from "react";
import { classNames } from "../../core/classNames";
import { createChainableProxy } from "../../core/shorthand";

export interface OTPInputProps {
  length?: number;
  value?: string;
  onChange?: (code: string) => void;
  onComplete?: (code: string) => void;
  masked?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const BaseOTPInput = forwardRef<HTMLDivElement, OTPInputProps>(
  (
    {
      length = 6,
      value: controlledValue,
      onChange,
      onComplete,
      masked = false,
      disabled = false,
      autoFocus = false,
      className = "",
      style,
    },
    ref
  ) => {
    const isControlled = controlledValue !== undefined;
    const [internalDigits, setInternalDigits] = useState<string[]>(
      Array.from({ length }, (_, i) => (controlledValue ? controlledValue[i] || "" : ""))
    );

    React.useEffect(() => {
      setInternalDigits((prev) => {
        if (prev.length === length) return prev;
        return Array.from({ length }, (_, i) => prev[i] || "");
      });
    }, [length]);

    const digits = isControlled
      ? Array.from({ length }, (_, i) => controlledValue?.[i] || "")
      : internalDigits;

    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const updateDigits = (newDigits: string[]) => {
      if (!isControlled) setInternalDigits(newDigits);
      const code = newDigits.join("");
      onChange?.(code);
      if (code.length === length && !newDigits.includes("")) {
        onComplete?.(code);
      }
    };

    const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      const lastChar = val.slice(-1);

      if (lastChar && !/^\d$/.test(lastChar)) return;

      const next = [...digits];
      next[index] = lastChar;
      updateDigits(next);

      if (lastChar && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    };

    const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace") {
        if (!digits[index] && index > 0) {
          const next = [...digits];
          next[index - 1] = "";
          updateDigits(next);
          inputRefs.current[index - 1]?.focus();
        } else {
          const next = [...digits];
          next[index] = "";
          updateDigits(next);
        }
      } else if (e.key === "ArrowLeft" && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else if (e.key === "ArrowRight" && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    };

    const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pasted = e.clipboardData.getData("text/plain").trim();
      if (!/^\d+$/.test(pasted)) return;

      const chars = pasted.slice(0, length).split("");
      const next = Array.from({ length }, (_, i) => chars[i] || "");
      updateDigits(next);

      const focusIdx = Math.min(chars.length, length - 1);
      inputRefs.current[focusIdx]?.focus();
    };

    return (
      <div
        ref={ref}
        className={classNames("cr-otp-input", className)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          ...style,
        }}
      >
        {Array.from({ length }).map((_, i) => (
          <input
            key={i}
            ref={(el) => (inputRefs.current[i] = el)}
            type={masked ? "password" : "text"}
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={digits[i] || ""}
            disabled={disabled}
            autoFocus={autoFocus && i === 0}
            aria-label={`Digit ${i + 1} of ${length}`}
            onChange={(e) => handleChange(i, e)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={handlePaste}
            style={{
              width: "44px",
              height: "52px",
              fontSize: "1.25rem",
              fontWeight: 700,
              textAlign: "center",
              color: "var(--cr-text-primary)",
              background: "var(--cr-bg-surface)",
              border: `2px solid ${digits[i] ? "var(--cr-primary)" : "var(--cr-border-subtle)"}`,
              borderRadius: "var(--cr-radius-md)",
              outline: "none",
              transition: "border-color var(--cr-transition-fast), box-shadow var(--cr-transition-fast)",
            }}
          />
        ))}
      </div>
    );
  }
);

BaseOTPInput.displayName = "BaseOTPInput";

export interface OTPInputChainable {
  masked(m?: boolean): ReactElement & OTPInputChainable;
  disabled(d?: boolean): ReactElement & OTPInputChainable;
  onComplete(fn: (code: string) => void): ReactElement & OTPInputChainable;
  onChange(fn: (code: string) => void): ReactElement & OTPInputChainable;
}

function createOTPInputElement(props: OTPInputProps): ReactElement & OTPInputChainable {
  const el = React.createElement(BaseOTPInput, props);
  return createChainableProxy(el, {
    masked: (m = true) => createOTPInputElement({ ...props, masked: m }),
    disabled: (d = true) => createOTPInputElement({ ...props, disabled: d }),
    onComplete: (fn: (code: string) => void) => createOTPInputElement({ ...props, onComplete: fn }),
    onChange: (fn: (code: string) => void) => createOTPInputElement({ ...props, onChange: fn }),
  });
}

export function OTPInput(props: OTPInputProps): ReactElement;
export function OTPInput(length?: number, ...rest: any[]): ReactElement & OTPInputChainable;
export function OTPInput(...args: any[]): ReactElement & OTPInputChainable {
  if (typeof args[0] === "number" || args.length === 0) {
    const length = typeof args[0] === "number" ? args[0] : 6;
    let onComplete: ((code: string) => void) | undefined;
    let masked = false;

    for (let i = 1; i < args.length; i++) {
      const a = args[i];
      if (typeof a === "function") onComplete = a;
      else if (a === "masked" || a === true) masked = true;
    }

    return createOTPInputElement({ length, onComplete, masked });
  }

  const { ref, ...props } = (args[0] || {}) as OTPInputProps & { ref?: any };
  return React.createElement(BaseOTPInput, { ref, ...props }) as any;
}

OTPInput.displayName = "OTPInput";
