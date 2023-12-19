export function scrollViewportTo(y: number) {
  document.body.scrollTop = document.documentElement.scrollTop = y;
}