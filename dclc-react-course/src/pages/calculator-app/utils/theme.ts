import type { Theme } from "../theme/theme";

const STORAGE_KEY = "calculator-theme";

export function getInitialTheme(): Theme {
  const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
  if (stored) return stored;

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  return prefersDark ? "theme1" : "theme2";
}

export function saveTheme(theme: Theme) {
  localStorage.setItem(STORAGE_KEY, theme);
}
