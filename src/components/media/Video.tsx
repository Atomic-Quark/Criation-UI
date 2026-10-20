import React, { forwardRef, type VideoHTMLAttributes } from "react";
import { classNames } from "../../core/classNames";

export interface VideoProps extends VideoHTMLAttributes<HTMLVideoElement> {
  rounded?: "none" | "sm" | "md" | "lg" | "xl";
  aspectRatio?: string;
}

export const Video = forwardRef<HTMLVideoElement, VideoProps>(
  ({ rounded = "md", aspectRatio = "16/9", className = "", style, ...props }, ref) => {
    return (
      <div
        className={classNames(
          "cr-video-wrapper",
          `cr-video--rounded-${rounded}`,
          className
        )}
        style={{ aspectRatio, ...style }}
      >
        <video ref={ref} className="cr-video" controls {...props} />
      </div>
    );
  }
);

Video.displayName = "Video";
