export function generateUniqueId(prefix = "cr-id"): string {
  return `${prefix}-${Math.random().toString(36).substring(2, 9)}`;
}

export function announceToScreenReader(message: string, priority: "polite" | "assertive" = "polite") {
  if (typeof document === "undefined") return;

  let announcer = document.getElementById("cr-live-announcer");
  if (!announcer) {
    announcer = document.createElement("div");
    announcer.id = "cr-live-announcer";
    announcer.style.position = "absolute";
    announcer.style.width = "1px";
    announcer.style.height = "1px";
    announcer.style.padding = "0";
    announcer.style.margin = "-1px";
    announcer.style.overflow = "hidden";
    announcer.style.clip = "rect(0, 0, 0, 0)";
    announcer.style.whiteSpace = "nowrap";
    announcer.style.border = "0";
    document.body.appendChild(announcer);
  }

  announcer.setAttribute("aria-live", priority);
  announcer.textContent = "";
  setTimeout(() => {
    if (announcer) announcer.textContent = message;
  }, 50);
}
