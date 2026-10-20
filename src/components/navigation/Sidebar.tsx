import React, { type ReactNode } from "react";
import { classNames } from "../../core/classNames";

export interface SidebarItem {
  id: string;
  label: string;
  icon?: ReactNode;
  badge?: ReactNode;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export interface SidebarProps {
  header?: ReactNode;
  items: SidebarItem[];
  footer?: ReactNode;
  collapsed?: boolean;
  className?: string;
}

export function Sidebar({
  header,
  items,
  footer,
  collapsed = false,
  className = "",
}: SidebarProps) {
  return (
    <aside
      className={classNames(
        "cr-sidebar",
        collapsed && "cr-sidebar--collapsed",
        className
      )}
    >
      {header && <div className="cr-sidebar__header">{header}</div>}

      <nav className="cr-sidebar__nav">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            disabled={item.disabled}
            className={classNames(
              "cr-sidebar__item",
              item.active && "is-active",
              item.disabled && "is-disabled"
            )}
            onClick={item.onClick}
            title={collapsed ? item.label : undefined}
          >
            {item.icon && <span className="cr-sidebar__icon">{item.icon}</span>}
            {!collapsed && <span className="cr-sidebar__label">{item.label}</span>}
            {!collapsed && item.badge && (
              <span className="cr-sidebar__badge">{item.badge}</span>
            )}
          </button>
        ))}
      </nav>

      {footer && <div className="cr-sidebar__footer">{footer}</div>}
    </aside>
  );
}
