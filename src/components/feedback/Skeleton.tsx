import React from "react";
import { classNames } from "../../core/classNames";

export interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  circle?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function Skeleton({
  width = "100%",
  height = "1.25rem",
  circle = false,
  className = "",
  style,
}: SkeletonProps) {
  return (
    <div
      className={classNames("cr-skeleton", circle && "cr-skeleton--circle", className)}
      style={{
        width,
        height,
        ...style,
      }}
      aria-hidden="true"
    />
  );
}
