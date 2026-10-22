import React, { type ReactElement } from "react";
import {
  parseButtonShorthand,
  createButtonFromShorthand,
  parseInputShorthand,
  createInputFromShorthand,
  parseHeadingShorthand,
  createHeadingFromShorthand,
  parseTextShorthand,
  createTextFromShorthand,
  parseBadgeShorthand,
  createBadgeFromShorthand,
  parseCardShorthand,
  createCardFromShorthand,
  parseLinkShorthand,
  createLinkFromShorthand,
  parseImageShorthand,
  createImageFromShorthand,
} from "./shorthand";

/**
 * Parses full multi-line Criation DSL text:
 * Supports:
 * - Button = "Go_to_cart", "10px 2px", "ID", "Auth", "/cart", "red", "position", "pointer"
 * - Input = "Enter_your_email", "320px", "email_box", "email", "Email Address", "blue"
 * - Heading = "Welcome_to_Store", 1, "title_1", "gradient", "center"
 * - Text = "Fast_delivery_worldwide", "md", "desc_1", "secondary"
 * - Badge = "SALE_50%", "sm", "badge_1", "danger"
 * - Card = "Order_Confirmed_Successfully", "320px", "card_1", "glass"
 * - Link = "Terms_and_Conditions", "/terms", "link_1", "brand"
 * - Image = "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500", "280px 180px", "hero_img", "Product", "lg"
 */
export function parseCriationDSL(dsl: string): ReactElement[] {
  if (!dsl || typeof dsl !== "string") {
    return [];
  }

  const lines = dsl
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("//") && !l.startsWith("#"));

  const elements: ReactElement[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    try {
      if (line.startsWith("Button")) {
        const config = parseButtonShorthand([line]);
        elements.push(React.cloneElement(createButtonFromShorthand(config), { key: `dsl-btn-${i}` }));
      } else if (line.startsWith("Input")) {
        const config = parseInputShorthand([line]);
        elements.push(React.cloneElement(createInputFromShorthand(config), { key: `dsl-input-${i}` }));
      } else if (line.startsWith("Heading")) {
        const config = parseHeadingShorthand([line]);
        elements.push(React.cloneElement(createHeadingFromShorthand(config), { key: `dsl-heading-${i}` }));
      } else if (line.startsWith("Text")) {
        const config = parseTextShorthand([line]);
        elements.push(React.cloneElement(createTextFromShorthand(config), { key: `dsl-text-${i}` }));
      } else if (line.startsWith("Badge")) {
        const parts = line
          .replace(/^Badge\s*=\s*/, "")
          .split(/,\s*(?=(?:[^"]*"[^"]*")*[^"]*$)/)
          .map((p) => p.trim().replace(/^["']|["']$/g, ""));
        const config = parseBadgeShorthand(parts);
        elements.push(React.cloneElement(createBadgeFromShorthand(config), { key: `dsl-badge-${i}` }));
      } else if (line.startsWith("Card")) {
        const parts = line
          .replace(/^Card\s*=\s*/, "")
          .split(/,\s*(?=(?:[^"]*"[^"]*")*[^"]*$)/)
          .map((p) => p.trim().replace(/^["']|["']$/g, ""));
        const config = parseCardShorthand(parts);
        elements.push(React.cloneElement(createCardFromShorthand(config), { key: `dsl-card-${i}` }));
      } else if (line.startsWith("Link")) {
        const parts = line
          .replace(/^Link\s*=\s*/, "")
          .split(/,\s*(?=(?:[^"]*"[^"]*")*[^"]*$)/)
          .map((p) => p.trim().replace(/^["']|["']$/g, ""));
        const config = parseLinkShorthand(parts);
        elements.push(React.cloneElement(createLinkFromShorthand(config), { key: `dsl-link-${i}` }));
      } else if (line.startsWith("Image")) {
        const parts = line
          .replace(/^Image\s*=\s*/, "")
          .split(/,\s*(?=(?:[^"]*"[^"]*")*[^"]*$)/)
          .map((p) => p.trim().replace(/^["']|["']$/g, ""));
        const config = parseImageShorthand(parts);
        elements.push(React.cloneElement(createImageFromShorthand(config), { key: `dsl-image-${i}` }));
      } else {
        // Unknown token fallback error boundary
        elements.push(
          <div
            key={`dsl-err-${i}`}
            className="criation-dsl-error"
            style={{
              padding: "4px 8px",
              background: "#fee2e2",
              color: "#991b1b",
              borderRadius: "4px",
              fontSize: "12px",
              border: "1px solid #f87171"
            }}
          >
            [DSL Syntax Warning: Unrecognized line "{line.substring(0, 40)}..."]
          </div>
        );
      }
    } catch (err: any) {
      elements.push(
        <div
          key={`dsl-err-${i}`}
          className="criation-dsl-error"
          style={{
            padding: "4px 8px",
            background: "#fee2e2",
            color: "#991b1b",
            borderRadius: "4px",
            fontSize: "12px",
            border: "1px solid #f87171"
          }}
        >
          [DSL Parse Error: {err?.message || "Invalid syntax"}]
        </div>
      );
    }
  }

  return elements;
}

/**
 * Standard alias for parseCriationDSL
 */
export const parseDSL = parseCriationDSL;

/**
 * Explicit opt-in natural language description parser (PR 15)
 * Wraps parsed DSL elements into a clean container
 */
export function describe(syntax: string): ReactElement {
  const elements = parseDSL(syntax);
  return (
    <div className="cr-describe-container" style={{ display: "inline-flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
      {elements}
    </div>
  );
}

/**
 * Direct shorthand helper function for DSL string expressions
 */
export const dsl = describe;

/**
 * React Component to render Criation DSL directly in any JSX/TSX file
 * <Criation>
 *   {`Button = "Go_to_cart", "10px 2px", "ID", "Auth", "path_direction", "red", "position", "pointer"`}
 * </Criation>
 */
export function Criation({ children, code }: { children?: string; code?: string }): ReactElement {
  const source = code || children || "";
  const elements = parseCriationDSL(source);

  return (
    <div className="cr-criation-dsl-container" style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
      {elements}
    </div>
  );
}
