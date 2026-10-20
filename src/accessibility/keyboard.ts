export const KeyCodes = {
  ENTER: "Enter",
  SPACE: " ",
  ESCAPE: "Escape",
  TAB: "Tab",
  ARROW_UP: "ArrowUp",
  ARROW_DOWN: "ArrowDown",
  ARROW_LEFT: "ArrowLeft",
  ARROW_RIGHT: "ArrowRight",
  HOME: "Home",
  END: "End",
};

export function isActionKey(event: React.KeyboardEvent | KeyboardEvent): boolean {
  return event.key === KeyCodes.ENTER || event.key === KeyCodes.SPACE;
}
