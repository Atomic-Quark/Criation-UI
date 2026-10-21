import React, {
  forwardRef,
  useState,
  useRef,
  useEffect,
  type ReactElement,
} from "react";
import type { ComponentSize } from "../../core/types";
import { classNames } from "../../core/classNames";
import { createChainableProxy } from "../../core/shorthand";

export interface MultiSelectOption {
  label: string;
  value: string;
}

export interface MultiSelectProps {
  options: (string | MultiSelectOption)[];
  value?: string[];
  defaultValue?: string[];
  onChange?: (values: string[]) => void;
  placeholder?: string;
  size?: ComponentSize;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const BaseMultiSelect = forwardRef<HTMLDivElement, MultiSelectProps>(
  (
    {
      options,
      value: controlledValue,
      defaultValue = [],
      onChange,
      placeholder = "Select options...",
      size = "md",
      disabled = false,
      className = "",
      style,
    },
    ref
  ) => {
    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = useState<string[]>(defaultValue);
    const selectedValues = isControlled ? controlledValue : internalValue;

    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const containerRef = useRef<HTMLDivElement>(null);

    const normalizedOptions: MultiSelectOption[] = options.map((opt) =>
      typeof opt === "string" ? { label: opt, value: opt } : opt
    );

    const filteredOptions = normalizedOptions.filter((opt) =>
      opt.label.toLowerCase().includes(searchQuery.toLowerCase())
    );

    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleOption = (val: string) => {
      const exists = selectedValues.includes(val);
      const next = exists
        ? selectedValues.filter((v) => v !== val)
        : [...selectedValues, val];
      if (!isControlled) setInternalValue(next);
      onChange?.(next);
    };

    const removeOption = (val: string, e: React.MouseEvent) => {
      e.stopPropagation();
      const next = selectedValues.filter((v) => v !== val);
      if (!isControlled) setInternalValue(next);
      onChange?.(next);
    };

    const clearAll = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!isControlled) setInternalValue([]);
      onChange?.([]);
    };

    return (
      <div
        ref={containerRef}
        className={classNames("cr-multiselect", `cr-multiselect--${size}`, className)}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "360px",
          ...style,
        }}
      >
        {/* Trigger Box with Chips */}
        <div
          onClick={() => !disabled && setIsOpen(!isOpen)}
          style={{
            minHeight: "42px",
            padding: "4px 36px 4px 8px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "4px",
            backgroundColor: "var(--cr-bg-surface)",
            border: `1px solid ${isOpen ? "var(--cr-primary)" : "var(--cr-border-subtle)"}`,
            borderRadius: "var(--cr-radius-md)",
            cursor: disabled ? "not-allowed" : "pointer",
            position: "relative",
          }}
        >
          {selectedValues.length === 0 ? (
            <span style={{ fontSize: "0.875rem", color: "var(--cr-text-muted)", paddingLeft: "4px" }}>
              {placeholder}
            </span>
          ) : (
            selectedValues.map((val) => {
              const label = normalizedOptions.find((o) => o.value === val)?.label || val;
              return (
                <span
                  key={val}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    padding: "2px 8px",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    backgroundColor: "var(--cr-primary-subtle)",
                    color: "var(--cr-primary-text)",
                    borderRadius: "var(--cr-radius-sm)",
                  }}
                >
                  {label}
                  <span
                    onClick={(e) => removeOption(val, e)}
                    style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
                  >
                    ×
                  </span>
                </span>
              );
            })
          )}

          {/* Right Icons: Clear & Arrow */}
          <div
            style={{
              position: "absolute",
              right: "8px",
              top: "50%",
              transform: "translateY(-50%)",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            {selectedValues.length > 0 && !disabled && (
              <span
                onClick={clearAll}
                style={{
                  color: "var(--cr-text-muted)",
                  fontSize: "1rem",
                  cursor: "pointer",
                  padding: "2px",
                }}
              >
                ×
              </span>
            )}
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              style={{
                color: "var(--cr-text-muted)",
                transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform var(--cr-transition-fast)",
              }}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>

        {/* Dropdown Options */}
        {isOpen && (
          <div
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
            {/* Search filter input */}
            <input
              type="text"
              placeholder="Filter options..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "100%",
                padding: "6px 8px",
                fontSize: "0.8125rem",
                border: "1px solid var(--cr-border-subtle)",
                borderRadius: "var(--cr-radius-sm)",
                backgroundColor: "var(--cr-bg-page)",
                color: "var(--cr-text-primary)",
                marginBottom: "4px",
                outline: "none",
              }}
            />

            {filteredOptions.length === 0 ? (
              <div style={{ padding: "8px 12px", fontSize: "0.875rem", color: "var(--cr-text-muted)" }}>
                No options found
              </div>
            ) : (
              filteredOptions.map((opt) => {
                const isSelected = selectedValues.includes(opt.value);
                return (
                  <div
                    key={opt.value}
                    onClick={() => toggleOption(opt.value)}
                    style={{
                      padding: "6px 10px",
                      fontSize: "0.875rem",
                      borderRadius: "var(--cr-radius-sm)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      cursor: "pointer",
                      backgroundColor: isSelected ? "var(--cr-primary-subtle)" : "transparent",
                      color: isSelected ? "var(--cr-primary)" : "var(--cr-text-primary)",
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

BaseMultiSelect.displayName = "BaseMultiSelect";

export interface MultiSelectChainable {
  placeholder(p: string): ReactElement & MultiSelectChainable;
  onChange(fn: (values: string[]) => void): ReactElement & MultiSelectChainable;
}

function createMultiSelectElement(props: MultiSelectProps): ReactElement & MultiSelectChainable {
  const el = React.createElement(BaseMultiSelect, props);
  return createChainableProxy(el, {
    placeholder: (p: string) => createMultiSelectElement({ ...props, placeholder: p }),
    onChange: (fn: (vals: string[]) => void) => createMultiSelectElement({ ...props, onChange: fn }),
  });
}

export function MultiSelect(props: MultiSelectProps): ReactElement;
export function MultiSelect(options: (string | MultiSelectOption)[], placeholder?: string): ReactElement & MultiSelectChainable;
export function MultiSelect(...args: any[]): ReactElement & MultiSelectChainable {
  if (Array.isArray(args[0])) {
    return createMultiSelectElement({ options: args[0], placeholder: args[1] });
  }

  const { ref, ...props } = (args[0] || {}) as MultiSelectProps & { ref?: any };
  return React.createElement(BaseMultiSelect, { ref, ...props }) as any;
}

MultiSelect.displayName = "MultiSelect";
