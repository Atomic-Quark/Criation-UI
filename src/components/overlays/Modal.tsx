import React, { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { classNames } from "../../core/classNames";
import type { ComponentSize } from "../../core/types";
import { useFocusTrap } from "../../accessibility/focusManagement";
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
  initialFocusRef?: React.RefObject<HTMLElement | null>;
  finalFocusRef?: React.RefObject<HTMLElement | null>;
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
  initialFocusRef,
  finalFocusRef,
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useFocusTrap(dialogRef, isOpen);

  useEffect(() => {
    if (!isOpen) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (closeOnEsc && e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Auto-focus initial element or dialog
    const focusTimer = setTimeout(() => {
      if (initialFocusRef?.current) {
        initialFocusRef.current.focus();
      } else if (dialogRef.current) {
        const firstFocusable = dialogRef.current.querySelector<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (firstFocusable) {
          firstFocusable.focus();
        } else {
          dialogRef.current.focus();
        }
      }
    }, 50);

    return () => {
      clearTimeout(focusTimer);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;

      // Restore focus to trigger element
      if (finalFocusRef?.current) {
        finalFocusRef.current.focus();
      } else if (previousFocusRef.current && typeof previousFocusRef.current.focus === "function") {
        previousFocusRef.current.focus();
      }
    };
  }, [isOpen, closeOnEsc, onClose, initialFocusRef, finalFocusRef]);

  if (!isOpen) return null;

  const modalContent = (
    <div
      ref={dialogRef}
      className="cr-modal-portal"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "cr-modal-title" : undefined}
      tabIndex={-1}
    >
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
              <div id="cr-modal-title" className="cr-modal__title" role="heading" aria-level={3}>{title}</div>
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

  if (typeof document !== "undefined" && document.body) {
    return createPortal(modalContent, document.body);
  }

  return modalContent;
}
