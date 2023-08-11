export const bootstrap = ((win, doc) => (render) => {
    switch (doc.readyState) {
        case 'loading':
            const domContentLoaded = 'DOMContentLoaded';
            const _domReadyHandler = () => {
                doc.removeEventListener(domContentLoaded, _domReadyHandler, false);
                render(win, doc);
            };
            doc.addEventListener(domContentLoaded, _domReadyHandler, false);
            break;
        case 'interactive':
        case 'complete':
        default:
            render(win, doc);
    }
})(window, document);
