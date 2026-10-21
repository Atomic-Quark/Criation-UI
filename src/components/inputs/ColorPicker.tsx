import React, {
  forwardRef,
  useState,
  useRef,
  useEffect,
  type ReactElement,
  type ChangeEvent,
} from "react";
import { classNames } from "../../core/classNames";
import { createChainableProxy } from "../../core/shorthand";

export interface ColorPickerProps {
  value?: string;
  defaultValue?: string;
  onChange?: (color: string) => void;
  presets?: string[];
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const DEFAULT_PRESETS = [
  "#ef4444", "#f97316", "#f59e0b", "#10b981", "#06b6d4",
  "#3b82f6", "#6366f1", "#a855f7", "#ec4899", "#64748b",
  "#0f172a", "#ffffff"
];

export const BaseColorPicker = forwardRef<HTMLDivElement, ColorPickerProps>(
  (
    {
      value: controlledValue,
      defaultValue = "#6366f1",
      onChange,
      presets = DEFAULT_PRESETS,
      disabled = false,
      className = "",
      style,
    },
    ref
  ) => {
    const isControlled = controlledValue !== undefined;
    const [internalColor, setInternalColor] = useState(defaultValue);
    const color = isControlled ? controlledValue : internalColor;

    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleColorChange = (hex: string) => {
      if (!isControlled) setInternalColor(hex);
      onChange?.(hex);
    };

    return (
      <div
        ref={containerRef}
        className={classNames("cr-color-picker", className)}
        style={{
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          ...style,
        }}
      >
        {/* Color Swatch Trigger */}
        <div
          onClick={() => !disabled && setIsOpen(!isOpen)}
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "var(--cr-radius-md)",
            backgroundColor: color,
            border: "2px solid var(--cr-border-subtle)",
            boxShadow: "var(--cr-shadow-sm)",
            cursor: disabled ? "not-allowed" : "pointer",
            flexShrink: 0,
          }}
          title={color}
        />

        {/* Hex Text */}
        <span
          style={{
            fontSize: "0.875rem",
            fontWeight: 500,
            fontFamily: "var(--cr-font-mono)",
            color: "var(--cr-text-primary)",
          }}
        >
          {color.toUpperCase()}
        </span>

        {/* Dropdown Popover */}
        {isOpen && (
          <div
            style={{
              position: "absolute",
              top: "calc(100% + 6px)",
              left: 0,
              backgroundColor: "var(--cr-bg-surface)",
              border: "1px solid var(--cr-border-subtle)",
              borderRadius: "var(--cr-radius-md)",
              boxShadow: "var(--cr-shadow-lg)",
              padding: "12px",
              zIndex: 999,
              width: "210px",
            }}
          >
            {/* Presets Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "6px", marginBottom: "10px" }}>
              {presets.map((preset) => (
                <div
                  key={preset}
                  onClick={() => handleColorChange(preset)}
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "var(--cr-radius-sm)",
                    backgroundColor: preset,
                    cursor: "pointer",
                    border: preset === color ? "2px solid var(--cr-primary)" : "1px solid var(--cr-border-subtle)",
                    boxShadow: preset === color ? "var(--cr-primary-glow)" : "none",
                  }}
                  title={preset}
                />
              ))}
            </div>

            {/* Native Color Input + Hex Text Field */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <input
                type="color"
                value={color}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleColorChange(e.target.value)}
                style={{
                  width: "28px",
                  height: "28px",
                  padding: 0,
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                }}
              />
              <input
                type="text"
                value={color}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleColorChange(e.target.value)}
                style={{
                  flex: 1,
                  padding: "4px 8px",
                  fontSize: "0.8125rem",
                  fontFamily: "var(--cr-font-mono)",
                  border: "1px solid var(--cr-border-subtle)",
                  borderRadius: "var(--cr-radius-sm)",
                  backgroundColor: "var(--cr-bg-page)",
                  color: "var(--cr-text-primary)",
                  outline: "none",
                }}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
);

BaseColorPicker.displayName = "BaseColorPicker";

export interface ColorPickerChainable {
  onChange(fn: (c: string) => void): ReactElement & ColorPickerChainable;
}

function createColorPickerElement(props: ColorPickerProps): ReactElement & ColorPickerChainable {
  const el = React.createElement(BaseColorPicker, props);
  return createChainableProxy(el, {
    onChange: (fn: (c: string) => void) => createColorPickerElement({ ...props, onChange: fn }),
  });
}

export function ColorPicker(props: ColorPickerProps): ReactElement;
export function ColorPicker(defaultColor?: string, onChange?: (c: string) => void): ReactElement & ColorPickerChainable;
export function ColorPicker(...args: any[]): ReactElement & ColorPickerChainable {
  if (typeof args[0] === "string" || args.length === 0) {
    return createColorPickerElement({
      defaultValue: typeof args[0] === "string" ? args[0] : "#6366f1",
      onChange: typeof args[1] === "function" ? args[1] : undefined,
    });
  }

  const { ref, ...props } = (args[0] || {}) as ColorPickerProps & { ref?: any };
  return React.createElement(BaseColorPicker, { ref, ...props }) as any;
}

ColorPicker.displayName = "ColorPicker";
