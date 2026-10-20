import React, { forwardRef, type TableHTMLAttributes } from "react";
import { classNames } from "../../core/classNames";

export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  striped?: boolean;
  hoverable?: boolean;
  compact?: boolean;
}

export const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ striped = false, hoverable = true, compact = false, className = "", children, ...props }, ref) => {
    return (
      <div className="cr-table-container">
        <table
          ref={ref}
          className={classNames(
            "cr-table",
            striped && "cr-table--striped",
            hoverable && "cr-table--hoverable",
            compact && "cr-table--compact",
            className
          )}
          {...props}
        >
          {children}
        </table>
      </div>
    );
  }
);

Table.displayName = "Table";
