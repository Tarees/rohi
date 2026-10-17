export type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "rohi-theme";

/**
 * Inline script for <head>: sets data-theme on <html> before first paint,
 * using the saved choice or else the device's color-scheme preference.
 */
export const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"}document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;
