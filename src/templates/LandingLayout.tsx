import React, { type ReactNode } from "react";
import { Navbar } from "../components/navigation/Navbar";
import { Container } from "../components/layout/Container";
import { classNames } from "../core/classNames";

export interface LandingLayoutProps {
  brand: ReactNode;
  navLinks?: ReactNode;
  navActions?: ReactNode;
  hero: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export function LandingLayout({
  brand,
  navLinks,
  navActions,
  hero,
  children,
  footer,
  className = "",
}: LandingLayoutProps) {
  return (
    <div className={classNames("cr-landing-layout", className)}>
      <Navbar brand={brand} links={navLinks} actions={navActions} sticky glass />
      
      <main className="cr-landing-layout__main">
        <section className="cr-landing-layout__hero">
          <Container maxWidth="xl">{hero}</Container>
        </section>

        {children && (
          <section className="cr-landing-layout__content">
            <Container maxWidth="xl">{children}</Container>
          </section>
        )}
      </main>

      {footer && (
        <footer className="cr-landing-layout__footer">
          <Container maxWidth="xl">{footer}</Container>
        </footer>
      )}
    </div>
  );
}
