import React, { type ReactNode, type ReactElement } from "react";
import { classNames } from "../../core/classNames";

export interface FooterProps {
  copyright?: ReactNode;
  links?: (string | ReactNode)[];
  className?: string;
}

export function BaseFooter({
  copyright = "© 2026 Criation UI. All rights reserved.",
  links = ["Privacy Policy", "Terms of Service", "Support", "Contact"],
  className = "",
}: FooterProps) {
  return (
    <footer
      className={classNames("cr-footer", className)}
      style={{
        width: "100%",
        padding: "2.5rem 1.5rem",
        borderTop: "1px solid var(--cr-border-subtle)",
        marginTop: "auto",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "1rem",
        color: "var(--cr-text-muted)",
        fontSize: "0.875rem",
      }}
    >
      <div>{copyright}</div>
      {links && (
        <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", alignItems: "center" }}>
          {links.map((link, idx) => {
            if (typeof link === "string") {
              const href = `/${link.toLowerCase().replace(/\s+/g, "-")}`;
              return (
                <a
                  key={idx}
                  href={href}
                  style={{ color: "var(--cr-text-secondary)", textDecoration: "none", transition: "color 0.15s" }}
                >
                  {link}
                </a>
              );
            }
            return React.isValidElement(link) ? React.cloneElement(link, { key: link.key || `ftr-${idx}` }) : link;
          })}
        </div>
      )}
    </footer>
  );
}

BaseFooter.displayName = "BaseFooter";

/**
 * Universal Footer:
 * 1. Simple Function:
 *    Footer("© 2026 My Store", ["Privacy", "Terms", "Contact"])
 * 2. JSX Component:
 *    <Footer copyright="© 2026" />
 */
export function Footer(props: FooterProps): ReactElement;
export function Footer(copyright?: ReactNode, links?: (string | ReactNode)[]): ReactElement;
export function Footer(first?: any, second?: any): ReactElement {
  if (
    first &&
    typeof first === "object" &&
    !React.isValidElement(first) &&
    !Array.isArray(first) &&
    ("copyright" in first || "links" in first || "className" in first)
  ) {
    return <BaseFooter {...first} />;
  }

  const copyright = first;
  const links = second;

  return <BaseFooter copyright={copyright} links={links} />;
}

Footer.displayName = "Footer";
