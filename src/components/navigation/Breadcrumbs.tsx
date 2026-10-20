import React, { type ReactNode } from "react";
import { classNames } from "../../core/classNames";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  id: string;
  label: ReactNode;
  href?: string;
  onClick?: () => void;
  isCurrent?: boolean;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  separator?: ReactNode;
  className?: string;
}

export function Breadcrumbs({
  items,
  separator = <ChevronRight size={14} />,
  className = "",
}: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={classNames("cr-breadcrumbs", className)}>
      <ol className="cr-breadcrumbs__list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isCurrent = item.isCurrent || isLast;

          return (
            <li key={item.id} className="cr-breadcrumbs__item">
              {isCurrent ? (
                <span className="cr-breadcrumbs__current" aria-current="page">
                  {item.label}
                </span>
              ) : item.href ? (
                <a href={item.href} className="cr-breadcrumbs__link">
                  {item.label}
                </a>
              ) : (
                <button
                  type="button"
                  onClick={item.onClick}
                  className="cr-breadcrumbs__link-button"
                >
                  {item.label}
                </button>
              )}
              {!isLast && (
                <span className="cr-breadcrumbs__separator" aria-hidden="true">
                  {separator}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
