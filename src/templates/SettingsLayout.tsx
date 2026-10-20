import React, { useState, type ReactNode } from "react";
import { Container } from "../components/layout/Container";
import { classNames } from "../core/classNames";

export interface SettingsSection {
  id: string;
  label: string;
  icon?: ReactNode;
  content: ReactNode;
}

export interface SettingsLayoutProps {
  title?: string;
  description?: string;
  sections: SettingsSection[];
  defaultSectionId?: string;
  className?: string;
}

export function SettingsLayout({
  title = "Account Settings",
  description = "Manage your profile, team members, security, and notification preferences.",
  sections,
  defaultSectionId,
  className = "",
}: SettingsLayoutProps) {
  const [activeSectionId, setActiveSectionId] = useState(
    defaultSectionId || (sections[0] ? sections[0].id : "")
  );

  const activeSection = sections.find((s) => s.id === activeSectionId);

  return (
    <div className={classNames("cr-settings-layout", className)}>
      <Container maxWidth="xl">
        <div className="cr-settings-layout__header">
          <h1 className="cr-settings-layout__title">{title}</h1>
          {description && <p className="cr-settings-layout__description">{description}</p>}
        </div>

        <div className="cr-settings-layout__grid">
          <aside className="cr-settings-layout__nav">
            {sections.map((section) => (
              <button
                key={section.id}
                type="button"
                className={classNames(
                  "cr-settings-layout__tab",
                  section.id === activeSectionId && "is-active"
                )}
                onClick={() => setActiveSectionId(section.id)}
              >
                {section.icon && (
                  <span className="cr-settings-layout__icon">{section.icon}</span>
                )}
                <span>{section.label}</span>
              </button>
            ))}
          </aside>

          <main className="cr-settings-layout__content cr-animate-fade-in">
            {activeSection?.content}
          </main>
        </div>
      </Container>
    </div>
  );
}
