import React, { useState, useRef, type ReactNode } from "react";
import { classNames } from "../../core/classNames";
import { useClickOutside } from "../../hooks/useClickOutside";

export interface DropdownMenuItem {
  id: string;
  label: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
  danger?: boolean;
  onClick?: () => void;
}

export interface DropdownMenuProps {
  trigger: ReactNode;
  items: DropdownMenuItem[];
  placement?: "left" | "right";
  className?: string;
}

export function DropdownMenu({
  trigger,
  items,
  placement = "right",
  className = "",
}: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useClickOutside(containerRef, () => setIsOpen(false), isOpen);

  return (
    <div ref={containerRef} className={classNames("cr-dropdown", className)}>
      <div
        className="cr-dropdown__trigger"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {trigger}
      </div>

      {isOpen && (
        <div
          role="menu"
          className={classNames(
            "cr-dropdown__menu",
            `cr-dropdown__menu--${placement}`,
            "cr-animate-fade-in"
          )}
        >
          {items.map((item) => (
            <button
              key={item.id}
              role="menuitem"
              type="button"
              disabled={item.disabled}
              className={classNames(
                "cr-dropdown__item",
                item.danger && "is-danger",
                item.disabled && "is-disabled"
              )}
              onClick={() => {
                if (!item.disabled) {
                  item.onClick?.();
                  setIsOpen(false);
                }
              }}
            >
              {item.icon && <span className="cr-dropdown__icon">{item.icon}</span>}
              <span className="cr-dropdown__label">{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
