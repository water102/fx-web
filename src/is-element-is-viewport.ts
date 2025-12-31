/**
 * Checks if an element is visible in the viewport.
 * @param el - The element to check
 * @param partiallyVisible - If true, returns true if any part of the element is visible
 * @returns True if the element is visible in the viewport
 * @example
 * const isVisible = isElementInViewport(element);
 * const isPartiallyVisible = isElementInViewport(element, true);
 */
export function isElementInViewport(el: HTMLElement, partiallyVisible = false): boolean {
  const { top, left, bottom, right } = el.getBoundingClientRect();
  const { innerHeight, innerWidth } = window;
  if (partiallyVisible) {
     return ( (top >= 0 && top <= innerHeight) || (bottom >= 0 && bottom <= innerHeight) ) &&
          ( (left >= 0 && left <= innerWidth) || (right >= 0 && right <= innerWidth) );
  }  
  return top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
}