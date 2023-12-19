export function removeFadeOut(el: HTMLElement, millis = 400) {
  el.style.transition = 'opacity ' + millis + 'ms ease';
  el.style.opacity = '0';
  setTimeout(function () {
    el.parentNode?.removeChild(el);
  }, millis);
}
