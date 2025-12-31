/**
 * Gets a CSS custom property value from :root.
 * @param key - The CSS variable name (e.g., '--primary-color')
 * @returns The CSS variable value or empty string if not found
 * @example
 * const primaryColor = getCssVar('--primary-color');
 */
export const getCssVar = (key: string): string => {
  const r = document.querySelector(':root') as HTMLElement;
  if (!r) return '';

  const rs = getComputedStyle(r);
  return rs.getPropertyValue(key);
}