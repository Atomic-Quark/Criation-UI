import React, { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { classNames } from "../../core/classNames";
import { useFocusTrap } from "../../accessibility/focusManagement";
import { X } from "lucide-react";

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: ReactNode;
  placement?: "left" | "right" | "top" | "bottom";
  size?: "sm" | "md" | "lg" | "full";
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
  initialFocusRef?: React.RefObject<HTMLElement | null>;
  finalFocusRef?: React.RefObject<HTMLElement | null>;
}

export function Drawer({
  isOpen,
  onClose,
  title,
  placement = "right",
  size = "md",
  children,
  footer,
  className = "",
  initialFocusRef,
  finalFocusRef,
}: DrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useFocusTrap(drawerRef, isOpen);

  useEffect(() => {
    if (!isOpen) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = setTimeout(() => {
      if (initialFocusRef?.current) {
        initialFocusRef.current.focus();
      } else if (drawerRef.current) {
        const firstFocusable = drawerRef.current.querySelector<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (firstFocusable) {
          firstFocusable.focus();
        } else {
          drawerRef.current.focus();
        }
      }
    }, 50);

    return () => {
      clearTimeout(focusTimer);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;

      if (finalFocusRef?.current) {
        finalFocusRef.current.focus();
      } else if (previousFocusRef.current && typeof previousFocusRef.current.focus === "function") {
        previousFocusRef.current.focus();
      }
    };
  }, [isOpen, onClose, initialFocusRef, finalFocusRef]);

  if (!isOpen) return null;

  const drawerContent = (
    <div
      ref={drawerRef}
      className="cr-drawer-portal"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "cr-drawer-title" : undefined}
      tabIndex={-1}
    >
      <div className="cr-drawer__backdrop" onClick={onClose} />
      <div
        className={classNames(
          "cr-drawer__panel",
          `cr-drawer--${placement}`,
          `cr-drawer--size-${size}`,
          className
        )}
      >
        {title && (
          <div className="cr-drawer__header">
            <h3 id="cr-drawer-title" className="cr-drawer__title">{title}</h3>
            <button
              type="button"
              className="cr-drawer__close-btn"
              onClick={onClose}
              aria-label="Close drawer"
            >
              <X size={18} />
            </button>
          </div>
        )}
        <div className="cr-drawer__body">{children}</div>
        {footer && <div className="cr-drawer__footer">{footer}</div>}
      </div>
    </div>
  );

  if (typeof document !== "undefined" && document.body) {
    return createPortal(drawerContent, document.body);
  }

  return drawerContent;
}
