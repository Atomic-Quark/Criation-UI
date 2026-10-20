import React, { useEffect, type ReactNode } from "react";
import { classNames } from "../../core/classNames";
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
}: DrawerProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="cr-drawer-portal" role="dialog" aria-modal="true">
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
            <h3 className="cr-drawer__title">{title}</h3>
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
}
