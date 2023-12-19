// @ts-nocheck
export function makeElementFullscreen(el: HTMLElement) {
  if (el.webkitEnterFullScreen) el.webkitEnterFullScreen();
  else if (el.requestFullscreen) el.requestFullscreen();
  else if (el.mozRequestFullScreen) el.mozRequestFullScreen();
  else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
  else if (el.msRequestFullscreen) el.msRequestFullscreen();
  else {
    const requestFullscreen = document.documentElement.requestFullscreen ||
      document.documentElement.webkitRequestFullscreen ||
      document.documentElement.mozRequestFullscreen ||
      document.documentElement.requestFullScreen ||
      document.documentElement.webkitRequestFullScreen ||
      document.documentElement.mozRequestFullScreen;
    if (requestFullscreen) requestFullscreen.call(document.documentElement);
  }
}