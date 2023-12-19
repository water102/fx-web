export function isElementInViewport(el: HTMLElement, partiallyVisible = false) {
  const { top, left, bottom, right } = el.getBoundingClientRect();
  const { innerHeight, innerWidth } = window;
  if (partiallyVisible) {
     return ( (top >= 0 && top <= innerHeight) || (bottom >= 0 && bottom <= innerHeight) ) &&
          ( (left >= 0 && left <= innerWidth) || (right >= 0 && right <= innerWidth) );
  }  
  return top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
}