import React, { forwardRef, type HTMLAttributes, type ReactElement, type ReactNode } from "react";
import { classNames } from "../core/classNames";
import { createChainableProxy } from "../core/shorthand";

export type ResultStatus = "success" | "error" | "warning" | "info" | "404" | "403";

export interface ResultProps extends HTMLAttributes<HTMLDivElement> {
  status?: ResultStatus;
  title: string;
  subTitle?: ReactNode;
  icon?: ReactNode;
  extra?: ReactNode;
}

export const BaseResult = forwardRef<HTMLDivElement, ResultProps>(
  (
    {
      status = "info",
      title,
      subTitle,
      icon,
      extra,
      className = "",
      style,
      ...props
    },
    ref
  ) => {
    const statusIcons: Record<ResultStatus, { color: string; bg: string; svg: ReactNode }> = {
      success: {
        color: "var(--cr-success)",
        bg: "rgba(16, 185, 129, 0.15)",
        svg: (
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ),
      },
      error: {
        color: "var(--cr-danger)",
        bg: "rgba(244, 63, 94, 0.15)",
        svg: (
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        ),
      },
      warning: {
        color: "var(--cr-warning)",
        bg: "rgba(245, 158, 11, 0.15)",
        svg: (
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        ),
      },
      info: {
        color: "var(--cr-primary)",
        bg: "rgba(99, 102, 241, 0.15)",
        svg: (
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
        ),
      },
      "404": {
        color: "var(--cr-primary)",
        bg: "rgba(99, 102, 241, 0.12)",
        svg: (
          <div style={{ fontSize: "2rem", fontWeight: 800, fontFamily: "var(--cr-font-heading)" }}>404</div>
        ),
      },
      "403": {
        color: "var(--cr-danger)",
        bg: "rgba(244, 63, 94, 0.12)",
        svg: (
          <div style={{ fontSize: "2rem", fontWeight: 800, fontFamily: "var(--cr-font-heading)" }}>403</div>
        ),
      },
    };

    const currentIcon = statusIcons[status] || statusIcons.info;

    return (
      <div
        ref={ref}
        className={classNames("cr-result", `cr-result--${status}`, className)}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "3rem 1.5rem",
          color: "var(--cr-text-primary)",
          ...style,
        }}
        {...props}
      >
        <div
          style={{
            width: "72px",
            height: "72px",
            borderRadius: "var(--cr-radius-full)",
            backgroundColor: currentIcon.bg,
            color: currentIcon.color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "1.5rem",
          }}
        >
          {icon || currentIcon.svg}
        </div>

        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, margin: "0 0 0.5rem 0" }}>{title}</h2>

        {subTitle && (
          <div
            style={{
              fontSize: "1rem",
              color: "var(--cr-text-secondary)",
              maxWidth: "480px",
              lineHeight: 1.6,
              marginBottom: extra ? "1.5rem" : 0,
            }}
          >
            {subTitle}
          </div>
        )}

        {extra && <div>{extra}</div>}
      </div>
    );
  }
);

BaseResult.displayName = "BaseResult";

export interface ResultChainable {
  success(): ReactElement & ResultChainable;
  error(): ReactElement & ResultChainable;
  warning(): ReactElement & ResultChainable;
  notFound(): ReactElement & ResultChainable;
  extra(el: ReactNode): ReactElement & ResultChainable;
}

function createResultElement(props: ResultProps): ReactElement & ResultChainable {
  const el = React.createElement(BaseResult, props);
  return createChainableProxy(el, {
    success: () => createResultElement({ ...props, status: "success" }),
    error: () => createResultElement({ ...props, status: "error" }),
    warning: () => createResultElement({ ...props, status: "warning" }),
    notFound: () => createResultElement({ ...props, status: "404" }),
    extra: (node: ReactNode) => createResultElement({ ...props, extra: node }),
  });
}

export function Result(props: ResultProps): ReactElement;
export function Result(title: string, subTitle?: ReactNode): ReactElement & ResultChainable;
export function Result(...args: any[]): ReactElement & ResultChainable {
  if (typeof args[0] === "string") {
    return createResultElement({ title: args[0], subTitle: args[1] });
  }

  const { ref, ...props } = (args[0] || {}) as ResultProps & { ref?: any };
  return React.createElement(BaseResult, { ref, ...props }) as any;
}

Result.displayName = "Result";
