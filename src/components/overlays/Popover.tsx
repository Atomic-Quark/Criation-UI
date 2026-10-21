import React, { useState, useRef, type ReactNode } from "react";
import { classNames } from "../../core/classNames";
import { useClickOutside } from "../../hooks/useClickOutside";

export interface PopoverProps {
  trigger: ReactNode;
  content: ReactNode;
  placement?: "top" | "bottom" | "left" | "right";
  className?: string;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function Popover({
  trigger,
  content,
  placement = "bottom",
  className = "",
  isOpen: controlledOpen,
  onOpenChange,
}: PopoverProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const containerRef = useRef<HTMLDivElement>(null);

  const toggle = (nextState?: boolean) => {
    const newState = nextState !== undefined ? nextState : !isOpen;
    if (!isControlled) {
      setInternalOpen(newState);
    }
    onOpenChange?.(newState);
  };

  useClickOutside(containerRef, () => toggle(false), isOpen);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    } else if (e.key === "Escape" && isOpen) {
      e.preventDefault();
      toggle(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className="cr-popover-wrapper"
      onKeyDown={handleKeyDown}
    >
      <div
        className="cr-popover__trigger"
        onClick={() => toggle()}
        role="button"
        tabIndex={0}
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
