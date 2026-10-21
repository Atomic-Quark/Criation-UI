import React, { forwardRef, type TableHTMLAttributes, type ReactNode } from "react";
import { classNames } from "../../core/classNames";

export interface TableColumn<T = any> {
  key: string;
  header: ReactNode;
  render?: (row: T, index: number) => ReactNode;
  align?: "left" | "center" | "right";
  width?: string | number;
}

export interface TableProps<T = any> extends Omit<TableHTMLAttributes<HTMLTableElement>, "children"> {
  striped?: boolean;
  hoverable?: boolean;
  compact?: boolean;
  columns?: TableColumn<T>[];
  data?: T[];
  emptyText?: ReactNode;
  children?: ReactNode;
}

export const Table = forwardRef<HTMLTableElement, TableProps<any>>(
  (
    {
      striped = false,
      hoverable = true,
      compact = false,
      className = "",
      columns,
      data,
      emptyText = "No data available",
      children,
      ...props
    },
    ref
  ) => {
    const isDeclarative = Array.isArray(columns) && Array.isArray(data);

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
          {isDeclarative ? (
            <>
              <thead>
                <tr>
                  {columns.map((col) => (
                    <th
                      key={col.key}
                      style={{ textAlign: col.align, width: col.width }}
                    >
                      {col.header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.length === 0 ? (
                  <tr>
                    <td
                      colSpan={columns.length}
                      style={{
                        textAlign: "center",
                        padding: "2rem",
                        color: "var(--cr-text-muted)",
                      }}
                    >
                      {emptyText}
                    </td>
                  </tr>
                ) : (
                  data.map((row, idx) => (
                    <tr key={(row as any)?.id ?? idx}>
                      {columns.map((col) => (
                        <td key={col.key} style={{ textAlign: col.align }}>
                          {col.render
                            ? col.render(row, idx)
                            : String((row as any)?.[col.key] ?? "")}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </>
          ) : (
            children
          )}
        </table>
      </div>
    );
  }
);

Table.displayName = "Table";
