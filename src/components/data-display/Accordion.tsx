import React, { useState, type ReactNode } from "react";
import { classNames } from "../../core/classNames";
import { ChevronDown } from "lucide-react";

export interface AccordionItem {
  id: string;
  title: ReactNode;
  content: ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultExpanded?: string[];
  expandedIds?: string[];
  onChange?: (expandedIds: string[]) => void;
  className?: string;
}

export function Accordion({
  items,
  allowMultiple = false,
  defaultExpanded = [],
  expandedIds: controlledExpandedIds,
  onChange,
  className = "",
}: AccordionProps) {
  const isControlled = controlledExpandedIds !== undefined;
  const [internalExpandedIds, setInternalExpandedIds] = useState<string[]>(defaultExpanded);
  const expandedIds = isControlled ? controlledExpandedIds : internalExpandedIds;

  const toggleItem = (id: string) => {
    let next: string[];
    if (expandedIds.includes(id)) {
      next = expandedIds.filter((item) => item !== id);
    } else {
      next = allowMultiple ? [...expandedIds, id] : [id];
    }
    if (!isControlled) {
      setInternalExpandedIds(next);
    }
    onChange?.(next);
  };

  return (
    <div className={classNames("cr-accordion", className)}>
      {items.map((item) => {
        const isExpanded = expandedIds.includes(item.id);

        return (
          <div
            key={item.id}
            className={classNames(
              "cr-accordion__item",
              isExpanded && "is-expanded",
              item.disabled && "is-disabled"
            )}
          >
            <button
              id={`cr-accordion-header-${item.id}`}
              type="button"
              className="cr-accordion__header"
              disabled={item.disabled}
              onClick={() => toggleItem(item.id)}
              aria-expanded={isExpanded}
              aria-controls={`cr-accordion-panel-${item.id}`}
            >
              <span className="cr-accordion__title">{item.title}</span>
              <ChevronDown
                className={classNames(
                  "cr-accordion__chevron",
                  isExpanded && "cr-accordion__chevron--expanded"
                )}
                size={18}
              />
            </button>
            {isExpanded && (
              <div
                id={`cr-accordion-panel-${item.id}`}
                role="region"
                aria-labelledby={`cr-accordion-header-${item.id}`}
                className="cr-accordion__content cr-animate-fade-in"
              >
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
