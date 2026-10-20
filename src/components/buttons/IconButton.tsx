import React, { forwardRef, type ReactNode } from "react";
import { Button, type ButtonProps } from "./Button";
import { classNames } from "../../core/classNames";

export interface IconButtonProps extends Omit<ButtonProps, "leftIcon" | "rightIcon" | "children"> {
  icon: ReactNode;
  "aria-label": string;
  isRound?: boolean;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, "aria-label": ariaLabel, isRound = false, className = "", ...props }, ref) => {
    return (
      <Button
        ref={ref}
        aria-label={ariaLabel}
        className={classNames("cr-icon-button", isRound && "cr-icon-button--round", className)}
        {...props}
      >
        <span className="cr-icon-button__inner">{icon}</span>
      </Button>
    );
  }
);

IconButton.displayName = "IconButton";
