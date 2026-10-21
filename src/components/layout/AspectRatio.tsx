import React, { forwardRef, type HTMLAttributes, type ReactElement, type ReactNode } from "react";
import { classNames } from "../../core/classNames";
import { createChainableProxy } from "../../core/shorthand";

export interface AspectRatioProps extends HTMLAttributes<HTMLDivElement> {
  ratio?: number; // e.g. 16/9, 4/3, 1
  children?: ReactNode;
}

export const BaseAspectRatio = forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ ratio = 16 / 9, className = "", style, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={classNames("cr-aspect-ratio", className)}
        style={{
          position: "relative",
          width: "100%",
          paddingBottom: `${(1 / ratio) * 100}%`,
          overflow: "hidden",
          ...style,
        }}
        {...props}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {children}
        </div>
      </div>
    );
  }
);

BaseAspectRatio.displayName = "BaseAspectRatio";

export interface AspectRatioChainable {
  ratio(r: number): ReactElement & AspectRatioChainable;
  square(): ReactElement & AspectRatioChainable;
  video(): ReactElement & AspectRatioChainable;
  cinema(): ReactElement & AspectRatioChainable;
  portrait(): ReactElement & AspectRatioChainable;
}

function createAspectRatioElement(props: AspectRatioProps): ReactElement & AspectRatioChainable {
  const el = React.createElement(BaseAspectRatio, props);
  return createChainableProxy(el, {
    ratio: (r: number) => createAspectRatioElement({ ...props, ratio: r }),
    square: () => createAspectRatioElement({ ...props, ratio: 1 }),
    video: () => createAspectRatioElement({ ...props, ratio: 16 / 9 }),
    cinema: () => createAspectRatioElement({ ...props, ratio: 21 / 9 }),
    portrait: () => createAspectRatioElement({ ...props, ratio: 4 / 5 }),
  });
}

export function AspectRatio(props: AspectRatioProps): ReactElement;
export function AspectRatio(ratio?: number | ReactNode, children?: ReactNode): ReactElement & AspectRatioChainable;
export function AspectRatio(...args: any[]): ReactElement & AspectRatioChainable {
  if (typeof args[0] === "number") {
    return createAspectRatioElement({ ratio: args[0], children: args[1] });
  }
  if (React.isValidElement(args[0]) || Array.isArray(args[0])) {
    return createAspectRatioElement({ ratio: 16 / 9, children: args[0] });
  }

  const { ref, ...props } = (args[0] || {}) as AspectRatioProps & { ref?: any };
  return React.createElement(BaseAspectRatio, { ref, ...props }) as any;
}

AspectRatio.displayName = "AspectRatio";
