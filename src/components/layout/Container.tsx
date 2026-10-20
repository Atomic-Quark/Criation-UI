import React, { forwardRef, type HTMLAttributes } from "react";
import type { Breakpoint } from "../../core/types";
import { classNames } from "../../core/classNames";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  maxWidth?: Breakpoint | "full";
  center?: boolean;
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ maxWidth = "xl", center = true, className = "", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={classNames(
          "cr-container",
          `cr-container--${maxWidth}`,
          center && "cr-container--centered",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = "Container";
