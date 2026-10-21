import React, {
  forwardRef,
  useState,
  type ReactElement,
  type KeyboardEvent,
} from "react";
import type { ComponentSize } from "../../core/types";
import { classNames } from "../../core/classNames";
import { createChainableProxy } from "../../core/shorthand";

export interface RatingProps {
  max?: number;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
  disabled?: boolean;
  size?: ComponentSize;
  allowHalf?: boolean;
  color?: string;
  emptyColor?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const BaseRating = forwardRef<HTMLDivElement, RatingProps>(
  (
    {
      max = 5,
      value: controlledValue,
      defaultValue = 0,
      onChange,
      readOnly = false,
      disabled = false,
      size = "md",
      allowHalf = false,
      color = "#f59e0b", // Amber gold
      emptyColor = "var(--cr-border-subtle)",
      className = "",
      style,
    },
    ref
  ) => {
    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = useState<number>(defaultValue);
    const [hoverValue, setHoverValue] = useState<number | null>(null);

    const currentValue = isControlled ? controlledValue : internalValue;
    const displayValue = hoverValue !== null ? hoverValue : currentValue;

    const handleClick = (val: number) => {
      if (readOnly || disabled) return;
      if (!isControlled) setInternalValue(val);
      onChange?.(val);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
      if (readOnly || disabled) return;
      if (e.key === "ArrowRight" || e.key === "ArrowUp") {
        e.preventDefault();
        const next = Math.min(max, currentValue + (allowHalf ? 0.5 : 1));
        handleClick(next);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
        e.preventDefault();
        const next = Math.max(0, currentValue - (allowHalf ? 0.5 : 1));
        handleClick(next);
      }
    };

    const starSizes: Record<ComponentSize, number> = {
      xs: 12,
      sm: 16,
      md: 22,
      lg: 30,
      xl: 38,
    };
    const starPx = starSizes[size] || 22;

    return (
      <div
        ref={ref}
        role={readOnly ? "img" : "slider"}
        aria-label={`Rating: ${currentValue} out of ${max} stars`}
        aria-valuenow={currentValue}
        aria-valuemin={0}
        aria-valuemax={max}
        tabIndex={readOnly || disabled ? -1 : 0}
        onKeyDown={handleKeyDown}
        className={classNames(
          "cr-rating",
          `cr-rating--${size}`,
          readOnly && "is-readonly",
          disabled && "is-disabled",
          className
        )}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "4px",
          cursor: readOnly || disabled ? "default" : "pointer",
          outline: "none",
          ...style,
        }}
      >
        {Array.from({ length: max }).map((_, i) => {
          const starNum = i + 1;
          const isFilled = displayValue >= starNum;
          const isHalf = !isFilled && displayValue >= starNum - 0.5;

          return (
            <span
              key={i}
              onClick={() => handleClick(starNum)}
              onMouseEnter={() => !readOnly && !disabled && setHoverValue(starNum)}
              onMouseLeave={() => !readOnly && !disabled && setHoverValue(null)}
              style={{
                display: "inline-flex",
                color: isFilled || isHalf ? color : emptyColor,
                transition: "transform 100ms ease",
                transform: hoverValue === starNum ? "scale(1.15)" : "scale(1)",
              }}
            >
              <svg
                width={starPx}
                height={starPx}
                viewBox="0 0 24 24"
                fill={isFilled ? "currentColor" : isHalf ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth={isFilled ? "0" : "1.5"}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </span>
          );
        })}
      </div>
    );
  }
);

BaseRating.displayName = "BaseRating";

export interface RatingChainable {
  readOnly(r?: boolean): ReactElement & RatingChainable;
  size(s: ComponentSize): ReactElement & RatingChainable;
  onChange(fn: (val: number) => void): ReactElement & RatingChainable;
  color(c: string): ReactElement & RatingChainable;
  small(): ReactElement & RatingChainable;
  large(): ReactElement & RatingChainable;
}

function createRatingElement(props: RatingProps): ReactElement & RatingChainable {
  const el = React.createElement(BaseRating, props);
  return createChainableProxy(el, {
    readOnly: (r = true) => createRatingElement({ ...props, readOnly: r }),
    size: (s: ComponentSize) => createRatingElement({ ...props, size: s }),
    onChange: (fn: (v: number) => void) => createRatingElement({ ...props, onChange: fn }),
    color: (c: string) => createRatingElement({ ...props, color: c }),
    small: () => createRatingElement({ ...props, size: "sm" }),
    large: () => createRatingElement({ ...props, size: "lg" }),
  });
}

export function Rating(props: RatingProps): ReactElement;
export function Rating(score?: number, ...rest: any[]): ReactElement & RatingChainable;
export function Rating(...args: any[]): ReactElement & RatingChainable {
  if (typeof args[0] === "number" || args.length === 0) {
    const value = typeof args[0] === "number" ? args[0] : 5;
    let readOnly = false;
    let size: ComponentSize = "md";
    let onChange: ((v: number) => void) | undefined;

    for (let i = 1; i < args.length; i++) {
      const a = args[i];
      if (typeof a === "function") onChange = a;
      else if (a === "readOnly" || a === true) readOnly = true;
      else if (a === "sm" || a === "md" || a === "lg") size = a;
    }

    return createRatingElement({ value, readOnly, size, onChange });
  }

  const { ref, ...props } = (args[0] || {}) as RatingProps & { ref?: any };
  return React.createElement(BaseRating, { ref, ...props }) as any;
}

Rating.displayName = "Rating";
