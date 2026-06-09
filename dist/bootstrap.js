/**
 * Waits for DOM to be ready.
 * @param _win - The window object
 * @param doc - The document object
 * @returns A promise that resolves when the DOM is ready
 * @example
 * await bootstrap(window, document);
 * // DOM is ready, initialize your app
 * console.log('DOM ready!');
 */
export const bootstrap = (_win, doc) => new Promise((resolve) => {
    switch (doc.readyState) {
        case 'loading': {
            const domContentLoaded = 'DOMContentLoaded';
            const _domReadyHandler = () => {
                doc.removeEventListener(domContentLoaded, _domReadyHandler, false);
                resolve();
            };
            doc.addEventListener(domContentLoaded, _domReadyHandler, false);
            break;
        }
        case 'interactive':
        case 'complete':
        default:
            resolve();
    }
});
