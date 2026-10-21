import React, { forwardRef, type HTMLAttributes, type ReactElement } from "react";
import { classNames } from "../../core/classNames";
import { createChainableProxy } from "../../core/shorthand";

export interface StepItem {
  title: string;
  description?: string;
}

export interface StepperProps extends HTMLAttributes<HTMLDivElement> {
  steps: (string | StepItem)[];
  activeStep?: number;
  orientation?: "horizontal" | "vertical";
  onStepClick?: (stepIndex: number) => void;
}

export const BaseStepper = forwardRef<HTMLDivElement, StepperProps>(
  (
    {
      steps,
      activeStep = 0,
      orientation = "horizontal",
      onStepClick,
      className = "",
      style,
      ...props
    },
    ref
  ) => {
    const isVertical = orientation === "vertical";

    return (
      <div
        ref={ref}
        role="navigation"
        aria-label="Progress Stepper"
        className={classNames("cr-stepper", `cr-stepper--${orientation}`, className)}
        style={{
          display: "flex",
          flexDirection: isVertical ? "column" : "row",
          alignItems: isVertical ? "flex-start" : "center",
          gap: isVertical ? "1.5rem" : "0.5rem",
          width: "100%",
          ...style,
        }}
        {...props}
      >
        {steps.map((rawStep, index) => {
          const step: StepItem = typeof rawStep === "string" ? { title: rawStep } : rawStep;
          const isCompleted = index < activeStep;
          const isCurrent = index === activeStep;
          const isPending = index > activeStep;

          return (
            <React.Fragment key={index}>
              {/* Step Circle & Label */}
              <div
                onClick={() => onStepClick?.(index)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  cursor: onStepClick ? "pointer" : "default",
                  flexShrink: 0,
                }}
              >
                {/* Number / Check circle */}
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "var(--cr-radius-full)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    backgroundColor: isCompleted
                      ? "var(--cr-success)"
                      : isCurrent
                      ? "var(--cr-primary)"
                      : "var(--cr-bg-surface-hover)",
                    color: isCompleted || isCurrent ? "#ffffff" : "var(--cr-text-muted)",
                    border: isPending ? "1px solid var(--cr-border-subtle)" : "none",
                    boxShadow: isCurrent ? "var(--cr-primary-glow)" : "none",
                    transition: "all var(--cr-transition-fast)",
                  }}
                >
                  {isCompleted ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </div>

                {/* Title & Description */}
                <div>
                  <div
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: isCurrent ? 600 : 500,
                      color: isCurrent
                        ? "var(--cr-text-primary)"
                        : isCompleted
                        ? "var(--cr-text-secondary)"
                        : "var(--cr-text-muted)",
                    }}
                  >
                    {step.title}
                  </div>
                  {step.description && (
                    <div style={{ fontSize: "0.75rem", color: "var(--cr-text-muted)" }}>
                      {step.description}
                    </div>
                  )}
                </div>
              </div>

              {/* Connecting Line (for horizontal stepper) */}
              {!isVertical && index < steps.length - 1 && (
                <div
                  style={{
                    flex: 1,
                    height: "2px",
                    backgroundColor: isCompleted ? "var(--cr-success)" : "var(--cr-border-subtle)",
                    margin: "0 0.5rem",
                    minWidth: "24px",
                    transition: "background-color var(--cr-transition-normal)",
                  }}
                  aria-hidden="true"
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  }
);

BaseStepper.displayName = "BaseStepper";

export interface StepperChainable {
  active(index: number): ReactElement & StepperChainable;
  vertical(): ReactElement & StepperChainable;
  horizontal(): ReactElement & StepperChainable;
  onStepClick(fn: (idx: number) => void): ReactElement & StepperChainable;
}

function createStepperElement(props: StepperProps): ReactElement & StepperChainable {
  const el = React.createElement(BaseStepper, props);
  return createChainableProxy(el, {
    active: (index: number) => createStepperElement({ ...props, activeStep: index }),
    vertical: () => createStepperElement({ ...props, orientation: "vertical" }),
    horizontal: () => createStepperElement({ ...props, orientation: "horizontal" }),
    onStepClick: (fn: (idx: number) => void) => createStepperElement({ ...props, onStepClick: fn }),
  });
}

export function Stepper(props: StepperProps): ReactElement;
export function Stepper(steps: (string | StepItem)[], activeStep?: number): ReactElement & StepperChainable;
export function Stepper(...args: any[]): ReactElement & StepperChainable {
  if (Array.isArray(args[0])) {
    return createStepperElement({ steps: args[0], activeStep: typeof args[1] === "number" ? args[1] : 0 });
  }

  const { ref, ...props } = (args[0] || {}) as StepperProps & { ref?: any };
  return React.createElement(BaseStepper, { ref, ...props }) as any;
}

Stepper.displayName = "Stepper";
