import React, { useState, type ReactNode } from "react";
import { classNames } from "../../core/classNames";

export interface TabItem {
  id: string;
  label: ReactNode;
  icon?: ReactNode;
  content: ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  defaultActiveId?: string;
  activeId?: string;
  onChange?: (id: string) => void;
  variant?: "underline" | "pills" | "enclosed";
  className?: string;
}

export function Tabs({
  items,
  defaultActiveId,
  activeId: controlledActiveId,
  onChange,
  variant = "underline",
  className = "",
}: TabsProps) {
  const [internalActiveId, setInternalActiveId] = useState(
    defaultActiveId || (items[0] ? items[0].id : "")
  );

  const activeId = controlledActiveId !== undefined ? controlledActiveId : internalActiveId;

  const handleSelect = (id: string) => {
    if (controlledActiveId === undefined) {
      setInternalActiveId(id);
    }
    onChange?.(id);
  };

  const activeItem = items.find((item) => item.id === activeId);

  return (
    <div className={classNames("cr-tabs", `cr-tabs--${variant}`, className)}>
      <div role="tablist" className="cr-tabs__list">
        {items.map((item) => {
          const isSelected = item.id === activeId;
          return (
            <button
              key={item.id}
              role="tab"
              aria-selected={isSelected}
              disabled={item.disabled}
              className={classNames(
                "cr-tabs__tab",
                isSelected && "is-selected",
                item.disabled && "is-disabled"
              )}
              onClick={() => handleSelect(item.id)}
            >
              {item.icon && <span className="cr-tabs__icon">{item.icon}</span>}
              <span className="cr-tabs__label">{item.label}</span>
            </button>
          );
        })}
      </div>

      <div role="tabpanel" className="cr-tabs__panel cr-animate-fade-in">
        {activeItem?.content}
      </div>
    </div>
  );
}
