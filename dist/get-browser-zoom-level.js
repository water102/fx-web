/**
 * Gets the browser zoom level (device pixel ratio).
 * @returns The device pixel ratio (zoom level)
 * @example
 * const zoomLevel = getBrowserZoomLevel(); // e.g., 1.5
 */
export function getBrowserZoomLevel() {
    return window.devicePixelRatio;
}
