import React, {
  forwardRef,
  useState,
  useRef,
  useImperativeHandle,
  type InputHTMLAttributes,
  type ReactElement,
  type ChangeEvent,
} from "react";
import type { ComponentSize } from "../../core/types";
import { classNames } from "../../core/classNames";
import { createChainableProxy } from "../../core/shorthand";

export interface SearchInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "onChange"> {
  size?: ComponentSize;
  shortcutBadge?: string;
  debounceMs?: number;
  onSearch?: (value: string) => void;
  onChange?: (value: string, e: ChangeEvent<HTMLInputElement>) => void;
  onClear?: () => void;
  fullWidth?: boolean;
}

export const BaseSearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      size = "md",
      shortcutBadge,
      debounceMs = 300,
      onSearch,
      onChange,
      onClear,
      fullWidth = false,
      placeholder = "Search...",
      className = "",
      style,
      value: controlledValue,
      defaultValue = "",
      disabled,
      ...props
    },
    ref
  ) => {
    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = useState<string>(String(defaultValue || ""));
    const value = isControlled ? String(controlledValue) : internalValue;

    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      if (!isControlled) setInternalValue(val);
      onChange?.(val, e);

      if (onSearch) {
        if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
        debounceTimerRef.current = setTimeout(() => {
          onSearch(val);
        }, debounceMs);
      }
    };

    const handleClear = () => {
      if (!isControlled) setInternalValue("");
      onClear?.();
      onSearch?.("");
      inputRef.current?.focus();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Escape") {
        handleClear();
      } else if (e.key === "Enter") {
        if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
        onSearch?.(value);
      }
    };

    const heights: Record<ComponentSize, string> = {
      xs: "28px",
      sm: "32px",
      md: "40px",
      lg: "48px",
      xl: "56px",
    };
    const fontSizes: Record<ComponentSize, string> = {
      xs: "0.75rem",
      sm: "0.8125rem",
      md: "0.9375rem",
      lg: "1.0625rem",
      xl: "1.125rem",
    };

    return (
      <div
        className={classNames(
          "cr-search-input-wrapper",
          `cr-search-input--${size}`,
          fullWidth && "is-full-width",
          disabled && "is-disabled",
          className
        )}
        style={{
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          width: fullWidth ? "100%" : "280px",
          ...style,
        }}
      >
        {/* Search Icon */}
        <span
          style={{
            position: "absolute",
            left: "12px",
            color: "var(--cr-text-muted)",
            display: "flex",
            alignItems: "center",
            pointerEvents: "none",
          }}
          aria-hidden="true"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </span>

        <input
          ref={inputRef}
          type="search"
          role="searchbox"
          aria-label={placeholder}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          style={{
            width: "100%",
            height: heights[size],
            fontSize: fontSizes[size],
            paddingLeft: "36px",
            paddingRight: value ? "64px" : shortcutBadge ? "48px" : "16px",
            background: "var(--cr-bg-surface)",
            color: "var(--cr-text-primary)",
            border: "1px solid var(--cr-border-subtle)",
            borderRadius: "var(--cr-radius-md)",
            outline: "none",
            transition: "border-color var(--cr-transition-fast), box-shadow var(--cr-transition-fast)",
          }}
          {...props}
        />

        {/* Clear Button (shown when query exists) */}
        {value && !disabled && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear search"
            style={{
              position: "absolute",
              right: shortcutBadge ? "44px" : "12px",
              background: "transparent",
              border: "none",
              color: "var(--cr-text-muted)",
              cursor: "pointer",
              padding: "4px",
              display: "flex",
              alignItems: "center",
              borderRadius: "var(--cr-radius-sm)",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="6" />
            </svg>
          </button>
        )}

        {/* Keyboard shortcut hint */}
        {shortcutBadge && (
          <span
            style={{
              position: "absolute",
              right: "10px",
              padding: "2px 6px",
              fontSize: "0.6875rem",
              fontWeight: 600,
              color: "var(--cr-text-muted)",
              background: "var(--cr-bg-page)",
              border: "1px solid var(--cr-border-subtle)",
              borderRadius: "var(--cr-radius-sm)",
              pointerEvents: "none",
            }}
          >
            {shortcutBadge}
          </span>
        )}
      </div>
    );
  }
);

BaseSearchInput.displayName = "BaseSearchInput";

export interface SearchInputChainable {
  width(w: string): ReactElement & SearchInputChainable;
  shortcut(badge: string): ReactElement & SearchInputChainable;
  onSearch(fn: (val: string) => void): ReactElement & SearchInputChainable;
  small(): ReactElement & SearchInputChainable;
  large(): ReactElement & SearchInputChainable;
  fullWidth(): ReactElement & SearchInputChainable;
}

function createSearchInputElement(props: SearchInputProps): ReactElement & SearchInputChainable {
  const el = React.createElement(BaseSearchInput, props);
  return createChainableProxy(el, {
    width: (w: string) =>
      createSearchInputElement({ ...props, style: { ...props.style, width: w } }),
    shortcut: (badge: string) => createSearchInputElement({ ...props, shortcutBadge: badge }),
    onSearch: (fn: (val: string) => void) => createSearchInputElement({ ...props, onSearch: fn }),
    small: () => createSearchInputElement({ ...props, size: "sm" }),
    large: () => createSearchInputElement({ ...props, size: "lg" }),
    fullWidth: () => createSearchInputElement({ ...props, fullWidth: true }),
  });
}

export function SearchInput(props: SearchInputProps): ReactElement;
export function SearchInput(placeholder?: string, ...rest: any[]): ReactElement & SearchInputChainable;
export function SearchInput(...args: any[]): ReactElement & SearchInputChainable {
  if (typeof args[0] === "string" || args.length === 0) {
    const placeholder = args[0] || "Search...";
    let shortcutBadge: string | undefined;
    let onSearch: ((val: string) => void) | undefined;
    let width: string | undefined;

    for (let i = 1; i < args.length; i++) {
      const a = args[i];
      if (typeof a === "function") {
        onSearch = a;
      } else if (typeof a === "string") {
        if (a.includes("px") || a.includes("%") || a.includes("rem")) width = a;
        else shortcutBadge = a;
      }
    }

    return createSearchInputElement({
      placeholder,
      shortcutBadge,
      onSearch,
      style: width ? { width } : undefined,
    });
  }

  const { ref, ...props } = (args[0] || {}) as SearchInputProps & { ref?: any };
  return React.createElement(BaseSearchInput, { ref, ...props }) as any;
}

SearchInput.displayName = "SearchInput";
