import React, { useState, type ReactNode } from "react";
import { classNames } from "../../core/classNames";
import { Menu, X } from "lucide-react";

export interface NavbarProps {
  brand: ReactNode;
  links?: ReactNode;
  actions?: ReactNode;
  sticky?: boolean;
  glass?: boolean;
  className?: string;
}

export function Navbar({
  brand,
  links,
  actions,
  sticky = true,
  glass = true,
  className = "",
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className={classNames(
        "cr-navbar",
        sticky && "cr-navbar--sticky",
        glass && "cr-navbar--glass",
        className
      )}
    >
      <div className="cr-navbar__container">
        <div className="cr-navbar__brand">{brand}</div>

        <nav className="cr-navbar__links">{links}</nav>

        <div className="cr-navbar__actions">
          {actions}
          <button
            type="button"
            className="cr-navbar__toggle"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="cr-navbar__mobile-menu cr-animate-fade-in">
          <div className="cr-navbar__mobile-links">{links}</div>
          {actions && <div className="cr-navbar__mobile-actions">{actions}</div>}
        </div>
      )}
    </header>
  );
}
