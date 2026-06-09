/**
 * Scrolls the viewport to bring an element into view.
 * @param el - The element to scroll to
 * @example
 * scrollViewportToElement(element);
 */
export function scrollViewportToElement(el) {
    const opts = {};
    el.scrollIntoView(opts);
}
