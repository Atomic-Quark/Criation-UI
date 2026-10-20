import React, { useState, useEffect, useRef, type ReactNode } from "react";
import { classNames } from "../../core/classNames";
import { useClickOutside } from "../../hooks/useClickOutside";

export interface ContextMenuItem {
  id: string;
  label: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
  danger?: boolean;
  onClick?: () => void;
}

export interface ContextMenuProps {
  items: ContextMenuItem[];
  children: ReactNode;
  className?: string;
}

export function ContextMenu({ items, children, className = "" }: ContextMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);

  useClickOutside(menuRef, () => setIsOpen(false), isOpen);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setPosition({ x: e.clientX, y: e.clientY });
    setIsOpen(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) setIsOpen(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  return (
    <div onContextMenu={handleContextMenu} className="cr-context-menu-trigger">
      {children}
      {isOpen && (
        <div
          ref={menuRef}
          className={classNames("cr-context-menu", "cr-animate-fade-in", className)}
          style={{ top: position.y, left: position.x }}
        >
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              disabled={item.disabled}
              className={classNames(
                "cr-context-menu__item",
                item.danger && "is-danger"
              )}
              onClick={() => {
                if (!item.disabled) {
                  item.onClick?.();
                  setIsOpen(false);
                }
              }}
            >
              {item.icon && <span className="cr-context-menu__icon">{item.icon}</span>}
              <span className="cr-context-menu__label">{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
