import React, { useEffect, type ReactNode } from "react";
import { classNames } from "../../core/classNames";
import type { ComponentSize } from "../../core/types";
import { X } from "lucide-react";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: ReactNode;
  size?: ComponentSize;
  children: ReactNode;
  footer?: ReactNode;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  className?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  size = "md",
  children,
  footer,
  closeOnOverlayClick = true,
  closeOnEsc = true,
  className = "",
}: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (closeOnEsc && e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, closeOnEsc, onClose]);

  if (!isOpen) return null;

  return (
    <div className="cr-modal-portal" role="dialog" aria-modal="true">
      <div
        className="cr-modal__backdrop"
        onClick={closeOnOverlayClick ? onClose : undefined}
      />
      <div className="cr-modal__container">
        <div
          className={classNames(
            "cr-modal__dialog",
            `cr-modal__dialog--${size}`,
            "cr-animate-fade-in",
            className
          )}
        >
          {title && (
            <div className="cr-modal__header">
              <h3 className="cr-modal__title">{title}</h3>
              <button
                type="button"
                className="cr-modal__close-btn"
                onClick={onClose}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>
          )}
          <div className="cr-modal__body">{children}</div>
          {footer && <div className="cr-modal__footer">{footer}</div>}
        </div>
      </div>
    </div>
  );
}
