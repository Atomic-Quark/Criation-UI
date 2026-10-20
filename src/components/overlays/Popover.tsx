import React, { useState, useRef, type ReactNode } from "react";
import { classNames } from "../../core/classNames";
import { useClickOutside } from "../../hooks/useClickOutside";

export interface PopoverProps {
  trigger: ReactNode;
  content: ReactNode;
  placement?: "top" | "bottom" | "left" | "right";
  className?: string;
}

export function Popover({
  trigger,
  content,
  placement = "bottom",
  className = "",
}: PopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useClickOutside(containerRef, () => setIsOpen(false), isOpen);

  return (
    <div ref={containerRef} className="cr-popover-wrapper">
      <div
        className="cr-popover__trigger"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {trigger}
      </div>
      {isOpen && (
        <div
          className={classNames(
            "cr-popover__content",
            `cr-popover--${placement}`,
            "cr-animate-fade-in",
            className
          )}
          role="region"
        >
          {content}
        </div>
      )}
    </div>
  );
}
