import React, { forwardRef, type AnchorHTMLAttributes, type ReactElement, type Ref } from "react";
import { classNames } from "../../core/classNames";
import { ExternalLink } from "lucide-react";
import {
  parseLinkShorthand,
  createLinkFromShorthand,
  type LinkShorthandConfig,
} from "../../core/shorthand";

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  isExternal?: boolean;
  underline?: "always" | "hover" | "none";
  color?: "brand" | "primary" | "secondary" | "muted";
  ref?: Ref<HTMLAnchorElement>;
}


export const BaseLink = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      isExternal = false,
      underline = "hover",
      color = "brand",
      className = "",
      children,
      target,
      rel,
      ...props
    },
    ref
  ) => {
    const finalTarget = isExternal ? "_blank" : target;
    const finalRel = isExternal ? "noopener noreferrer" : rel;

    return (
      <a
        ref={ref}
        target={finalTarget}
        rel={finalRel}
        className={classNames(
          "cr-link",
          `cr-link--underline-${underline}`,
          `cr-link--color-${color}`,
          className
        )}
        {...props}
      >
        <span className="cr-link__text">{children}</span>
        {isExternal && <ExternalLink size={14} className="cr-link__external-icon" />}
      </a>
    );
  }
);

BaseLink.displayName = "BaseLink";

/**
 * Universal Link:
 * 1. 1-Line Shorthand (all slots optional):
 *    Link("View Documentation", "https://docs.example.com", "doc_link", "brand", true)
 *    Link("About Us", "/about")
 * 2. JSX Component:
 *    <Link href="/about">About Us</Link>
 */
export function Link(props: LinkProps): ReactElement;
export function Link(
  label?: string,
  href?: string,
  id?: string,
  color?: string,
  isExternal?: boolean,
  position?: string
): ReactElement;
export function Link(strings: TemplateStringsArray, ...values: any[]): ReactElement;
export function Link(...args: any[]): ReactElement {
  if (
    typeof args[0] === "string" ||
    (Array.isArray(args[0]) && (args[0] as any).raw) ||
    args.length === 0
  ) {
    const config = parseLinkShorthand(args);
    return createLinkFromShorthand(config);
  }

  const { ref, ...props } = (args[0] || {}) as LinkProps;
  return <BaseLink ref={ref} {...props} />;
}

Link.displayName = "Link";
Link.create = (config: LinkShorthandConfig) => createLinkFromShorthand(config);

