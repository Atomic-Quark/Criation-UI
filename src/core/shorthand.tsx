import React, { type ReactElement, type ReactNode } from "react";
import { navigation } from "../routing/navigation";

// ============================================================================
// SMART CLASSIFICATION & NATURAL ENGLISH PARSING HELPERS
// ============================================================================

const COLOR_NAMES = new Set([
  "red", "blue", "green", "amber", "yellow", "purple", "pink", "indigo",
  "cyan", "emerald", "rose", "violet", "orange", "teal", "sky", "gray",
  "dark", "white", "black", "danger", "primary", "secondary", "success",
  "warning", "info", "outline", "ghost", "gradient"
]);

export function isColorValue(val: any): boolean {
  if (typeof val !== "string") return false;
  const s = val.trim().toLowerCase();
  if (COLOR_NAMES.has(s)) return true;
  if (s.startsWith("#") || s.startsWith("rgb") || s.startsWith("hsl")) return true;
  return false;
}

export function isPathValue(val: any): boolean {
  if (typeof val !== "string") return false;
  const s = val.trim().toLowerCase();
  if (
    s.startsWith("/") ||
    s.startsWith("http://") ||
    s.startsWith("https://") ||
    s.startsWith("./") ||
    s.startsWith("../") ||
    s.startsWith("#")
  ) {
    return true;
  }
  if (s === "back" || s === "forward") return true;
  return false;
}

export function isBoxSizeValue(val: any): boolean {
  if (typeof val !== "string") return false;
  const s = val.trim().toLowerCase();
  if (
    s.includes("px") ||
    s.includes("rem") ||
    s.includes("em") ||
    s.includes("%") ||
    s.includes("vh") ||
    s.includes("vw")
  ) {
    return true;
  }
  if (/^\d+(\.\d+)?\s+\d+(\.\d+)?$/.test(s)) return true;
  return false;
}

export function isAuthValue(val: any): boolean {
  if (typeof val !== "string") return false;
  const s = val.trim().toLowerCase();
  return (
    s === "auth" ||
    s === "user" ||
    s === "admin" ||
    s === "required" ||
    s === "protected" ||
    s === "login"
  );
}

export function isPositionValue(val: any): boolean {
  if (typeof val !== "string") return false;
  const s = val.trim().toLowerCase();
  return (
    s === "relative" ||
    s === "absolute" ||
    s === "fixed" ||
    s === "sticky" ||
    s === "static"
  );
}

export function isPointerValue(val: any): boolean {
  if (typeof val !== "string") return false;
  const s = val.trim().toLowerCase();
  return (
    s === "pointer" ||
    s === "default" ||
    s === "not-allowed" ||
    s === "wait" ||
    s === "text" ||
    s === "grab"
  );
}

/**
 * Natural English Path Extractor:
 * Parses "go to /cart", "link to /shop", "navigate to https://...", "to /cart", "path /about", "/cart"
 */
export function extractEnglishPath(val: any): string | undefined {
  if (typeof val !== "string") return undefined;
  const s = val.trim();
  if (isPathValue(s)) return s;
  const m = s.match(/\b(?:go\s+to|link\s+to|navigate\s+to|to|url|path|href)\s+([^\s,]+)/i);
  if (m) {
    const candidate = m[1];
    if (isPathValue(candidate) || candidate.startsWith("/") || candidate.startsWith("http") || candidate.startsWith("#")) {
      return candidate;
    }
  }
  return undefined;
}

/**
 * Natural English Color Extractor:
 * Parses "colored red", "in blue", "color green", "bg amber", "with gradient", "outline", "red"
 */
export function extractEnglishColor(val: any): string | undefined {
  if (typeof val !== "string") return undefined;
  const s = val.trim().toLowerCase();
  if (isColorValue(s)) return s;
  const m = s.match(/\b(?:colored|color|in|bg|background)\s+([a-zA-Z#0-9]+)/i);
  if (m && (COLOR_NAMES.has(m[1].toLowerCase()) || isColorValue(m[1]))) {
    return m[1].toLowerCase();
  }
  if (/\b(?:with\s+)?gradient\b/i.test(s)) return "gradient";
  if (/\boutline\b/i.test(s)) return "outline";
  return undefined;
}

/**
 * Natural English Authentication Extractor:
 * Parses "auth required", "login needed", "protected", "member only", "requires login", "auth"
 */
export function extractEnglishAuth(val: any): string | undefined {
  if (typeof val !== "string") return undefined;
  const s = val.trim().toLowerCase();
  if (isAuthValue(s)) return "required";
  if (/\b(?:auth\s*required|login\s*required|login\s*needed|protected|member\s*only|requires?\s*login|requires?\s*auth)\b/i.test(s)) {
    return "required";
  }
  return undefined;
}

/**
 * Natural English Size Extractor:
 * Parses "size 10px 2px", "width 300px", "padding 12px 24px", "small", "large", "extra large"
 */
export function extractEnglishSize(val: any): string | undefined {
  if (typeof val !== "string") return undefined;
  const s = val.trim();
  if (isBoxSizeValue(s)) return s;
  const m = s.match(/\b(?:size|padding|width|height|box)\s+([0-9a-zA-Z%.\s]+)/i);
  if (m && isBoxSizeValue(m[1].trim())) return m[1].trim();
  if (/\b(?:small|sm)\b/i.test(s)) return "sm";
  if (/\b(?:large|lg)\b/i.test(s)) return "lg";
  if (/\b(?:extra\s+large|2xl|xl)\b/i.test(s)) return "xl";
  return undefined;
}

/**
 * Natural English Alignment Extractor:
 * Parses "centered", "aligned center", "align right", "center", "left", "right"
 */
export function extractEnglishAlign(val: any): "left" | "center" | "right" | "justify" | undefined {
  if (typeof val !== "string") return undefined;
  const s = val.trim().toLowerCase();
  if (s === "center" || s === "left" || s === "right" || s === "justify") return s;
  if (/\b(?:centered|aligned?\s+center|align\s+center)\b/i.test(s)) return "center";
  if (/\b(?:aligned?\s+right|align\s+right)\b/i.test(s)) return "right";
  if (/\b(?:aligned?\s+left|align\s+left)\b/i.test(s)) return "left";
  return undefined;
}

/**
 * Natural English Heading Level Extractor:
 * Parses "level 1", "heading 2", "h1", "h3", 1, 2
 */
export function extractEnglishLevel(val: any): 1 | 2 | 3 | 4 | 5 | 6 | undefined {
  if (val === undefined || val === null) return undefined;
  if (typeof val === "number" && val >= 1 && val <= 6) return val as any;
  const s = String(val).trim().toLowerCase();
  if (/^[1-6]$/.test(s)) return parseInt(s, 10) as any;
  const m = s.match(/\b(?:level\s+([1-6])|heading\s+([1-6])|h([1-6]))\b/i);
  if (m) {
    const num = parseInt(m[1] || m[2] || m[3], 10);
    if (num >= 1 && num <= 6) return num as any;
  }
  return undefined;
}

/**
 * Natural English External Link Target Extractor:
 * Parses "new tab", "open in new tab", "external", "blank"
 */
export function extractEnglishExternal(val: any): boolean {
  if (typeof val === "boolean") return val;
  if (typeof val !== "string") return false;
  return /\b(?:new\s+tab|external|blank|open\s+in\s+new\s+tab)\b/i.test(val);
}

/**
 * Natural English Input Type Extractor:
 * Parses "type email", "as password", "email", "password", "number", "search"
 */
export function extractEnglishInputType(val: any): string | undefined {
  if (typeof val !== "string") return undefined;
  const s = val.trim().toLowerCase();
  const known = ["text", "password", "email", "number", "search", "tel", "url", "date"];
  if (known.includes(s)) return s;
  const m = s.match(/\b(?:type|as)\s+(text|email|password|number|search|tel|url|date)\b/i);
  if (m) return m[1].toLowerCase();
  return undefined;
}

/**
 * Attaches chainable helper methods (.red(), .link(), etc.) to a ReactElement
 * while preserving all native React element properties and symbols so it renders natively in JSX.
 */
export function createChainableProxy<C extends object>(
  element: ReactElement,
  chainMethods: C
): ReactElement & C {
  const clone = { ...element };
  for (const sym of Object.getOwnPropertySymbols(element)) {
    (clone as any)[sym] = (element as any)[sym];
  }
  Object.assign(clone, chainMethods);
  return clone as ReactElement & C;
}

// ============================================================================
// 1. BUTTON SHORTHAND
// ============================================================================
export interface ButtonShorthandConfig {
  className?: string;
  label?: string;
  boxSize?: string;
  id?: string;
  auth?: string;
  pathDirection?: string;
  color?: string;
  position?: string;
  pointer?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface ButtonChainable {
  red(): ReactElement & ButtonChainable;
  blue(): ReactElement & ButtonChainable;
  green(): ReactElement & ButtonChainable;
  amber(): ReactElement & ButtonChainable;
  yellow(): ReactElement & ButtonChainable;
  purple(): ReactElement & ButtonChainable;
  pink(): ReactElement & ButtonChainable;
  cyan(): ReactElement & ButtonChainable;
  dark(): ReactElement & ButtonChainable;
  white(): ReactElement & ButtonChainable;
  outline(): ReactElement & ButtonChainable;
  gradient(): ReactElement & ButtonChainable;
  color(c: string): ReactElement & ButtonChainable;

  link(path: string): ReactElement & ButtonChainable;
  to(path: string): ReactElement & ButtonChainable;
  back(): ReactElement & ButtonChainable;
  forward(): ReactElement & ButtonChainable;
  onClick(handler: (e: React.MouseEvent<HTMLButtonElement>) => void): ReactElement & ButtonChainable;

  auth(role?: string): ReactElement & ButtonChainable;
  loginRequired(): ReactElement & ButtonChainable;

  size(s: string): ReactElement & ButtonChainable;
  small(): ReactElement & ButtonChainable;
  large(): ReactElement & ButtonChainable;
  fullWidth(): ReactElement & ButtonChainable;
  position(pos: string): ReactElement & ButtonChainable;
  pointer(cursor: string): ReactElement & ButtonChainable;
  id(idStr: string): ReactElement & ButtonChainable;
  className(cls: string): ReactElement & ButtonChainable;
}

export function attachButtonChaining(
  element: ReactElement,
  config: ButtonShorthandConfig
): ReactElement & ButtonChainable {
  const update = (patch: Partial<ButtonShorthandConfig>) =>
    createButtonFromShorthand({ ...config, ...patch });

  return createChainableProxy(element, {
    red: () => update({ color: "red" }),
    blue: () => update({ color: "blue" }),
    green: () => update({ color: "green" }),
    amber: () => update({ color: "amber" }),
    yellow: () => update({ color: "yellow" }),
    purple: () => update({ color: "purple" }),
    pink: () => update({ color: "pink" }),
    cyan: () => update({ color: "cyan" }),
    dark: () => update({ color: "dark" }),
    white: () => update({ color: "white" }),
    outline: () => update({ color: "outline" }),
    gradient: () => update({ color: "gradient" }),
    color: (c: string) => update({ color: c }),

    link: (path: string) => update({ pathDirection: path }),
    to: (path: string) => update({ pathDirection: path }),
    back: () => update({ pathDirection: "back" }),
    forward: () => update({ pathDirection: "forward" }),
    onClick: (fn: any) => update({ onClick: fn }),

    auth: (role: string = "required") => update({ auth: role }),
    loginRequired: () => update({ auth: "required" }),

    size: (s: string) => update({ boxSize: s }),
    small: () => update({ boxSize: "6px 14px" }),
    large: () => update({ boxSize: "14px 28px" }),
    fullWidth: () => update({ boxSize: "100%" }),
    position: (pos: string) => update({ position: pos }),
    pointer: (ptr: string) => update({ pointer: ptr }),
    id: (idStr: string) => update({ id: idStr }),
    className: (cls: string) => update({ className: cls }),
  });
}

export function parseButtonShorthand(args: any[]): ButtonShorthandConfig {
  if (Array.isArray(args[0]) && (args[0] as any).raw) {
    return parseButtonShorthandString(String(args[0][0]));
  }
  if (args.length === 1 && typeof args[0] === "string" && args[0].includes(",")) {
    return parseButtonShorthandString(args[0]);
  }
  if (args.length === 2 && typeof args[0] === "string" && typeof args[1] === "object" && args[1] !== null) {
    const opts = args[1];
    return {
      label: args[0].replace(/[_-]+/g, " "),
      className: opts.className || args[0],
      pathDirection: opts.to || opts.path || opts.href,
      color: opts.color,
      boxSize: opts.size || opts.boxSize,
      id: opts.id,
      auth: opts.auth ? "required" : undefined,
      position: opts.position || "relative",
      pointer: opts.pointer || "pointer",
      onClick: opts.onClick,
    };
  }

  // 1. Check if user passed strict 8 positional slots:
  if (args.length >= 8) {
    return buildButtonConfigFrom8Slots(
      args[0],
      args[1],
      args[2],
      args[3],
      args[4],
      args[5],
      args[6],
      args[7]
    );
  }

  // 2. SMART AUTO-DETECTION & NATURAL ENGLISH: Any order, zero empty quotes needed!
  const rawFirst = args[0] !== undefined ? String(args[0]).trim() : "Button";
  const label = rawFirst.replace(/[_-]+/g, " ") || "Button";
  const className = rawFirst;

  let pathDirection: string | undefined;
  let color: string | undefined;
  let boxSize: string | undefined;
  let auth: string | undefined;
  let position = "relative";
  let pointer = "pointer";
  let id: string | undefined;
  let onClick: ((e: React.MouseEvent<HTMLButtonElement>) => void) | undefined;

  for (let i = 1; i < args.length; i++) {
    const arg = args[i];
    if (arg === undefined || arg === null || arg === "") continue;

    const pathVal = extractEnglishPath(arg);
    const colorVal = extractEnglishColor(arg);
    const authVal = extractEnglishAuth(arg);
    const sizeVal = extractEnglishSize(arg);

    if (typeof arg === "function") {
      onClick = arg;
    } else if (pathVal && !pathDirection) {
      pathDirection = pathVal;
    } else if (colorVal && !color) {
      color = colorVal;
    } else if (sizeVal && !boxSize) {
      boxSize = sizeVal;
    } else if (authVal && !auth) {
      auth = authVal;
    } else if (isPositionValue(arg) && position === "relative") {
      position = String(arg).trim();
    } else if (isPointerValue(arg) && pointer === "pointer") {
      pointer = String(arg).trim();
    } else if (!id && typeof arg === "string" && arg.toLowerCase() !== "none" && arg.toLowerCase() !== "id") {
      id = arg.replace(/^#/, "").trim();
    }
  }

  return {
    label,
    className,
    boxSize,
    id,
    auth,
    pathDirection,
    color,
    position,
    pointer,
    onClick,
  };
}

function parseButtonShorthandString(str: string): ButtonShorthandConfig {
  let clean = str.trim();
  if (clean.startsWith("Button")) clean = clean.replace(/^Button\s*=\s*/, "");
  if (clean.endsWith(".")) clean = clean.slice(0, -1).trim();

  const parts = clean
    .split(/,\s*(?=(?:[^"]*"[^"]*")*[^"]*$)/)
    .map((p) => p.trim().replace(/^["']|["']$/g, ""));

  return parseButtonShorthand(parts);
}

function buildButtonConfigFrom8Slots(
  slot1_class?: string,
  slot2_boxSize?: string,
  slot3_id?: string,
  slot4_auth?: string,
  slot5_pathDirection?: string,
  slot6_color?: string,
  slot7_position?: string,
  slot8_pointer?: string
): ButtonShorthandConfig {
  const rawClass = slot1_class ? String(slot1_class).trim() : "";
  let label = "Button";
  let className = "cr-button-custom";

  if (rawClass && rawClass.toLowerCase() !== "class") {
    label = rawClass.replace(/[_-]+/g, " ");
    className = rawClass;
  }

  const rawSize = slot2_boxSize ? String(slot2_boxSize).trim() : "";
  let boxSize: string | undefined;
  if (rawSize && rawSize.toLowerCase() !== "box size" && rawSize !== "none") {
    boxSize = rawSize;
  }

  const rawId = slot3_id ? String(slot3_id).trim() : "";
  let id: string | undefined;
  if (rawId && rawId.toLowerCase() !== "id" && rawId !== "none") {
    id = rawId;
  }

  const rawAuth = slot4_auth ? String(slot4_auth).trim() : "";
  let auth: string | undefined;
  if (rawAuth) {
    const a = rawAuth.toLowerCase();
    if (a === "auth" || a === "required" || a === "user" || a === "admin") {
      auth = rawAuth;
    }
  }

  const rawPath = slot5_pathDirection ? String(slot5_pathDirection).trim() : "";
  let pathDirection: string | undefined;
  if (rawPath && rawPath.toLowerCase() !== "path_direction" && rawPath !== "none") {
    pathDirection = rawPath;
  }

  const rawColor = slot6_color ? String(slot6_color).trim() : "";
  let color: string | undefined;
  if (rawColor && rawColor.toLowerCase() !== "color" && rawColor !== "none") {
    color = rawColor;
  }

  const rawPos = slot7_position ? String(slot7_position).trim() : "";
  let position = "relative";
  if (rawPos && rawPos.toLowerCase() !== "position" && rawPos !== "none") {
    position = rawPos;
  }

  const rawPtr = slot8_pointer ? String(slot8_pointer).trim() : "";
  let pointer = "pointer";
  if (rawPtr && rawPtr.toLowerCase() !== "pointer" && rawPtr !== "none") {
    pointer = rawPtr;
  }

  return {
    className,
    label,
    boxSize,
    id,
    auth,
    pathDirection,
    color,
    position,
    pointer,
  };
}

export function createButtonFromShorthand(config: ButtonShorthandConfig): ReactElement & ButtonChainable {
  const {
    className,
    label = "Button",
    boxSize,
    id,
    auth,
    pathDirection,
    color,
    position = "relative",
    pointer = "pointer",
    onClick,
  } = config;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (auth) {
      const storedUser = typeof window !== "undefined" ? localStorage.getItem("cr-auth-user") : null;
      if (!storedUser) {
        alert(`Authentication Required: You must be logged in to click "${label}".`);
        return;
      }
    }

    onClick?.(e);

    if (pathDirection) {
      if (pathDirection.startsWith("http://") || pathDirection.startsWith("https://")) {
        window.open(pathDirection, "_blank");
      } else if (pathDirection === "back") {
        navigation.back();
      } else if (pathDirection === "forward") {
        navigation.forward();
      } else {
        navigation.navigate(pathDirection);
      }
    }
  };

  const styles: React.CSSProperties = {
    cursor: (pointer as any) || "pointer",
    position: (position as any) || "relative",
  };

  if (boxSize) {
    if (boxSize.includes("px") || boxSize.includes("rem") || boxSize.includes("%") || boxSize.includes(" ")) {
      styles.padding = boxSize;
    }
  }

  if (color) {
    const c = color.toLowerCase();
    if (c === "red" || c === "danger") {
      styles.background = "linear-gradient(135deg, #f43f5e, #e11d48)";
      styles.color = "#ffffff";
      styles.borderColor = "transparent";
    } else if (c === "blue" || c === "primary" || c === "indigo") {
      styles.background = "linear-gradient(135deg, #6366f1, #4f46e5)";
      styles.color = "#ffffff";
      styles.borderColor = "transparent";
    } else if (c === "green" || c === "success") {
      styles.background = "linear-gradient(135deg, #10b981, #059669)";
      styles.color = "#ffffff";
      styles.borderColor = "transparent";
    } else if (c === "amber" || c === "warning" || c === "orange") {
      styles.background = "linear-gradient(135deg, #f59e0b, #d97706)";
      styles.color = "#ffffff";
      styles.borderColor = "transparent";
    } else if (c === "cyan" || c === "secondary") {
      styles.background = "linear-gradient(135deg, #0ea5e9, #0284c7)";
      styles.color = "#ffffff";
      styles.borderColor = "transparent";
    } else if (c === "outline") {
      styles.background = "transparent";
      styles.color = "var(--cr-text-primary)";
      styles.border = "1px solid var(--cr-border-strong)";
    } else {
      styles.background = color;
      styles.color = "#ffffff";
    }
  }

  const classes = ["cr-button", className].filter(Boolean).join(" ");

  const element = (
    <button
      key={id || label}
      id={id}
      type="button"
      className={classes}
      style={styles}
      onClick={handleClick}
    >
      {label}
    </button>
  );

  return attachButtonChaining(element, config);
}

export function createButtonDOMElement(config: ButtonShorthandConfig): HTMLButtonElement {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = `cr-button ${config.className || ""}`;
  btn.textContent = config.label || "Button";

  if (config.id) btn.id = config.id;
  if (config.boxSize) btn.style.padding = config.boxSize;
  if (config.position) btn.style.position = config.position;
  if (config.pointer) btn.style.cursor = config.pointer;

  if (config.color) {
    if (config.color === "red") {
      btn.style.background = "#e11d48";
      btn.style.color = "#ffffff";
    } else {
      btn.style.background = config.color;
      btn.style.color = "#ffffff";
    }
  }

  btn.onclick = () => {
    if (config.pathDirection) {
      window.location.href = config.pathDirection;
    }
  };

  return btn;
}

// ============================================================================
// 2. INPUT SHORTHAND
// ============================================================================
export interface InputShorthandConfig {
  placeholder?: string;
  boxSize?: string;
  id?: string;
  type?: string;
  label?: string;
  color?: string;
  position?: string;
  pointer?: string;
}

export interface InputChainable {
  email(): ReactElement & InputChainable;
  password(): ReactElement & InputChainable;
  number(): ReactElement & InputChainable;
  search(): ReactElement & InputChainable;
  text(): ReactElement & InputChainable;
  type(t: string): ReactElement & InputChainable;

  width(w: string): ReactElement & InputChainable;
  size(s: string): ReactElement & InputChainable;
  label(lbl: string): ReactElement & InputChainable;
  id(idStr: string): ReactElement & InputChainable;
}

export function attachInputChaining(
  element: ReactElement,
  config: InputShorthandConfig
): ReactElement & InputChainable {
  const update = (patch: Partial<InputShorthandConfig>) =>
    createInputFromShorthand({ ...config, ...patch });

  return createChainableProxy(element, {
    email: () => update({ type: "email" }),
    password: () => update({ type: "password" }),
    number: () => update({ type: "number" }),
    search: () => update({ type: "search" }),
    text: () => update({ type: "text" }),
    type: (t: string) => update({ type: t }),

    width: (w: string) => update({ boxSize: w }),
    size: (s: string) => update({ boxSize: s }),
    label: (lbl: string) => update({ label: lbl }),
    id: (idStr: string) => update({ id: idStr }),
  });
}

export function parseInputShorthand(args: any[]): InputShorthandConfig {
  if (Array.isArray(args[0]) && (args[0] as any).raw) {
    return parseInputShorthandString(String(args[0][0]));
  }
  if (args.length === 1 && typeof args[0] === "string" && args[0].includes(",")) {
    return parseInputShorthandString(args[0]);
  }

  const INPUT_TYPES = new Set(["text", "password", "email", "number", "search", "tel", "url", "date"]);

  let placeholder = "Enter value...";
  let boxSize: string | undefined;
  let id: string | undefined;
  let type = "text";
  let label: string | undefined;
  let color: string | undefined;
  let position = "relative";
  let pointer = "text";

  if (args.length > 0 && args[0] !== undefined) {
    placeholder = String(args[0]).replace(/[_-]+/g, " ");
  }

  for (let i = 1; i < args.length; i++) {
    const arg = args[i];
    if (arg === undefined || arg === null || arg === "") continue;

    const typeVal = extractEnglishInputType(arg);
    const sizeVal = extractEnglishSize(arg);
    const colorVal = extractEnglishColor(arg);
    const str = String(arg).trim();

    if (typeVal && !INPUT_TYPES.has(type)) {
      type = typeVal;
    } else if (sizeVal && !boxSize) {
      boxSize = sizeVal;
    } else if (colorVal && !color) {
      color = colorVal;
    } else if (str.toLowerCase().startsWith("label ") || str.toLowerCase().startsWith("labeled ")) {
      label = str.replace(/^(?:labeled|label)\s+['"]?|['"]?$/gi, "");
    } else if (isPositionValue(arg) && position === "relative") {
      position = str;
    } else if (isPointerValue(arg) && pointer === "text") {
      pointer = str;
    } else if (!id && (str.startsWith("#") || str.toLowerCase().includes("id"))) {
      id = str.replace(/^#/, "").trim();
    } else if (!label && str.toLowerCase() !== "none") {
      label = str.replace(/[_-]+/g, " ").trim();
    }
  }

  return {
    placeholder,
    boxSize,
    id,
    type,
    label,
    color,
    position,
    pointer,
  };
}

function parseInputShorthandString(str: string): InputShorthandConfig {
  let clean = str.trim();
  if (clean.startsWith("Input")) clean = clean.replace(/^Input\s*=\s*/, "");
  if (clean.endsWith(".")) clean = clean.slice(0, -1).trim();

  const parts = clean
    .split(/,\s*(?=(?:[^"]*"[^"]*")*[^"]*$)/)
    .map((p) => p.trim().replace(/^["']|["']$/g, ""));

  return parseInputShorthand(parts);
}

export function createInputFromShorthand(config: InputShorthandConfig): ReactElement & InputChainable {
  const { placeholder, boxSize, id, type = "text", label, position = "relative", pointer = "text" } = config;

  const wrapperStyle: React.CSSProperties = {
    position: position as any,
    width: boxSize && (boxSize.includes("px") || boxSize.includes("%")) ? boxSize : "100%",
    maxWidth: "400px",
  };

  const element = (
    <div key={id || placeholder} className="cr-form-field" style={wrapperStyle}>
      {label && <label className="cr-form-label">{label}</label>}
      <div className="cr-input-wrapper cr-input-wrapper--md">
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          className="cr-input"
          style={{ cursor: pointer as any }}
        />
      </div>
    </div>
  );

  return attachInputChaining(element, config);
}

// ============================================================================
// 3. HEADING SHORTHAND
// ============================================================================
export interface HeadingShorthandConfig {
  text: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  size?: string;
  id?: string;
  color?: string;
  align?: string;
  position?: string;
}

export interface HeadingChainable {
  level(lvl: 1 | 2 | 3 | 4 | 5 | 6): ReactElement & HeadingChainable;
  h1(): ReactElement & HeadingChainable;
  h2(): ReactElement & HeadingChainable;
  h3(): ReactElement & HeadingChainable;
  h4(): ReactElement & HeadingChainable;
  h5(): ReactElement & HeadingChainable;
  h6(): ReactElement & HeadingChainable;

  center(): ReactElement & HeadingChainable;
  left(): ReactElement & HeadingChainable;
  right(): ReactElement & HeadingChainable;

  gradient(): ReactElement & HeadingChainable;
  color(c: string): ReactElement & HeadingChainable;
  red(): ReactElement & HeadingChainable;
  blue(): ReactElement & HeadingChainable;
  green(): ReactElement & HeadingChainable;

  size(s: string): ReactElement & HeadingChainable;
  small(): ReactElement & HeadingChainable;
  large(): ReactElement & HeadingChainable;
  extraLarge(): ReactElement & HeadingChainable;

  id(idStr: string): ReactElement & HeadingChainable;
}

export function attachHeadingChaining(
  element: ReactElement,
  config: HeadingShorthandConfig
): ReactElement & HeadingChainable {
  const update = (patch: Partial<HeadingShorthandConfig>) =>
    createHeadingFromShorthand({ ...config, ...patch });

  return createChainableProxy(element, {
    level: (lvl: 1 | 2 | 3 | 4 | 5 | 6) => update({ level: lvl }),
    h1: () => update({ level: 1 }),
    h2: () => update({ level: 2 }),
    h3: () => update({ level: 3 }),
    h4: () => update({ level: 4 }),
    h5: () => update({ level: 5 }),
    h6: () => update({ level: 6 }),

    center: () => update({ align: "center" }),
    left: () => update({ align: "left" }),
    right: () => update({ align: "right" }),

    gradient: () => update({ color: "gradient" }),
    color: (c: string) => update({ color: c }),
    red: () => update({ color: "#e11d48" }),
    blue: () => update({ color: "#6366f1" }),
    green: () => update({ color: "#10b981" }),

    size: (s: string) => update({ size: s }),
    small: () => update({ size: "1.25rem" }),
    large: () => update({ size: "2rem" }),
    extraLarge: () => update({ size: "2.5rem" }),

    id: (idStr: string) => update({ id: idStr }),
  });
}

export function parseHeadingShorthand(args: any[]): HeadingShorthandConfig {
  if (Array.isArray(args[0]) && (args[0] as any).raw) {
    return parseHeadingShorthandString(String(args[0][0]));
  }
  if (args.length === 1 && typeof args[0] === "string" && args[0].includes(",")) {
    return parseHeadingShorthandString(args[0]);
  }

  let text = "Heading";
  let level: 1 | 2 | 3 | 4 | 5 | 6 = 2;
  let size: string | undefined;
  let id: string | undefined;
  let color: string | undefined;
  let align = "left";
  let position = "relative";

  if (args.length > 0 && args[0] !== undefined) {
    text = String(args[0]).replace(/[_-]+/g, " ");
  }

  for (let i = 1; i < args.length; i++) {
    const arg = args[i];
    if (arg === undefined || arg === null || arg === "") continue;

    const lvl = extractEnglishLevel(arg);
    const alignVal = extractEnglishAlign(arg);
    const colorVal = extractEnglishColor(arg);
    const sizeVal = extractEnglishSize(arg);
    const s = String(arg).trim().toLowerCase();

    if (lvl) {
      level = lvl;
    } else if (alignVal) {
      align = alignVal;
    } else if (colorVal) {
      color = colorVal;
    } else if (sizeVal || /^(xs|sm|md|lg|xl|2xl|3xl|4xl)$/.test(s)) {
      size = sizeVal || String(arg).trim();
    } else if (isPositionValue(arg)) {
      position = String(arg).trim();
    } else if (!id && s !== "id" && s !== "none") {
      id = String(arg).replace(/^#/, "").trim();
    }
  }

  return {
    text,
    level,
    size,
    id,
    color,
    align,
    position,
  };
}

function parseHeadingShorthandString(str: string): HeadingShorthandConfig {
  let clean = str.trim();
  if (clean.startsWith("Heading")) clean = clean.replace(/^Heading\s*=\s*/, "");
  if (clean.endsWith(".")) clean = clean.slice(0, -1).trim();

  const parts = clean
    .split(/,\s*(?=(?:[^"]*"[^"]*")*[^"]*$)/)
    .map((p) => p.trim().replace(/^["']|["']$/g, ""));

  return parseHeadingShorthand(parts);
}

export function createHeadingFromShorthand(config: HeadingShorthandConfig): ReactElement & HeadingChainable {
  const { text, level = 2, size, id, color, align = "left", position = "relative" } = config;
  const Component = `h${level}` as const;
  const isGradient = color === "gradient";

  const styles: React.CSSProperties = {
    textAlign: align as any,
    position: position as any,
    margin: "0.5rem 0",
    ...(size ? { fontSize: size } : {}),
  };

  if (color && !isGradient) {
    styles.color = color;
  }

  const classes = [
    "cr-heading",
    `cr-heading--${level === 1 ? "2xl" : level === 2 ? "xl" : "lg"}`,
    isGradient && "cr-heading--gradient",
  ]
    .filter(Boolean)
    .join(" ");

  const element = (
    <Component key={id || text} id={id} className={classes} style={styles}>
      {text}
    </Component>
  );

  return attachHeadingChaining(element, config);
}

// ============================================================================
// 4. TEXT SHORTHAND
// ============================================================================
export interface TextShorthandConfig {
  content: string;
  size?: string;
  id?: string;
  color?: string;
  align?: string;
  position?: string;
}

export interface TextChainable {
  center(): ReactElement & TextChainable;
  left(): ReactElement & TextChainable;
  right(): ReactElement & TextChainable;

  muted(): ReactElement & TextChainable;
  secondary(): ReactElement & TextChainable;
  primary(): ReactElement & TextChainable;
  brand(): ReactElement & TextChainable;
  color(c: string): ReactElement & TextChainable;

  small(): ReactElement & TextChainable;
  large(): ReactElement & TextChainable;
  size(s: string): ReactElement & TextChainable;

  bold(): ReactElement & TextChainable;
  medium(): ReactElement & TextChainable;

  id(idStr: string): ReactElement & TextChainable;
}

export function attachTextChaining(
  element: ReactElement,
  config: TextShorthandConfig
): ReactElement & TextChainable {
  const update = (patch: Partial<TextShorthandConfig>) =>
    createTextFromShorthand({ ...config, ...patch });

  return createChainableProxy(element, {
    center: () => update({ align: "center" }),
    left: () => update({ align: "left" }),
    right: () => update({ align: "right" }),

    muted: () => update({ color: "muted" }),
    secondary: () => update({ color: "secondary" }),
    primary: () => update({ color: "primary" }),
    brand: () => update({ color: "brand" }),
    color: (c: string) => update({ color: c }),

    small: () => update({ size: "sm" }),
    large: () => update({ size: "lg" }),
    size: (s: string) => update({ size: s }),

    bold: () => update({ size: config.size }),
    medium: () => update({ size: config.size }),

    id: (idStr: string) => update({ id: idStr }),
  });
}

export function parseTextShorthand(args: any[]): TextShorthandConfig {
  if (Array.isArray(args[0]) && (args[0] as any).raw) {
    return parseTextShorthandString(String(args[0][0]));
  }
  if (args.length === 1 && typeof args[0] === "string" && args[0].includes(",")) {
    return parseTextShorthandString(args[0]);
  }

  let content = "Text";
  let size = "md";
  let id: string | undefined;
  let color = "primary";
  let align = "left";
  let position = "relative";

  if (args.length > 0 && args[0] !== undefined) {
    content = String(args[0]);
  }

  for (let i = 1; i < args.length; i++) {
    const arg = args[i];
    if (arg === undefined || arg === null || arg === "") continue;

    const alignVal = extractEnglishAlign(arg);
    const colorVal = extractEnglishColor(arg);
    const sizeVal = extractEnglishSize(arg);
    const s = String(arg).toLowerCase().trim();

    if (alignVal) {
      align = alignVal;
    } else if (colorVal || s === "muted" || s === "secondary" || s === "brand" || s === "primary") {
      color = colorVal || String(arg).trim();
    } else if (sizeVal || /^(xs|sm|md|lg|xl)$/.test(s)) {
      size = sizeVal || String(arg).trim();
    } else if (isPositionValue(arg)) {
      position = String(arg).trim();
    } else if (!id && s !== "id" && s !== "none") {
      id = String(arg).replace(/^#/, "").trim();
    }
  }

  return {
    content,
    size,
    id,
    color,
    align,
    position,
  };
}

function parseTextShorthandString(str: string): TextShorthandConfig {
  let clean = str.trim();
  if (clean.startsWith("Text")) clean = clean.replace(/^Text\s*=\s*/, "");
  if (clean.endsWith(".")) clean = clean.slice(0, -1).trim();

  const parts = clean
    .split(/,\s*(?=(?:[^"]*"[^"]*")*[^"]*$)/)
    .map((p) => p.trim().replace(/^["']|["']$/g, ""));

  return parseTextShorthand(parts);
}

export function createTextFromShorthand(config: TextShorthandConfig): ReactElement & TextChainable {
  const { content, size = "md", id, color = "primary", align = "left", position = "relative" } = config;

  const styles: React.CSSProperties = {
    textAlign: align as any,
    position: position as any,
    margin: "0.25rem 0",
    ...(size.includes("px") || size.includes("rem") ? { fontSize: size } : {}),
  };

  const classes = [
    "cr-text",
    !size.includes("px") && !size.includes("rem") && `cr-text--${size}`,
    `cr-text--color-${color}`,
  ]
    .filter(Boolean)
    .join(" ");

  const element = (
    <p key={id || content} id={id} className={classes} style={styles}>
      {content}
    </p>
  );

  return attachTextChaining(element, config);
}

// ============================================================================
// 5. CARD SHORTHAND
// ============================================================================
export interface CardShorthandConfig {
  content?: ReactNode;
  boxSize?: string;
  id?: string;
  variant?: "glass" | "outline" | "elevated" | "subtle";
  color?: string;
  position?: string;
  pointer?: string;
}

export interface CardChainable {
  glass(): ReactElement & CardChainable;
  elevated(): ReactElement & CardChainable;
  outline(): ReactElement & CardChainable;
  subtle(): ReactElement & CardChainable;

  width(w: string): ReactElement & CardChainable;
  size(s: string): ReactElement & CardChainable;
  padding(p: string): ReactElement & CardChainable;

  id(idStr: string): ReactElement & CardChainable;
}

export function attachCardChaining(
  element: ReactElement,
  config: CardShorthandConfig
): ReactElement & CardChainable {
  const update = (patch: Partial<CardShorthandConfig>) =>
    createCardFromShorthand({ ...config, ...patch });

  return createChainableProxy(element, {
    glass: () => update({ variant: "glass" }),
    elevated: () => update({ variant: "elevated" }),
    outline: () => update({ variant: "outline" }),
    subtle: () => update({ variant: "subtle" }),

    width: (w: string) => update({ boxSize: w }),
    size: (s: string) => update({ boxSize: s }),
    padding: (p: string) => update({ boxSize: p }),

    id: (idStr: string) => update({ id: idStr }),
  });
}

export function parseCardShorthand(args: any[]): CardShorthandConfig {
  let content: ReactNode = "Card";
  let boxSize: string | undefined;
  let id: string | undefined;
  let variant: "glass" | "outline" | "elevated" | "subtle" = "glass";
  let color: string | undefined;
  let position = "relative";
  let pointer = "default";

  if (args.length > 0) {
    if (typeof args[0] === "string") {
      content = <p>{args[0].replace(/[_-]+/g, " ")}</p>;
    } else {
      content = args[0];
    }
  }

  const VARIANTS = new Set(["glass", "outline", "elevated", "subtle"]);

  for (let i = 1; i < args.length; i++) {
    const arg = args[i];
    if (arg === undefined || arg === null || arg === "") continue;

    const sizeVal = extractEnglishSize(arg);
    const colorVal = extractEnglishColor(arg);
    const s = String(arg).toLowerCase().trim();

    if (VARIANTS.has(s)) {
      variant = s as any;
    } else if (sizeVal) {
      boxSize = sizeVal;
    } else if (colorVal) {
      color = colorVal;
    } else if (isPositionValue(arg)) {
      position = String(arg).trim();
    } else if (isPointerValue(arg)) {
      pointer = String(arg).trim();
    } else if (!id && s !== "id" && s !== "none") {
      id = String(arg).trim();
    }
  }

  return {
    content,
    boxSize,
    id,
    variant,
    color,
    position,
    pointer,
  };
}

export function createCardFromShorthand(config: CardShorthandConfig): ReactElement & CardChainable {
  const { content, boxSize, id, variant = "glass", color, position = "relative", pointer = "default" } = config;

  const styles: React.CSSProperties = {
    position: position as any,
    cursor: pointer as any,
    ...(boxSize ? { width: boxSize } : {}),
    ...(color ? { background: color } : {}),
  };

  const element = (
    <div key={id || Math.random()} id={id} className={`cr-card cr-card--${variant} cr-card--padding-md`} style={styles}>
      {content}
    </div>
  );

  return attachCardChaining(element, config);
}

// ============================================================================
// 6. BADGE SHORTHAND
// ============================================================================
export interface BadgeShorthandConfig {
  label: string;
  size?: string;
  id?: string;
  color?: string;
  position?: string;
}

export interface BadgeChainable {
  red(): ReactElement & BadgeChainable;
  green(): ReactElement & BadgeChainable;
  blue(): ReactElement & BadgeChainable;
  amber(): ReactElement & BadgeChainable;
  purple(): ReactElement & BadgeChainable;
  color(c: string): ReactElement & BadgeChainable;

  small(): ReactElement & BadgeChainable;
  large(): ReactElement & BadgeChainable;
  size(s: string): ReactElement & BadgeChainable;

  id(idStr: string): ReactElement & BadgeChainable;
}

export function attachBadgeChaining(
  element: ReactElement,
  config: BadgeShorthandConfig
): ReactElement & BadgeChainable {
  const update = (patch: Partial<BadgeShorthandConfig>) =>
    createBadgeFromShorthand({ ...config, ...patch });

  return createChainableProxy(element, {
    red: () => update({ color: "danger" }),
    green: () => update({ color: "success" }),
    blue: () => update({ color: "primary" }),
    amber: () => update({ color: "warning" }),
    purple: () => update({ color: "purple" }),
    color: (c: string) => update({ color: c }),

    small: () => update({ size: "sm" }),
    large: () => update({ size: "md" }),
    size: (s: string) => update({ size: s }),

    id: (idStr: string) => update({ id: idStr }),
  });
}

export function parseBadgeShorthand(args: any[]): BadgeShorthandConfig {
  let label = "Badge";
  let size = "sm";
  let id: string | undefined;
  let color = "primary";
  let position = "relative";

  if (args.length > 0 && args[0] !== undefined) {
    label = String(args[0]).replace(/[_-]+/g, " ");
  }

  for (let i = 1; i < args.length; i++) {
    const arg = args[i];
    if (arg === undefined || arg === null || arg === "") continue;

    const colorVal = extractEnglishColor(arg);
    const sizeVal = extractEnglishSize(arg);
    const s = String(arg).toLowerCase().trim();

    if (colorVal || s === "danger" || s === "success" || s === "warning" || s === "info") {
      color = colorVal || String(arg).trim();
    } else if (sizeVal || /^(xs|sm|md|lg)$/.test(s)) {
      size = sizeVal || String(arg).trim();
    } else if (isPositionValue(arg)) {
      position = String(arg).trim();
    } else if (!id && s !== "id" && s !== "none") {
      id = String(arg).trim();
    }
  }

  return {
    label,
    size,
    id,
    color,
    position,
  };
}

export function createBadgeFromShorthand(config: BadgeShorthandConfig): ReactElement & BadgeChainable {
  const { label, size = "sm", id, color = "primary", position = "relative" } = config;

  const element = (
    <span
      key={id || label}
      id={id}
      className={`cr-badge cr-badge--${color} cr-badge--${size} cr-badge--pill`}
      style={{ position: position as any }}
    >
      {label}
    </span>
  );

  return attachBadgeChaining(element, config);
}

// ============================================================================
// 7. LINK SHORTHAND
// ============================================================================
export interface LinkShorthandConfig {
  label: string;
  href: string;
  id?: string;
  color?: string;
  isExternal?: boolean;
  position?: string;
}

export interface LinkChainable {
  to(path: string): ReactElement & LinkChainable;
  link(path: string): ReactElement & LinkChainable;
  external(): ReactElement & LinkChainable;
  newTab(): ReactElement & LinkChainable;
  color(c: string): ReactElement & LinkChainable;
  id(idStr: string): ReactElement & LinkChainable;
}

export function attachLinkChaining(
  element: ReactElement,
  config: LinkShorthandConfig
): ReactElement & LinkChainable {
  const update = (patch: Partial<LinkShorthandConfig>) =>
    createLinkFromShorthand({ ...config, ...patch });

  return createChainableProxy(element, {
    to: (path: string) => update({ href: path }),
    link: (path: string) => update({ href: path }),
    external: () => update({ isExternal: true }),
    newTab: () => update({ isExternal: true }),
    color: (c: string) => update({ color: c }),
    id: (idStr: string) => update({ id: idStr }),
  });
}

export function parseLinkShorthand(args: any[]): LinkShorthandConfig {
  let label = "Link";
  let href = "#";
  let id: string | undefined;
  let color = "brand";
  let isExternal = false;
  let position = "relative";

  if (args.length > 0 && args[0] !== undefined) {
    label = String(args[0]).replace(/[_-]+/g, " ");
  }

  for (let i = 1; i < args.length; i++) {
    const arg = args[i];
    if (arg === undefined || arg === null || arg === "") continue;

    const pathVal = extractEnglishPath(arg);
    const colorVal = extractEnglishColor(arg);
    const isExt = extractEnglishExternal(arg);

    if (typeof arg === "boolean") {
      isExternal = arg;
    } else if (isExt) {
      isExternal = true;
    } else if (pathVal) {
      href = pathVal;
      if (href.startsWith("http://") || href.startsWith("https://")) isExternal = true;
    } else if (colorVal) {
      color = colorVal;
    } else if (isPositionValue(arg)) {
      position = String(arg).trim();
    } else if (!id && String(arg).toLowerCase() !== "id") {
      id = String(arg).trim();
    }
  }

  return {
    label,
    href,
    id,
    color,
    isExternal,
    position,
  };
}

export function createLinkFromShorthand(config: LinkShorthandConfig): ReactElement & LinkChainable {
  const { label, href, id, color = "brand", isExternal = false, position = "relative" } = config;

  const element = (
    <a
      key={id || label}
      id={id}
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={`cr-link cr-link--color-${color}`}
      style={{ position: position as any }}
    >
      {label}
    </a>
  );

  return attachLinkChaining(element, config);
}

// ============================================================================
// 8. IMAGE SHORTHAND
// ============================================================================
export interface ImageShorthandConfig {
  src: string;
  boxSize?: string;
  id?: string;
  alt?: string;
  rounded?: string;
  position?: string;
}

export interface ImageChainable {
  size(w: string, h?: string): ReactElement & ImageChainable;
  circle(): ReactElement & ImageChainable;
  rounded(r?: string): ReactElement & ImageChainable;
  alt(a: string): ReactElement & ImageChainable;
  id(idStr: string): ReactElement & ImageChainable;
}

export function attachImageChaining(
  element: ReactElement,
  config: ImageShorthandConfig
): ReactElement & ImageChainable {
  const update = (patch: Partial<ImageShorthandConfig>) =>
    createImageFromShorthand({ ...config, ...patch });

  return createChainableProxy(element, {
    size: (w: string, h?: string) => update({ boxSize: h ? `${w} ${h}` : w }),
    circle: () => update({ rounded: "full" }),
    rounded: (r: string = "md") => update({ rounded: r }),
    alt: (a: string) => update({ alt: a }),
    id: (idStr: string) => update({ id: idStr }),
  });
}

export function parseImageShorthand(args: any[]): ImageShorthandConfig {
  let src = "";
  let boxSize: string | undefined;
  let id: string | undefined;
  let alt = "Image";
  let rounded = "md";
  let position = "relative";

  if (args.length > 0 && args[0] !== undefined) {
    src = String(args[0]).trim();
  }

  const ROUNDED_OPTIONS = new Set(["none", "sm", "md", "lg", "full", "circle", "rounded"]);

  for (let i = 1; i < args.length; i++) {
    const arg = args[i];
    if (arg === undefined || arg === null || arg === "") continue;

    const sizeVal = extractEnglishSize(arg);
    const s = String(arg).toLowerCase().trim();

    if (sizeVal) {
      boxSize = sizeVal;
    } else if (ROUNDED_OPTIONS.has(s)) {
      rounded = s === "circle" ? "full" : s;
    } else if (isPositionValue(arg)) {
      position = String(arg).trim();
    } else if (!id && (s.startsWith("#") || s.includes("id"))) {
      id = String(arg).replace(/^#/, "").trim();
    } else if (alt === "Image") {
      alt = String(arg).trim();
    }
  }

  return {
    src,
    boxSize,
    id,
    alt,
    rounded,
    position,
  };
}

export function createImageFromShorthand(config: ImageShorthandConfig): ReactElement & ImageChainable {
  const { src, boxSize, id, alt = "Image", rounded = "md", position = "relative" } = config;

  let width: string | undefined;
  let height: string | undefined;

  if (boxSize) {
    const parts = boxSize.trim().split(/\s+/);
    width = parts[0];
    height = parts[1] || parts[0];
  }

  const styles: React.CSSProperties = {
    position: position as any,
    ...(width ? { width } : {}),
    ...(height ? { height } : {}),
    objectFit: "cover",
  };

  const element = (
    <div key={id || src} className={`cr-image-wrapper cr-image--rounded-${rounded}`} style={styles}>
      <img id={id} src={src} alt={alt} className="cr-image" />
    </div>
  );

  return attachImageChaining(element, config);
}

// ============================================================================
// 9. Ultra-Simple Page Container
// ============================================================================
export interface PageOptions {
  title?: string;
  maxWidth?: string;
  gap?: string;
}

export function Page(titleOrOptions: string | PageOptions | ReactNode[], ...elements: ReactNode[]): ReactElement {
  let title: string | undefined;
  let maxWidth = "960px";
  let gap = "1.25rem";
  let children: ReactNode[] = elements;

  if (Array.isArray(titleOrOptions)) {
    children = titleOrOptions;
  } else if (typeof titleOrOptions === "string") {
    title = titleOrOptions;
  } else if (typeof titleOrOptions === "object" && titleOrOptions !== null) {
    title = (titleOrOptions as PageOptions).title;
    if ((titleOrOptions as PageOptions).maxWidth) maxWidth = (titleOrOptions as PageOptions).maxWidth!;
    if ((titleOrOptions as PageOptions).gap) gap = (titleOrOptions as PageOptions).gap!;
  }

  return (
    <div className="cr-simple-page" style={{ padding: "3rem 1.5rem", maxWidth, margin: "0 auto" }}>
      {title && (
        <h1 className="cr-heading cr-heading--2xl cr-heading--gradient" style={{ marginBottom: "1.5rem" }}>
          {title}
        </h1>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap, alignItems: "flex-start" }}>
        {children.map((child, idx) => {
          if (React.isValidElement(child)) {
            return child.key != null ? child : React.cloneElement(child, { key: `cr-page-item-${idx}` });
          }
          return <React.Fragment key={`cr-page-item-${idx}`}>{child}</React.Fragment>;
        })}
      </div>
    </div>
  );
}

export const SimplePage = Page;
