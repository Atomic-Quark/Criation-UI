import React, { useState, useRef, type ReactNode } from "react";
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
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleSelect = (id: string) => {
    if (controlledActiveId === undefined) {
      setInternalActiveId(id);
    }
    onChange?.(id);
  };

  const handleKeyDown = (e: React.KeyboardEvent, currentIndex: number) => {
    const enabledIndices = items
      .map((item, idx) => (item.disabled ? -1 : idx))
      .filter((idx) => idx !== -1);

    if (enabledIndices.length === 0) return;

    let targetIndex = -1;
    const currentPos = enabledIndices.indexOf(currentIndex);

    if (e.key === "ArrowRight") {
      e.preventDefault();
      const nextPos = (currentPos + 1) % enabledIndices.length;
      targetIndex = enabledIndices[nextPos];
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prevPos = (currentPos - 1 + enabledIndices.length) % enabledIndices.length;
      targetIndex = enabledIndices[prevPos];
    } else if (e.key === "Home") {
      e.preventDefault();
      targetIndex = enabledIndices[0];
    } else if (e.key === "End") {
      e.preventDefault();
      targetIndex = enabledIndices[enabledIndices.length - 1];
    }

    if (targetIndex !== -1) {
      const targetItem = items[targetIndex];
      handleSelect(targetItem.id);
      tabRefs.current[targetIndex]?.focus();
    }
  };

  const activeItem = items.find((item) => item.id === activeId);

  return (
    <div className={classNames("cr-tabs", `cr-tabs--${variant}`, className)}>
      <div role="tablist" aria-orientation="horizontal" className="cr-tabs__list">
        {items.map((item, idx) => {
          const isSelected = item.id === activeId;
          return (
            <button
              key={item.id}
              ref={(el) => {
                tabRefs.current[idx] = el;
              }}
              id={`cr-tab-${item.id}`}
              role="tab"
              aria-selected={isSelected}
              aria-controls={`cr-tabpanel-${item.id}`}
              tabIndex={isSelected ? 0 : -1}
              disabled={item.disabled}
              className={classNames(
                "cr-tabs__tab",
                isSelected && "is-selected",
                item.disabled && "is-disabled"
              )}
              onClick={() => handleSelect(item.id)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
            >
              {item.icon && <span className="cr-tabs__icon">{item.icon}</span>}
              <span className="cr-tabs__label">{item.label}</span>
            </button>
          );
        })}
      </div>

      <div
        id={`cr-tabpanel-${activeId}`}
        role="tabpanel"
        aria-labelledby={`cr-tab-${activeId}`}
        tabIndex={0}
        className="cr-tabs__panel cr-animate-fade-in"
      >
        {activeItem?.content}
      </div>
    </div>
  );
}
