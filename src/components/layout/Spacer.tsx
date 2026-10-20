import React from "react";

export interface SpacerProps {
  x?: string | number;
  y?: string | number;
}

export function Spacer({ x, y }: SpacerProps) {
  return (
    <span
      className="cr-spacer"
      style={{
        display: "block",
        width: x !== undefined ? x : "auto",
        height: y !== undefined ? y : "auto",
        flexShrink: 0,
      }}
      aria-hidden="true"
    />
  );
}
