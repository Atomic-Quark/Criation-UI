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
  className?: string;
}

export function Accordion({
  items,
  allowMultiple = false,
  defaultExpanded = [],
  className = "",
}: AccordionProps) {
  const [expandedIds, setExpandedIds] = useState<string[]>(defaultExpanded);

  const toggleItem = (id: string) => {
    setExpandedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      return allowMultiple ? [...prev, id] : [id];
    });
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
              type="button"
              className="cr-accordion__header"
              disabled={item.disabled}
              onClick={() => toggleItem(item.id)}
              aria-expanded={isExpanded}
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
              <div className="cr-accordion__content cr-animate-fade-in">{item.content}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
