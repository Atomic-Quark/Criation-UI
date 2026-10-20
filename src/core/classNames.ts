import { UI_PREFIX } from "./defaults";

type ClassValue =
  | string
  | number
  | boolean
  | undefined
  | null
  | { [key: string]: boolean | undefined | null }
  | ClassValue[];

/**
 * Modern lightweight class name builder
 */
export function classNames(...classes: ClassValue[]): string {
  const result: string[] = [];

  for (const item of classes) {
    if (!item) continue;

    if (typeof item === "string" || typeof item === "number") {
      result.push(String(item).trim());
    } else if (Array.isArray(item)) {
      const nested = classNames(...item);
      if (nested) result.push(nested);
    } else if (typeof item === "object") {
      for (const [key, val] of Object.entries(item)) {
        if (val) result.push(key);
      }
    }
  }

  return result.filter(Boolean).join(" ");
}

/**
 * Shorthand helper for creating prefixed component classes
 * e.g. cr("button", "primary", { loading: true }) => "cr-button cr-button--primary is-loading"
 */
export function cr(
  component: string,
  variantOrModifier?: string,
  modifiers?: Record<string, boolean | undefined | null>
): string {
  const base = `${UI_PREFIX}-${component}`;
  const list: string[] = [base];

  if (variantOrModifier) {
    list.push(`${base}--${variantOrModifier}`);
  }

  if (modifiers) {
    for (const [key, val] of Object.entries(modifiers)) {
      if (val) {
        list.push(`${base}--${key}`);
      }
    }
  }

  return list.join(" ");
}

export const cn = classNames;
