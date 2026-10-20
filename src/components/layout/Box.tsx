import React, { forwardRef, type ElementType, type ComponentPropsWithoutRef } from "react";
import type { CursorType, PositionType } from "../../core/types";
import { classNames } from "../../core/classNames";

export interface BoxProps<T extends ElementType = "div"> {
  as?: T;
  position?: PositionType;
  cursor?: CursorType;
  padding?: string | number;
  margin?: string | number;
  width?: string | number;
  height?: string | number;
  minWidth?: string | number;
  maxWidth?: string | number;
  minHeight?: string | number;
  maxHeight?: string | number;
  background?: string;
  color?: string;
  borderColor?: string;
  borderWidth?: string | number;
  borderRadius?: string | number;
  display?: "block" | "inline-block" | "flex" | "inline-flex" | "grid" | "none";
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export const Box = forwardRef(
  <T extends ElementType = "div">(
    {
      as,
      position,
      cursor,
      padding,
      margin,
      width,
      height,
      minWidth,
      maxWidth,
      minHeight,
      maxHeight,
      background,
      color,
      borderColor,
      borderWidth,
      borderRadius,
      display,
      className = "",
      style,
      children,
      ...props
    }: BoxProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof BoxProps<T>>,
    ref: any
  ) => {
    const Component = as || "div";

    const inlineStyles: React.CSSProperties = {
      ...style,
      ...(position ? { position } : {}),
      ...(cursor ? { cursor } : {}),
      ...(padding !== undefined ? { padding } : {}),
      ...(margin !== undefined ? { margin } : {}),
      ...(width !== undefined ? { width } : {}),
      ...(height !== undefined ? { height } : {}),
      ...(minWidth !== undefined ? { minWidth } : {}),
      ...(maxWidth !== undefined ? { maxWidth } : {}),
      ...(minHeight !== undefined ? { minHeight } : {}),
      ...(maxHeight !== undefined ? { maxHeight } : {}),
      ...(background ? { background } : {}),
      ...(color ? { color } : {}),
      ...(borderColor ? { borderColor } : {}),
      ...(borderWidth !== undefined ? { borderWidth, borderStyle: "solid" } : {}),
      ...(borderRadius !== undefined ? { borderRadius } : {}),
      ...(display ? { display } : {}),
    };

    return (
      <Component
        ref={ref}
        className={classNames("cr-box", className)}
        style={inlineStyles}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

(Box as any).displayName = "Box";
