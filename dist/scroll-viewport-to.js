/**
 * Scrolls the viewport to a specific Y position.
 * @param y - The Y position to scroll to
 * @example
 * scrollViewportTo(0); // Scroll to top
 * scrollViewportTo(500);
 */
export function scrollViewportTo(y) {
    document.body.scrollTop = document.documentElement.scrollTop = y;
}
