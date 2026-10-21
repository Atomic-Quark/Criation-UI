import React, { forwardRef, type HTMLAttributes, type ReactElement, type ReactNode } from "react";
import { classNames } from "../../core/classNames";
import { createChainableProxy } from "../../core/shorthand";

export interface ScrollAreaProps extends HTMLAttributes<HTMLDivElement> {
  maxHeight?: string | number;
  maxWidth?: string | number;
  orientation?: "vertical" | "horizontal" | "both";
  children?: ReactNode;
}

export const BaseScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(
  (
    {
      maxHeight = "300px",
      maxWidth = "100%",
      orientation = "vertical",
      className = "",
      style,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={classNames("cr-scroll-area", "cr-scrollbar", className)}
        style={{
          maxHeight,
          maxWidth,
          overflowY: orientation === "horizontal" ? "hidden" : "auto",
          overflowX: orientation === "vertical" ? "hidden" : "auto",
          scrollbarWidth: "thin",
          scrollbarColor: "var(--cr-border-muted) transparent",
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

BaseScrollArea.displayName = "BaseScrollArea";

export interface ScrollAreaChainable {
  maxHeight(h: string | number): ReactElement & ScrollAreaChainable;
  maxWidth(w: string | number): ReactElement & ScrollAreaChainable;
  horizontal(): ReactElement & ScrollAreaChainable;
  both(): ReactElement & ScrollAreaChainable;
}

function createScrollAreaElement(props: ScrollAreaProps): ReactElement & ScrollAreaChainable {
  const el = React.createElement(BaseScrollArea, props);
  return createChainableProxy(el, {
    maxHeight: (h: string | number) => createScrollAreaElement({ ...props, maxHeight: h }),
    maxWidth: (w: string | number) => createScrollAreaElement({ ...props, maxWidth: w }),
    horizontal: () => createScrollAreaElement({ ...props, orientation: "horizontal" }),
    both: () => createScrollAreaElement({ ...props, orientation: "both" }),
  });
}

export function ScrollArea(props: ScrollAreaProps): ReactElement;
export function ScrollArea(maxHeightOrChildren?: string | number | ReactNode, children?: ReactNode): ReactElement & ScrollAreaChainable;
export function ScrollArea(...args: any[]): ReactElement & ScrollAreaChainable {
  if (typeof args[0] === "string" || typeof args[0] === "number") {
    return createScrollAreaElement({ maxHeight: args[0], children: args[1] });
  }
  if (React.isValidElement(args[0]) || Array.isArray(args[0])) {
    return createScrollAreaElement({ children: args[0] });
  }

  const { ref, ...props } = (args[0] || {}) as ScrollAreaProps & { ref?: any };
  return React.createElement(BaseScrollArea, { ref, ...props }) as any;
}

ScrollArea.displayName = "ScrollArea";
