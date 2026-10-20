export interface ComponentMetadata {
  name: string;
  category:
    | "buttons"
    | "inputs"
    | "layout"
    | "typography"
    | "navigation"
    | "overlays"
    | "feedback"
    | "data-display"
    | "media";
  description: string;
  props: string[];
}

export const COMPONENT_REGISTRY: Record<string, ComponentMetadata> = {
  Button: {
    name: "Button",
    category: "buttons",
    description: "Interactive button supporting variants, sizes, loading state and icons.",
    props: ["variant", "size", "loading", "disabled", "onClick"],
  },
  IconButton: {
    name: "IconButton",
    category: "buttons",
    description: "Compact icon button with equal aspect ratio and accessible labels.",
    props: ["icon", "aria-label", "variant", "size"],
  },
  ButtonGroup: {
    name: "ButtonGroup",
    category: "buttons",
    description: "Groups multiple buttons with seamless connected borders.",
    props: ["attached", "vertical"],
  },
  TextInput: {
    name: "TextInput",
    category: "inputs",
    description: "Accessible text input with prefix/suffix icons, error states, and clear buttons.",
    props: ["value", "onChange", "placeholder", "error", "size"],
  },
  PasswordInput: {
    name: "PasswordInput",
    category: "inputs",
    description: "Secure password input with one-click show/hide visibility toggle.",
    props: ["value", "onChange", "error"],
  },
  Select: {
    name: "Select",
    category: "inputs",
    description: "Custom styled dropdown select element with clean keyboard navigation.",
    props: ["options", "value", "onChange", "placeholder"],
  },
  Card: {
    name: "Card",
    category: "data-display",
    description: "Versatile content container with glassmorphic, bordered, or elevated surfaces.",
    props: ["variant", "padding", "interactive"],
  },
  Modal: {
    name: "Modal",
    category: "overlays",
    description: "Accessible dialog overlay with backdrop blur, focus trapping, and animations.",
    props: ["isOpen", "onClose", "title", "size"],
  },
  Badge: {
    name: "Badge",
    category: "data-display",
    description: "Compact status indicator or pill for tags and notification counts.",
    props: ["variant", "size", "pill"],
  },
  Toast: {
    name: "Toast",
    category: "feedback",
    description: "Notification alert banner dispatched imperatively or via context.",
    props: ["title", "message", "variant", "duration"],
  },
};
