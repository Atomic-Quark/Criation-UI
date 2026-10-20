import React, { type ReactElement, type ReactNode } from "react";
import { navigation } from "../routing/navigation";

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

// Smart Classification Helpers
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

  // 2. SMART AUTO-DETECTION: Any order, zero empty quotes needed!
  // First argument is always the button label / text
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

    if (typeof arg === "function") {
      onClick = arg;
    } else if (isPathValue(arg) && !pathDirection) {
      pathDirection = String(arg).trim();
    } else if (isColorValue(arg) && !color) {
      color = String(arg).trim();
    } else if (isBoxSizeValue(arg) && !boxSize) {
      boxSize = String(arg).trim();
    } else if (isAuthValue(arg) && !auth) {
      auth = String(arg).trim();
    } else if (isPositionValue(arg) && position === "relative") {
      position = String(arg).trim();
    } else if (isPointerValue(arg) && pointer === "pointer") {
      pointer = String(arg).trim();
    } else if (!id && typeof arg === "string" && arg.toLowerCase() !== "none" && arg.toLowerCase() !== "id") {
      id = arg.trim();
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


export function createButtonFromShorthand(config: ButtonShorthandConfig): ReactElement {
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

  return (
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
// Slot 1: placeholder / class (e.g. "Enter your email")
// Slot 2: box size / width (e.g. "300px", "100%", "md")
// Slot 3: ID (e.g. "email_input")
// Slot 4: type (e.g. "text", "email", "password", "number")
// Slot 5: label (e.g. "Email Address")
// Slot 6: color (e.g. "blue", "red")
// Slot 7: position (e.g. "relative")
// Slot 8: pointer (e.g. "text", "pointer")
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
    const s = String(arg).toLowerCase().trim();

    if (INPUT_TYPES.has(s) && type === "text") {
      type = s;
    } else if (isBoxSizeValue(arg) && !boxSize) {
      boxSize = String(arg).trim();
    } else if (isColorValue(arg) && !color) {
      color = String(arg).trim();
    } else if (isPositionValue(arg) && position === "relative") {
      position = String(arg).trim();
    } else if (isPointerValue(arg) && pointer === "text") {
      pointer = String(arg).trim();
    } else if (!id && (s.startsWith("#") || s.includes("id"))) {
      id = String(arg).replace(/^#/, "").trim();
    } else if (!label && s !== "none") {
      label = String(arg).replace(/[_-]+/g, " ").trim();
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

export function createInputFromShorthand(config: InputShorthandConfig): ReactElement {
  const { placeholder, boxSize, id, type = "text", label, position = "relative", pointer = "text" } = config;

  const wrapperStyle: React.CSSProperties = {
    position: position as any,
    width: boxSize && (boxSize.includes("px") || boxSize.includes("%")) ? boxSize : "100%",
    maxWidth: "400px",
  };

  return (
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
}

// ============================================================================
// 3. HEADING SHORTHAND (Smart Type Detection)
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

    if (typeof arg === "number" && arg >= 1 && arg <= 6) {
      level = arg as any;
    } else if (typeof arg === "string") {
      const s = arg.trim().toLowerCase();
      if (/^[1-6]$/.test(s)) {
        level = parseInt(s, 10) as any;
      } else if (/^h[1-6]$/.test(s)) {
        level = parseInt(s[1], 10) as any;
      } else if (s === "center" || s === "left" || s === "right" || s === "justify") {
        align = s;
      } else if (s === "gradient" || isColorValue(arg)) {
        color = arg.trim();
      } else if (isBoxSizeValue(arg) || /^(xs|sm|md|lg|xl|2xl|3xl|4xl)$/.test(s)) {
        size = arg.trim();
      } else if (isPositionValue(arg)) {
        position = arg.trim();
      } else if (!id && s !== "id" && s !== "none") {
        id = arg.replace(/^#/, "").trim();
      }
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

export function createHeadingFromShorthand(config: HeadingShorthandConfig): ReactElement {
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

  return (
    <Component key={id || text} id={id} className={classes} style={styles}>
      {text}
    </Component>
  );
}

// ============================================================================
// 4. TEXT SHORTHAND (Smart Type Detection)
// ============================================================================
export interface TextShorthandConfig {
  content: string;
  size?: string;
  id?: string;
  color?: string;
  align?: string;
  position?: string;
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
    const s = String(arg).toLowerCase().trim();

    if (s === "center" || s === "left" || s === "right") {
      align = s;
    } else if (isColorValue(arg) || s === "muted" || s === "secondary" || s === "brand" || s === "primary") {
      color = String(arg).trim();
    } else if (isBoxSizeValue(arg) || /^(xs|sm|md|lg|xl)$/.test(s)) {
      size = String(arg).trim();
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

export function createTextFromShorthand(config: TextShorthandConfig): ReactElement {
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

  return (
    <p key={id || content} id={id} className={classes} style={styles}>
      {content}
    </p>
  );
}

// ============================================================================
// 5. CARD SHORTHAND (Smart Type Detection)
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
    const s = String(arg).toLowerCase().trim();

    if (VARIANTS.has(s)) {
      variant = s as any;
    } else if (isBoxSizeValue(arg) && !boxSize) {
      boxSize = String(arg).trim();
    } else if (isColorValue(arg) && !color) {
      color = String(arg).trim();
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

export function createCardFromShorthand(config: CardShorthandConfig): ReactElement {
  const { content, boxSize, id, variant = "glass", color, position = "relative", pointer = "default" } = config;

  const styles: React.CSSProperties = {
    position: position as any,
    cursor: pointer as any,
    ...(boxSize ? { width: boxSize } : {}),
    ...(color ? { background: color } : {}),
  };

  return (
    <div key={id || Math.random()} id={id} className={`cr-card cr-card--${variant} cr-card--padding-md`} style={styles}>
      {content}
    </div>
  );
}

// ============================================================================
// 6. BADGE SHORTHAND (Smart Type Detection)
// ============================================================================
export interface BadgeShorthandConfig {
  label: string;
  size?: string;
  id?: string;
  color?: string;
  position?: string;
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
    const s = String(arg).toLowerCase().trim();

    if (isColorValue(arg) || s === "danger" || s === "success" || s === "warning" || s === "info") {
      color = String(arg).trim();
    } else if (/^(xs|sm|md|lg)$/.test(s) || isBoxSizeValue(arg)) {
      size = String(arg).trim();
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

export function createBadgeFromShorthand(config: BadgeShorthandConfig): ReactElement {
  const { label, size = "sm", id, color = "primary", position = "relative" } = config;

  return (
    <span
      key={id || label}
      id={id}
      className={`cr-badge cr-badge--${color} cr-badge--${size} cr-badge--pill`}
      style={{ position: position as any }}
    >
      {label}
    </span>
  );
}

// ============================================================================
// 7. LINK SHORTHAND (Smart Type Detection)
// ============================================================================
export interface LinkShorthandConfig {
  label: string;
  href: string;
  id?: string;
  color?: string;
  isExternal?: boolean;
  position?: string;
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

    if (typeof arg === "boolean") {
      isExternal = arg;
    } else if (isPathValue(arg)) {
      href = String(arg).trim();
      if (href.startsWith("http://") || href.startsWith("https://")) isExternal = true;
    } else if (String(arg).toLowerCase() === "external" || String(arg).toLowerCase() === "blank") {
      isExternal = true;
    } else if (isColorValue(arg)) {
      color = String(arg).trim();
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

export function createLinkFromShorthand(config: LinkShorthandConfig): ReactElement {
  const { label, href, id, color = "brand", isExternal = false, position = "relative" } = config;

  return (
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
}

// ============================================================================
// 8. IMAGE SHORTHAND (Smart Type Detection)
// ============================================================================
export interface ImageShorthandConfig {
  src: string;
  boxSize?: string;
  id?: string;
  alt?: string;
  rounded?: string;
  position?: string;
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
    const s = String(arg).toLowerCase().trim();

    if (isBoxSizeValue(arg) && !boxSize) {
      boxSize = String(arg).trim();
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

export function createImageFromShorthand(config: ImageShorthandConfig): ReactElement {
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

  return (
    <div key={id || src} className={`cr-image-wrapper cr-image--rounded-${rounded}`} style={styles}>
      <img id={id} src={src} alt={alt} className="cr-image" />
    </div>
  );
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
        {children}
      </div>
    </div>
  );
}

export const SimplePage = Page;

