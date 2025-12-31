/**
 * Removes an element with a fade-out animation.
 * @param el - The element to remove
 * @param millis - The duration of the fade-out animation in milliseconds
 * @example
 * removeFadeOut(element, 500); // Fades out over 500ms then removes
 */
export function removeFadeOut(el: HTMLElement, millis = 400): void {
  el.style.transition = 'opacity ' + millis + 'ms ease';
  el.style.opacity = '0';
  setTimeout(function () {
    el.parentNode?.removeChild(el);
  }, millis);
}
