import React, { forwardRef, type HTMLAttributes, type ReactNode, type ReactElement } from "react";
import type { Breakpoint } from "../../core/types";
import { classNames } from "../../core/classNames";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  maxWidth?: Breakpoint | "full";
  center?: boolean;
}

export const BaseContainer = forwardRef<HTMLDivElement, ContainerProps>(
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

BaseContainer.displayName = "BaseContainer";

/**
 * Universal Container:
 * 1. Simple Function:
 *    Container(Heading("Title"), Text("Body"))
 * 2. JSX Component:
 *    <Container maxWidth="lg">...</Container>
 */
export function Container(props: ContainerProps): ReactElement;
export function Container(...children: ReactNode[]): ReactElement;
export function Container(children: ReactNode[]): ReactElement;
export function Container(first?: any, ...rest: any[]): ReactElement {
  if (
    first &&
    typeof first === "object" &&
    !React.isValidElement(first) &&
    !Array.isArray(first) &&
    ("maxWidth" in first || "center" in first || "children" in first || "className" in first)
  ) {
    return <BaseContainer {...first} />;
  }

  let children: ReactNode[] = [];
  if (Array.isArray(first)) {
    children = first;
  } else if (first !== undefined) {
    children = [first, ...rest];
  }

  const mapped = React.Children.map(children, (child, i) =>
    React.isValidElement(child) ? React.cloneElement(child, { key: child.key || `cnt-${i}` }) : child
  );

  return <BaseContainer>{mapped}</BaseContainer>;
}

Container.displayName = "Container";
