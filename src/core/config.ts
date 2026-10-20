import type { ThemeMode } from "./types";
import { UI_PREFIX } from "./defaults";

export interface CriationUIConfig {
  prefix: string;
  defaultTheme: ThemeMode;
  enableAnimations: boolean;
  toastDurationMs: number;
}

export const defaultUIConfig: CriationUIConfig = {
  prefix: UI_PREFIX,
  defaultTheme: "dark",
  enableAnimations: true,
  toastDurationMs: 4000,
};

let activeConfig: CriationUIConfig = { ...defaultUIConfig };

export function configureCriationUI(userConfig: Partial<CriationUIConfig>) {
  activeConfig = { ...activeConfig, ...userConfig };
}

export function getCriationUIConfig(): CriationUIConfig {
  return activeConfig;
}
