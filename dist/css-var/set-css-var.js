/**
 * Sets a CSS custom property value on :root.
 * @param key - The CSS variable name (e.g., '--primary-color')
 * @param value - The value to set (will be converted to string)
 * @example
 * setCssVar('--primary-color', '#ff0000');
 * setCssVar('--spacing', '16px');
 */
export const setCssVar = (key, value) => {
    const r = document.querySelector(':root');
    if (!r)
        return;
    r.style.setProperty(key, value + '');
};
