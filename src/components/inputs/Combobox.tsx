import React, {
  forwardRef,
  useState,
  useRef,
  useEffect,
  type ReactElement,
  type KeyboardEvent,
} from "react";
import type { ComponentSize } from "../../core/types";
import { classNames } from "../../core/classNames";
import { createChainableProxy } from "../../core/shorthand";

export interface ComboboxOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface ComboboxProps {
  options?: (string | ComboboxOption)[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  size?: ComponentSize;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onSearch?: (query: string) => Promise<(string | ComboboxOption)[]>;
  loading?: boolean;
  emptyText?: string;
}

export const BaseCombobox = forwardRef<HTMLDivElement, ComboboxProps>(
  (
    {
      options = [],
      value: controlledValue,
      defaultValue = "",
      onChange,
      placeholder = "Select or search...",
      size = "md",
      disabled = false,
      className = "",
      style,
      onSearch,
      loading: controlledLoading = false,
      emptyText = "No options found",
    },
    ref
  ) => {
    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = useState(defaultValue);
    const selectedValue = isControlled ? controlledValue : internalValue;

    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [highlightIndex, setHighlightIndex] = useState(0);
    const [asyncOptions, setAsyncOptions] = useState<ComboboxOption[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [searchError, setSearchError] = useState<string | null>(null);

    const searchRequestId = useRef(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const normalizedStaticOptions: ComboboxOption[] = options.map((opt) =>
      typeof opt === "string" ? { label: opt, value: opt } : opt
    );

    const activeOptions = onSearch ? asyncOptions : normalizedStaticOptions;

    const filteredOptions = onSearch
      ? activeOptions
      : activeOptions.filter((opt) =>
          opt.label.toLowerCase().includes(searchQuery.toLowerCase())
        );

    const isLoading = controlledLoading || isSearching;

    useEffect(() => {
      if (!onSearch) return;
      const currentReq = ++searchRequestId.current;
      setIsSearching(true);
      setSearchError(null);

      const timer = setTimeout(() => {
        onSearch(searchQuery)
          .then((res) => {
            if (currentReq === searchRequestId.current) {
              const mapped = res.map((opt) =>
                typeof opt === "string" ? { label: opt, value: opt } : opt
              );
              setAsyncOptions(mapped);
              setIsSearching(false);
            }
          })
          .catch((err) => {
            if (currentReq === searchRequestId.current) {
              setSearchError(err?.message || "Search failed");
              setIsSearching(false);
            }
          });
      }, 150);

      return () => clearTimeout(timer);
    }, [searchQuery, onSearch]);

    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (opt: ComboboxOption) => {
      if (opt.disabled) return;
      if (!isControlled) setInternalValue(opt.value);
      onChange?.(opt.value);
      setSearchQuery("");
      setIsOpen(false);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (!isOpen) {
        if (e.key === "ArrowDown" || e.key === "Enter") {
          setIsOpen(true);
          return;
        }
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightIndex((prev) => (prev + 1) % Math.max(1, filteredOptions.length));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightIndex((prev) => (prev - 1 + filteredOptions.length) % Math.max(1, filteredOptions.length));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredOptions[highlightIndex]) {
          handleSelect(filteredOptions[highlightIndex]);
        }
      } else if (e.key === "Escape") {
        setIsOpen(false);
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

    const selectedLabel = activeOptions.find((o) => o.value === selectedValue)?.label || "";

    return (
      <div
        ref={containerRef}
        className={classNames("cr-combobox", `cr-combobox--${size}`, className)}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "320px",
          ...style,
        }}
      >
        {/* Input Field */}
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}
        >
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded={isOpen}
            aria-autocomplete="list"
            disabled={disabled}
            placeholder={isOpen ? "Type to search..." : selectedLabel || placeholder}
            value={isOpen ? searchQuery : selectedLabel}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setHighlightIndex(0);
              if (!isOpen) setIsOpen(true);
            }}
            onFocus={() => {
              if (!disabled) setIsOpen(true);
            }}
            onKeyDown={handleKeyDown}
            style={{
              width: "100%",
              height: heights[size],
              fontSize: fontSizes[size],
              paddingLeft: "12px",
              paddingRight: "36px",
              backgroundColor: "var(--cr-bg-surface)",
              color: "var(--cr-text-primary)",
              border: `1px solid ${isOpen ? "var(--cr-primary)" : "var(--cr-border-subtle)"}`,
              borderRadius: "var(--cr-radius-md)",
              outline: "none",
              cursor: disabled ? "not-allowed" : "pointer",
            }}
          />

          {/* Dropdown chevron */}
          <span
            onClick={() => !disabled && setIsOpen(!isOpen)}
            style={{
              position: "absolute",
              right: "12px",
              color: "var(--cr-text-muted)",
              pointerEvents: "none",
              display: "flex",
              alignItems: "center",
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform var(--cr-transition-fast)",
            }}
          >
            {isLoading ? (
              <span className="cr-spinner cr-spinner--xs" style={{ width: 14, height: 14 }} />
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            )}
          </span>
        </div>

        {/* Options List */}
        {isOpen && (
          <div
            role="listbox"
            className="cr-scrollbar"
            style={{
              position: "absolute",
              top: "calc(100% + 4px)",
              left: 0,
              right: 0,
              backgroundColor: "var(--cr-bg-surface)",
              border: "1px solid var(--cr-border-subtle)",
              borderRadius: "var(--cr-radius-md)",
              boxShadow: "var(--cr-shadow-lg)",
              maxHeight: "220px",
              overflowY: "auto",
              zIndex: 999,
              padding: "4px",
            }}
          >
            {isLoading ? (
              <div style={{ padding: "8px 12px", fontSize: "0.875rem", color: "var(--cr-text-muted)", display: "flex", alignItems: "center", gap: "8px" }}>
                <span className="cr-spinner cr-spinner--xs" style={{ width: 14, height: 14 }} /> Loading options...
              </div>
            ) : searchError ? (
              <div style={{ padding: "8px 12px", fontSize: "0.875rem", color: "var(--cr-danger, #f43f5e)" }}>
                {searchError}
              </div>
            ) : filteredOptions.length === 0 ? (
              <div style={{ padding: "8px 12px", fontSize: "0.875rem", color: "var(--cr-text-muted)" }}>
                {emptyText}
              </div>
            ) : (
              filteredOptions.map((opt, i) => {
                const isSelected = opt.value === selectedValue;
                const isHighlighted = i === highlightIndex;

                return (
                  <div
                    key={opt.value}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(opt)}
                    onMouseEnter={() => setHighlightIndex(i)}
                    style={{
                      padding: "8px 12px",
                      fontSize: fontSizes[size],
                      borderRadius: "var(--cr-radius-sm)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      cursor: opt.disabled ? "not-allowed" : "pointer",
                      backgroundColor: isHighlighted
                        ? "var(--cr-primary-subtle)"
                        : isSelected
                        ? "var(--cr-bg-surface-hover)"
                        : "transparent",
                      color: isSelected
                        ? "var(--cr-primary)"
                        : opt.disabled
                        ? "var(--cr-text-muted)"
                        : "var(--cr-text-primary)",
                      fontWeight: isSelected ? 600 : 400,
                    }}
                  >
                    <span>{opt.label}</span>
                    {isSelected && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    );
  }
);

BaseCombobox.displayName = "BaseCombobox";

export interface ComboboxChainable {
  onChange(fn: (val: string) => void): ReactElement & ComboboxChainable;
  placeholder(p: string): ReactElement & ComboboxChainable;
}

function createComboboxElement(props: ComboboxProps): ReactElement & ComboboxChainable {
  const el = React.createElement(BaseCombobox, props);
  return createChainableProxy(el, {
    onChange: (fn: (val: string) => void) => createComboboxElement({ ...props, onChange: fn }),
    placeholder: (p: string) => createComboboxElement({ ...props, placeholder: p }),
  });
}

export function Combobox(props: ComboboxProps): ReactElement;
export function Combobox(options: (string | ComboboxOption)[], placeholder?: string): ReactElement & ComboboxChainable;
export function Combobox(...args: any[]): ReactElement & ComboboxChainable {
  if (Array.isArray(args[0])) {
    return createComboboxElement({ options: args[0], placeholder: args[1] });
  }

  const { ref, ...props } = (args[0] || {}) as ComboboxProps & { ref?: any };
  return React.createElement(BaseCombobox, { ref, ...props }) as any;
}

Combobox.displayName = "Combobox";
