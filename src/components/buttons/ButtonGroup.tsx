import React, { forwardRef, type HTMLAttributes } from "react";
import type { ComponentSize, ComponentVariant } from "../../core/types";
import { classNames } from "../../core/classNames";

export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  size?: ComponentSize;
  variant?: ComponentVariant;
  attached?: boolean;
  vertical?: boolean;
}

export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ size, variant, attached = false, vertical = false, className = "", children, ...props }, ref) => {
    const classes = classNames(
      "cr-button-group",
      attached && "cr-button-group--attached",
      vertical && "cr-button-group--vertical",
      className
    );

    return (
      <div ref={ref} role="group" className={classes} {...props}>
        {React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) return child;
          return React.cloneElement(child, {
            size: child.props.size || size,
            variant: child.props.variant || variant,
          });
        })}
      </div>
    );
  }
);

ButtonGroup.displayName = "ButtonGroup";
