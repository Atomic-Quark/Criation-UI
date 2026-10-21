import React, { forwardRef, type HTMLAttributes, type ReactElement, type ReactNode } from "react";
import { classNames } from "../../core/classNames";
import { createChainableProxy } from "../../core/shorthand";

export interface TimelineEvent {
  title: string;
  timestamp?: string;
  description?: ReactNode;
  icon?: ReactNode;
  status?: "completed" | "current" | "pending" | "danger";
}

export interface TimelineProps extends HTMLAttributes<HTMLDivElement> {
  events: TimelineEvent[];
  dense?: boolean;
}

export const BaseTimeline = forwardRef<HTMLDivElement, TimelineProps>(
  ({ events, dense = false, className = "", style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={classNames("cr-timeline", dense && "cr-timeline--dense", className)}
        style={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
          ...style,
        }}
        {...props}
      >
        {events.map((event, idx) => {
          const isLast = idx === events.length - 1;
          const status = event.status || (idx === 0 ? "current" : "completed");

          const statusColors = {
            completed: "var(--cr-success)",
            current: "var(--cr-primary)",
            pending: "var(--cr-text-muted)",
            danger: "var(--cr-danger)",
          };

          const dotColor = statusColors[status] || statusColors.completed;

          return (
            <div
              key={idx}
              style={{
                display: "flex",
                gap: "1rem",
                position: "relative",
                paddingBottom: isLast ? "0" : dense ? "1rem" : "1.75rem",
              }}
            >
              {/* Node Column */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "24px",
                  flexShrink: 0,
                }}
              >
                {/* Bullet circle or Icon */}
                <div
                  style={{
                    width: event.icon ? "28px" : "12px",
                    height: event.icon ? "28px" : "12px",
                    borderRadius: "var(--cr-radius-full)",
                    backgroundColor: event.icon ? `${dotColor}20` : dotColor,
                    color: dotColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: event.icon ? "0" : "6px",
                    boxShadow: status === "current" ? "0 0 10px rgba(99, 102, 241, 0.4)" : "none",
                    zIndex: 1,
                  }}
                >
                  {event.icon}
                </div>

                {/* Connecting Line */}
                {!isLast && (
                  <div
                    style={{
                      width: "2px",
                      flex: 1,
                      backgroundColor: "var(--cr-border-subtle)",
                      marginTop: "4px",
                    }}
                    aria-hidden="true"
                  />
                )}
              </div>

              {/* Content Column */}
              <div style={{ flex: 1, paddingTop: "2px" }}>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "0.5rem" }}>
                  <h4
                    style={{
                      fontSize: "0.9375rem",
                      fontWeight: 600,
                      margin: 0,
                      color: "var(--cr-text-primary)",
                    }}
                  >
                    {event.title}
                  </h4>
                  {event.timestamp && (
                    <span
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--cr-text-muted)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {event.timestamp}
                    </span>
                  )}
                </div>

                {event.description && (
                  <div
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--cr-text-secondary)",
                      marginTop: "0.25rem",
                      lineHeight: 1.5,
                    }}
                  >
                    {event.description}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
);

BaseTimeline.displayName = "BaseTimeline";

export interface TimelineChainable {
  dense(): ReactElement & TimelineChainable;
}

function createTimelineElement(props: TimelineProps): ReactElement & TimelineChainable {
  const el = React.createElement(BaseTimeline, props);
  return createChainableProxy(el, {
    dense: () => createTimelineElement({ ...props, dense: true }),
  });
}

export function Timeline(props: TimelineProps): ReactElement;
export function Timeline(events: TimelineEvent[]): ReactElement & TimelineChainable;
export function Timeline(...args: any[]): ReactElement & TimelineChainable {
  if (Array.isArray(args[0])) {
    return createTimelineElement({ events: args[0] });
  }

  const { ref, ...props } = (args[0] || {}) as TimelineProps & { ref?: any };
  return React.createElement(BaseTimeline, { ref, ...props }) as any;
}

Timeline.displayName = "Timeline";
