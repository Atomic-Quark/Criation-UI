import React, { type ReactNode } from "react";
import { Card } from "./Card";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { classNames } from "../../core/classNames";

export interface StatCardProps {
  title: string;
  value: string | number;
  change?: number; // e.g. +12.5 or -3.2
  changePeriod?: string; // e.g. "vs last month"
  icon?: ReactNode;
  variant?: "outline" | "glass" | "elevated";
  className?: string;
}

export function StatCard({
  title,
  value,
  change,
  changePeriod = "vs last month",
  icon,
  variant = "glass",
  className = "",
}: StatCardProps) {
  const isPositive = change !== undefined && change >= 0;

  return (
    <Card variant={variant} className={classNames("cr-stat-card", className)}>
      <div className="cr-stat-card__top">
        <span className="cr-stat-card__title">{title}</span>
        {icon && <div className="cr-stat-card__icon">{icon}</div>}
      </div>
      <div className="cr-stat-card__value">{value}</div>
      {change !== undefined && (
        <div className="cr-stat-card__trend">
          <span
            className={classNames(
              "cr-stat-card__badge",
              isPositive ? "is-positive" : "is-negative"
            )}
          >
            {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            {Math.abs(change)}%
          </span>
          <span className="cr-stat-card__period">{changePeriod}</span>
        </div>
      )}
    </Card>
  );
}
