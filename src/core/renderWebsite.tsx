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

  if (typeof document === "undefined") {
    return;
  }

  if (opts.title) {
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
          maxWidth: "1080px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          alignItems: "stretch",
          width: "100%",
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

/**
 * Website - The simplest way to build a complete, interactive website in plain English style.
 * 
 * Examples:
 * 1. Title + Array:
 *    Website("My Store", [
 *      Heading("Welcome").gradient().center(),
 *      Text("Best goods online").muted(),
 *      Button("Shop Now").green().link("/shop")
 *    ]);
 * 
 * 2. Title + Elements:
 *    Website("My Store",
 *      Heading("Welcome").gradient(),
 *      Button("Shop Now").green().link("/shop")
 *    );
 * 
 * 3. Component:
 *    Website(ShowcaseApp);
 */
export function Website(
  titleOrContent: string | ComponentType<any> | ReactElement | ReactNode[],
  ...rest: ReactNode[]
): void {
  if (typeof titleOrContent === "string") {
    const title = titleOrContent;
    let items: ReactNode[] = [];
    if (rest.length === 1 && Array.isArray(rest[0])) {
      items = rest[0];
    } else {
      items = rest;
    }
    renderWebsite(items, { title });
    return;
  }
  if (rest.length > 0) {
    renderWebsite([titleOrContent as ReactNode, ...rest]);
    return;
  }
  renderWebsite(titleOrContent as any);
}

export function createWebsiteLayout(items: ReactNode[]): ReactElement {
  return (
    <div
      className="cr-simple-website-layout"
      style={{
        minHeight: "100vh",
        padding: "3rem 2rem",
        maxWidth: "1080px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        alignItems: "stretch",
        width: "100%",
      }}
    >
      {items}
    </div>
  );
}

Website.layout = createWebsiteLayout;

