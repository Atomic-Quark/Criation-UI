import React, { forwardRef, useState, type HTMLAttributes } from "react";
import type { ComponentSize } from "../../core/types";
import { classNames } from "../../core/classNames";
import { User } from "lucide-react";

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  name?: string;
  size?: ComponentSize;
  status?: "online" | "offline" | "busy" | "away";
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, alt = "Avatar", name, size = "md", status, className = "", ...props }, ref) => {
    const [imageError, setImageError] = useState(false);

    const getInitials = (str: string) => {
      const parts = str.trim().split(" ");
      if (parts.length >= 2) {
        return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
      }
      return str.slice(0, 2).toUpperCase();
    };

    return (
      <div
        ref={ref}
        className={classNames("cr-avatar", `cr-avatar--${size}`, className)}
        {...props}
      >
        {src && !imageError ? (
          <img
            src={src}
            alt={alt}
            className="cr-avatar__image"
            onError={() => setImageError(true)}
          />
        ) : name ? (
          <span className="cr-avatar__initials">{getInitials(name)}</span>
        ) : (
          <User className="cr-avatar__fallback-icon" size={18} />
        )}

        {status && <span className={classNames("cr-avatar__status", `cr-avatar__status--${status}`)} />}
      </div>
    );
  }
);

Avatar.displayName = "Avatar";
