import React, { useState, type ReactNode, type ReactElement } from "react";
import { classNames } from "../../core/classNames";
import { Menu, X } from "lucide-react";
import { createChainableProxy } from "../../core/shorthand";

export interface NavbarProps {
  brand?: ReactNode;
  links?: ReactNode;
  actions?: ReactNode;
  sticky?: boolean;
  glass?: boolean;
  className?: string;
}

export function BaseNavbar({
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

BaseNavbar.displayName = "BaseNavbar";

export interface NavbarChainable {
  sticky(val?: boolean): ReactElement & NavbarChainable;
  glass(val?: boolean): ReactElement & NavbarChainable;
  actions(act: ReactNode): ReactElement & NavbarChainable;
}

function attachNavbarChaining(element: ReactElement, props: NavbarProps): ReactElement & NavbarChainable {
  const update = (patch: Partial<NavbarProps>) =>
    createNavbarElement({ ...props, ...patch });

  return createChainableProxy(element, {
    sticky: (val = true) => update({ sticky: val }),
    glass: (val = true) => update({ glass: val }),
    actions: (act: ReactNode) => update({ actions: act }),
  });
}

function createNavbarElement(props: NavbarProps): ReactElement & NavbarChainable {
  const element = <BaseNavbar {...props} />;
  return attachNavbarChaining(element, props);
}

/**
 * Universal Navbar:
 * 1. English Function Call:
 *    Navbar("My Store", ["Home", "Products", "Cart"], Button("Sign In").blue())
 * 2. Component Links:
 *    Navbar("My Store", [ Link("Home", "/"), Link("Cart", "/cart") ])
 * 3. JSX Component:
 *    <Navbar brand="My Store" links={...} />
 */
export function Navbar(props: NavbarProps): ReactElement;
export function Navbar(
  brand: ReactNode,
  links?: (string | ReactNode)[] | ReactNode,
  actions?: ReactNode
): ReactElement & NavbarChainable;
export function Navbar(first?: any, second?: any, third?: any): ReactElement & NavbarChainable {
  if (
    first &&
    typeof first === "object" &&
    !React.isValidElement(first) &&
    ("brand" in first || "links" in first || "actions" in first)
  ) {
    return (<BaseNavbar {...first} />) as any;
  }

  let brand: ReactNode = first;
  let links: ReactNode = second;
  let actions: ReactNode = third;

  if (Array.isArray(second)) {
    links = (
      <div style={{ display: "flex", gap: "1.25rem", alignItems: "center" }}>
        {second.map((item, idx) => {
          if (typeof item === "string") {
            const path = item === "Home" ? "/" : `/${item.toLowerCase().replace(/\s+/g, "-")}`;
            return (
              <a key={idx} href={path} className="cr-navbar__link" style={{ textDecoration: "none", color: "var(--cr-text-secondary)", fontWeight: 500 }}>
                {item}
              </a>
            );
          }
          return React.isValidElement(item) ? React.cloneElement(item, { key: item.key || `nav-${idx}` }) : item;
        })}
      </div>
    );
  }

  return createNavbarElement({ brand, links, actions });
}

Navbar.displayName = "Navbar";
