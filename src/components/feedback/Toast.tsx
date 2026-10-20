import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { classNames } from "../../core/classNames";
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from "lucide-react";

export type ToastVariant = "info" | "success" | "warning" | "error";

export interface ToastItem {
  id: string;
  title?: string;
  message: string;
  variant?: ToastVariant;
  duration?: number;
}

interface ToastContextValue {
  toast: (options: Omit<ToastItem, "id">) => void;
  removeToast: (id: string) => void;
  success: (message: string, title?: string) => void;
  error: (message: string, title?: string) => void;
  info: (message: string, title?: string) => void;
  warning: (message: string, title?: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    ({ title, message, variant = "info", duration = 4000 }: Omit<ToastItem, "id">) => {
      const id = Math.random().toString(36).substring(2, 9);
      const newToast: ToastItem = { id, title, message, variant, duration };

      setToasts((prev) => [...prev, newToast]);

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
    },
    [removeToast]
  );

  const success = useCallback(
    (message: string, title?: string) => toast({ message, title, variant: "success" }),
    [toast]
  );
  const error = useCallback(
    (message: string, title?: string) => toast({ message, title, variant: "error" }),
    [toast]
  );
  const info = useCallback(
    (message: string, title?: string) => toast({ message, title, variant: "info" }),
    [toast]
  );
  const warning = useCallback(
    (message: string, title?: string) => toast({ message, title, variant: "warning" }),
    [toast]
  );

  const getIcon = (variant: ToastVariant) => {
    switch (variant) {
      case "success":
        return <CheckCircle2 size={18} />;
      case "error":
        return <XCircle size={18} />;
      case "warning":
        return <AlertTriangle size={18} />;
      default:
        return <Info size={18} />;
    }
  };

  return (
    <ToastContext.Provider value={{ toast, removeToast, success, error, info, warning }}>
      {children}
      <div className="cr-toast-container">
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            className={classNames("cr-toast", `cr-toast--${t.variant || "info"}`)}
          >
            <span className="cr-toast__icon">{getIcon(t.variant || "info")}</span>
            <div className="cr-toast__content">
              {t.title && <div className="cr-toast__title">{t.title}</div>}
              <div className="cr-toast__message">{t.message}</div>
            </div>
            <button
              type="button"
              className="cr-toast__close"
              onClick={() => removeToast(t.id)}
              aria-label="Close notification"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a <ToastProvider />");
  }
  return context;
}
