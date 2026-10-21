import React, { useState, useRef, useEffect, type ReactNode } from "react";
import { classNames } from "../../core/classNames";

export interface TooltipProps {
  label: ReactNode;
  children: ReactNode;
  placement?: "top" | "bottom" | "left" | "right";
  delayMs?: number;
  className?: string;
}

export function Tooltip({
  label,
  children,
  placement = "top",
  delayMs = 200,
  className = "",
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setIsVisible(true), delayMs);
  };

  const hide = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setIsVisible(false);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <div
      className="cr-tooltip-wrapper"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      {isVisible && (
        <div
          role="tooltip"
          className={classNames(
            "cr-tooltip",
            `cr-tooltip--${placement}`,
            "cr-animate-fade-in",
            className
          )}
        >
          {label}
        </div>
      )}
    </div>
  );
}
