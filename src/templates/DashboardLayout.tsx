import React, { useState, type ReactNode } from "react";
import { Sidebar, type SidebarItem } from "../components/navigation/Sidebar";
import { classNames } from "../core/classNames";

export interface DashboardLayoutProps {
  brand: ReactNode;
  sidebarItems: SidebarItem[];
  userProfile?: ReactNode;
  topActions?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function DashboardLayout({
  brand,
  sidebarItems,
  userProfile,
  topActions,
  children,
  className = "",
}: DashboardLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={classNames("cr-dashboard-layout", className)}>
      <Sidebar
        header={<div className="cr-dashboard-layout__brand">{brand}</div>}
        items={sidebarItems}
        collapsed={collapsed}
        footer={userProfile}
      />

      <div className="cr-dashboard-layout__body">
        <header className="cr-dashboard-layout__topbar">
          <button
            type="button"
            className="cr-dashboard-layout__collapse-btn"
            onClick={() => setCollapsed((prev) => !prev)}
            aria-label="Toggle sidebar collapse"
          >
            ☰
          </button>
          <div className="cr-dashboard-layout__top-actions">{topActions}</div>
        </header>

        <main className="cr-dashboard-layout__content">{children}</main>
      </div>
    </div>
  );
}
