/**
 * Makes an element fullscreen with cross-browser support.
 * @param el - The element to make fullscreen
 * @example
 * makeElementFullscreen(videoElement);
 */
export function makeElementFullscreen(el) {
    const element = el;
    const doc = document;
    if (element.webkitEnterFullScreen) {
        element.webkitEnterFullScreen();
    }
    else if (element.requestFullscreen) {
        element.requestFullscreen();
    }
    else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    }
    else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }
    else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
    else {
        const requestFullscreen = doc.documentElement.requestFullscreen ||
            doc.documentElement.webkitRequestFullscreen ||
            doc.documentElement.mozRequestFullscreen ||
            doc.documentElement.requestFullScreen ||
            doc.documentElement.webkitRequestFullScreen ||
            doc.documentElement.mozRequestFullScreen;
        if (requestFullscreen) {
            requestFullscreen.call(doc.documentElement);
        }
    }
}
