import React, { Component, type ErrorInfo, type ReactNode } from "react";
import { classNames } from "../../core/classNames";

export interface ErrorBoundaryProps {
  children?: ReactNode;
  fallback?: ReactNode | ((props: { error: Error; reset: () => void }) => ReactNode);
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  onReset?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.props.onError?.(error, errorInfo);
  }

  reset = () => {
    this.props.onReset?.();
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      if (typeof this.props.fallback === "function") {
        return this.props.fallback({ error: this.state.error, reset: this.reset });
      }
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default sleek Error UI
      return (
        <div
          role="alert"
          className={classNames("cr-error-boundary", this.props.className)}
          style={{
            padding: "2rem",
            backgroundColor: "var(--cr-bg-surface)",
            borderRadius: "var(--cr-radius-lg)",
            border: "1px solid var(--cr-border-subtle)",
            boxShadow: "var(--cr-shadow-md)",
            textAlign: "center",
            maxWidth: "500px",
            margin: "2rem auto",
            color: "var(--cr-text-primary)",
            ...this.props.style,
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "var(--cr-radius-full)",
              backgroundColor: "rgba(244, 63, 94, 0.15)",
              color: "var(--cr-danger)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1rem auto",
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>

          <h3 style={{ fontSize: "1.125rem", fontWeight: 600, margin: "0 0 0.5rem 0" }}>
            Something went wrong
          </h3>

          <p style={{ fontSize: "0.875rem", color: "var(--cr-text-secondary)", margin: "0 0 1.25rem 0" }}>
            {this.state.error.message || "An unexpected error occurred while rendering this component."}
          </p>

          <button
            type="button"
            onClick={this.reset}
            style={{
              padding: "8px 16px",
              fontSize: "0.875rem",
              fontWeight: 600,
              color: "#ffffff",
              backgroundColor: "var(--cr-primary)",
              border: "none",
              borderRadius: "var(--cr-radius-md)",
              cursor: "pointer",
            }}
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
