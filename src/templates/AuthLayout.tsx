import React, { type ReactNode } from "react";
import { Card } from "../components/data-display/Card";
import { classNames } from "../core/classNames";

export interface AuthLayoutProps {
  brand?: ReactNode;
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
  backgroundPattern?: boolean;
  className?: string;
}

export function AuthLayout({
  brand,
  title,
  subtitle,
  children,
  footer,
  backgroundPattern = true,
  className = "",
}: AuthLayoutProps) {
  return (
    <div
      className={classNames(
        "cr-auth-layout",
        backgroundPattern && "cr-auth-layout--pattern",
        className
      )}
    >
      <div className="cr-auth-layout__inner">
        {brand && <div className="cr-auth-layout__brand">{brand}</div>}

        <Card variant="glass" className="cr-auth-layout__card">
          <div className="cr-auth-layout__header">
            <h2 className="cr-auth-layout__title">{title}</h2>
            {subtitle && <p className="cr-auth-layout__subtitle">{subtitle}</p>}
          </div>

          <div className="cr-auth-layout__body">{children}</div>

          {footer && <div className="cr-auth-layout__footer">{footer}</div>}
        </Card>
      </div>
    </div>
  );
}
