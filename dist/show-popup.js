/**
 * Opens a popup window with specified dimensions.
 * @param url - The URL to open
 * @param title - The window title
 * @param w - The width of the popup
 * @param h - The height of the popup
 * @returns The window object or null if popup was blocked
 * @example
 * const popup = showPopup('https://example.com', 'Popup', 800, 600);
 */
export function showPopup(url, title, w, h) {
    const left = screen.width / 2 - w / 2;
    const top = screen.height / 2 - h / 2;
    return window.open(url, title, `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${+h}, top=${top}, left=${left}`);
}
