import React, { type ComponentType, type ReactElement, type ReactNode } from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "../design-system/themes/ThemeProvider";
import { ToastProvider } from "../components/feedback/Toast";
import "../styles.css";

export interface RenderWebsiteOptions {
  rootId?: string;
  theme?: "dark" | "light" | "system";
  title?: string;
}

/**
 * Ultra-simple 1-line website mounter.
 * Automatically wraps your app in ThemeProvider, ToastProvider, and mounts to DOM.
 * 
 * Usage:
 * 1. Pass a Component:
 *    renderWebsite(App);
 * 
 * 2. Pass an Array of 1-line components:
 *    renderWebsite([
 *      Heading("My Website", 1, "gradient"),
 *      Text("Built in 3 lines without HTML tags."),
 *      Button("Go to Cart", "/cart", "red")
 *    ]);
 */
export function renderWebsite(
  AppOrComponents: ComponentType<any> | ReactElement | ReactNode[],
  options?: RenderWebsiteOptions | string
): void {
  const opts: RenderWebsiteOptions =
    typeof options === "string" ? { rootId: options } : options || {};

  const rootId = opts.rootId || "root";
  const defaultTheme = opts.theme || "dark";

  if (opts.title && typeof document !== "undefined") {
    document.title = opts.title;
  }

  let rootElement = document.getElementById(rootId);
  if (!rootElement) {
    rootElement = document.createElement("div");
    rootElement.id = rootId;
    document.body.appendChild(rootElement);
  }

  let content: ReactNode;

  if (Array.isArray(AppOrComponents)) {
    content = (
      <div
        className="cr-simple-website-layout"
        style={{
          minHeight: "100vh",
          padding: "3rem 2rem",
          maxWidth: "1000px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
          alignItems: "flex-start",
        }}
      >
        {AppOrComponents}
      </div>
    );
  } else if (
    typeof AppOrComponents === "function" ||
    (typeof AppOrComponents === "object" &&
      AppOrComponents !== null &&
      "$$typeof" in AppOrComponents &&
      !("props" in AppOrComponents))
  ) {
    const Component = AppOrComponents as ComponentType<any>;
    content = <Component />;
  } else {
    content = AppOrComponents as ReactNode;
  }

  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ThemeProvider defaultTheme={defaultTheme}>
        <ToastProvider>{content}</ToastProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
}

// Aliases for convenience
export const createWebsite = renderWebsite;
export const mountWebsite = renderWebsite;
