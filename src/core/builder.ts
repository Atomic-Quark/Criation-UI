import type { ReactElement, ReactNode } from "react";
import {
  type ButtonChainable,
  type ButtonShorthandConfig,
  type InputChainable,
  type InputShorthandConfig,
  type HeadingChainable,
  type HeadingShorthandConfig,
  type TextChainable,
  type TextShorthandConfig,
  type CardChainable,
  type CardShorthandConfig,
  type BadgeChainable,
  type BadgeShorthandConfig,
  type LinkChainable,
  type LinkShorthandConfig,
  type ImageChainable,
  type ImageShorthandConfig,
  parseButtonShorthand,
  createButtonFromShorthand,
  parseInputShorthand,
  createInputFromShorthand,
  parseHeadingShorthand,
  createHeadingFromShorthand,
  parseTextShorthand,
  createTextFromShorthand,
  parseCardShorthand,
  createCardFromShorthand,
  parseBadgeShorthand,
  createBadgeFromShorthand,
  parseLinkShorthand,
  createLinkFromShorthand,
  parseImageShorthand,
  createImageFromShorthand,
} from "./shorthand";
import { Stack, type StackChainable, type StackProps } from "../components/layout/Stack";
import { Grid, type GridChainable, type GridProps } from "../components/layout/Grid";
import { Navbar, type NavbarChainable, type NavbarProps } from "../components/navigation/Navbar";
import { Footer, type FooterProps } from "../components/navigation/Footer";
import { createWebsiteLayout, type WebsiteLayoutOptions } from "./renderWebsite";

export interface UIBuilderOptions {
  id?: string;
  className?: string;
  size?: string;
  color?: string;
  variant?: string;
  href?: string;
  to?: string;
  disabled?: boolean;
  loading?: boolean;
  onClick?: (e: any) => void;
  [key: string]: any;
}

/**
 * Criation UI Fluent Builder (`ui`)
 *
 * Dedicated builder namespace that separates pure JSX component usage (<Button />)
 * from fluent method chaining and rapid layout construction without manually
 * invoking React component functions.
 *
 * @example
 * ```tsx
 * // 1. Fluent Builder with .build()
 * const checkoutBtn = ui.button("Checkout")
 *   .variant("success")
 *   .size("lg")
 *   .to("/checkout")
 *   .build();
 *
 * // 2. Composing layouts
 * const page = ui.stack(
 *   ui.heading("Storefront").h1().gradient(),
 *   ui.text("Explore our latest products").muted()
 * ).row().gap("2rem").build();
 * ```
 */
export const ui = {
  /**
   * Fluent Button builder
   */
  button(
    labelOrConfig?: string | ButtonShorthandConfig,
    options?: UIBuilderOptions
  ): ReactElement & ButtonChainable {
    if (typeof labelOrConfig === "object" && labelOrConfig !== null) {
      return createButtonFromShorthand(labelOrConfig);
    }
    if (options && typeof options === "object") {
      return createButtonFromShorthand({
        label: labelOrConfig || "Button",
        className: options.className,
        boxSize: options.size,
        id: options.id,
        color: options.color || options.variant,
        pathDirection: options.to || options.href,
        disabled: options.disabled,
        loading: options.loading,
        onClick: options.onClick,
      });
    }
    const config = parseButtonShorthand(labelOrConfig !== undefined ? [labelOrConfig] : []);
    return createButtonFromShorthand(config);
  },

  /**
   * Fluent Heading builder
   */
  heading(
    titleOrConfig?: string | HeadingShorthandConfig,
    options?: UIBuilderOptions
  ): ReactElement & HeadingChainable {
    if (typeof titleOrConfig === "object" && titleOrConfig !== null) {
      return createHeadingFromShorthand(titleOrConfig);
    }
    if (options && typeof options === "object") {
      return createHeadingFromShorthand({
        text: titleOrConfig || "Heading",
        id: options.id,
        level: options.level,
        color: options.color || options.variant,
        align: options.align,
      });
    }
    const config = parseHeadingShorthand(titleOrConfig !== undefined ? [titleOrConfig] : []);
    return createHeadingFromShorthand(config);
  },

  /**
   * Fluent Text builder
   */
  text(
    contentOrConfig?: string | TextShorthandConfig,
    options?: UIBuilderOptions
  ): ReactElement & TextChainable {
    if (typeof contentOrConfig === "object" && contentOrConfig !== null) {
      return createTextFromShorthand(contentOrConfig);
    }
    if (options && typeof options === "object") {
      return createTextFromShorthand({
        content: contentOrConfig || "",
        id: options.id,
        size: options.size,
        color: options.color || options.variant,
        align: options.align,
      });
    }
    const config = parseTextShorthand(contentOrConfig !== undefined ? [contentOrConfig] : []);
    return createTextFromShorthand(config);
  },

  /**
   * Fluent Input builder
   */
  input(
    placeholderOrConfig?: string | InputShorthandConfig,
    options?: UIBuilderOptions
  ): ReactElement & InputChainable {
    if (typeof placeholderOrConfig === "object" && placeholderOrConfig !== null) {
      return createInputFromShorthand(placeholderOrConfig);
    }
    if (options && typeof options === "object") {
      return createInputFromShorthand({
        placeholder: placeholderOrConfig || "",
        id: options.id,
        type: options.type || "text",
        label: options.label,
        boxSize: options.size || options.width,
        color: options.color,
      });
    }
    const config = parseInputShorthand(placeholderOrConfig !== undefined ? [placeholderOrConfig] : []);
    return createInputFromShorthand(config);
  },

  /**
   * Fluent Card builder
   */
  card(
    contentOrConfig?: ReactNode | CardShorthandConfig,
    options?: UIBuilderOptions
  ): ReactElement & CardChainable {
    if (
      typeof contentOrConfig === "object" &&
      contentOrConfig !== null &&
      !("$$typeof" in (contentOrConfig as any))
    ) {
      return createCardFromShorthand(contentOrConfig as CardShorthandConfig);
    }
    if (options && typeof options === "object") {
      return createCardFromShorthand({
        content: contentOrConfig as ReactNode,
        id: options.id,
        boxSize: options.size || options.padding,
        variant: options.variant as any,
      });
    }
    const config = parseCardShorthand(contentOrConfig !== undefined ? [contentOrConfig] : []);
    return createCardFromShorthand(config);
  },

  /**
   * Fluent Badge builder
   */
  badge(
    labelOrConfig?: string | BadgeShorthandConfig,
    options?: UIBuilderOptions
  ): ReactElement & BadgeChainable {
    if (typeof labelOrConfig === "object" && labelOrConfig !== null) {
      return createBadgeFromShorthand(labelOrConfig);
    }
    if (options && typeof options === "object") {
      return createBadgeFromShorthand({
        label: labelOrConfig || "Badge",
        id: options.id,
        size: options.size as any,
        color: options.color || options.variant,
      });
    }
    const config = parseBadgeShorthand(labelOrConfig !== undefined ? [labelOrConfig] : []);
    return createBadgeFromShorthand(config);
  },

  /**
   * Fluent Link builder
   */
  link(
    textOrConfig?: string | LinkShorthandConfig,
    href?: string,
    options?: UIBuilderOptions
  ): ReactElement & LinkChainable {
    if (typeof textOrConfig === "object" && textOrConfig !== null) {
      return createLinkFromShorthand(textOrConfig);
    }
    if (href || (options && typeof options === "object")) {
      return createLinkFromShorthand({
        label: textOrConfig || "Link",
        href: href || options?.href || options?.to || "#",
        id: options?.id,
        color: options?.color,
        isExternal: options?.external,
      });
    }
    const config = parseLinkShorthand(textOrConfig !== undefined ? [textOrConfig] : []);
    return createLinkFromShorthand(config);
  },

  /**
   * Fluent Image builder
   */
  image(
    srcOrConfig: string | ImageShorthandConfig,
    alt?: string,
    options?: UIBuilderOptions
  ): ReactElement & ImageChainable {
    if (typeof srcOrConfig === "object" && srcOrConfig !== null) {
      return createImageFromShorthand(srcOrConfig);
    }
    if (alt || (options && typeof options === "object")) {
      return createImageFromShorthand({
        src: srcOrConfig,
        alt: alt || options?.alt || "",
        id: options?.id,
        boxSize: options?.size,
        rounded: options?.rounded,
      });
    }
    const config = parseImageShorthand(srcOrConfig !== undefined ? [srcOrConfig] : []);
    return createImageFromShorthand(config);
  },

  /**
   * Fluent Stack builder
   */
  stack(...args: any[]): ReactElement & StackChainable {
    return (Stack as any)(...args);
  },

  /**
   * Fluent Grid builder
   */
  grid(...args: any[]): ReactElement & GridChainable {
    return (Grid as any)(...args);
  },

  /**
   * Fluent Navbar builder (supports positional arguments or typed options object)
   */
  navbar(
    brandOrOptions: ReactNode | { brand: ReactNode; links?: (string | ReactNode)[] | ReactNode; actions?: ReactNode; sticky?: boolean; glass?: boolean },
    links?: (string | ReactNode)[] | ReactNode,
    actions?: ReactNode
  ): ReactElement & NavbarChainable {
    if (brandOrOptions && typeof brandOrOptions === "object" && !("$$typeof" in (brandOrOptions as any)) && "brand" in (brandOrOptions as any)) {
      const opts = brandOrOptions as any;
      return (Navbar as any)(opts.brand, opts.links, opts.actions);
    }
    return (Navbar as any)(brandOrOptions, links, actions);
  },

  /**
   * Fluent Footer builder (supports positional arguments or typed options object)
   */
  footer(
    copyrightOrOptions?: ReactNode | { copyright?: ReactNode; links?: (string | ReactNode)[]; brand?: ReactNode },
    links?: (string | ReactNode)[]
  ): ReactElement {
    if (copyrightOrOptions && typeof copyrightOrOptions === "object" && !("$$typeof" in (copyrightOrOptions as any)) && ("copyright" in copyrightOrOptions || "links" in copyrightOrOptions || "brand" in copyrightOrOptions)) {
      const opts = copyrightOrOptions as any;
      return Footer(opts.copyright || opts.brand, opts.links);
    }
    return Footer(copyrightOrOptions as any, links);
  },

  /**
   * Full Page / Website container builder
   */
  website(sections: ReactNode[], options?: WebsiteLayoutOptions): ReactElement {
    return createWebsiteLayout(sections, options);
  },
};
