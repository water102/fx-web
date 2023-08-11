export const bootstrap = ((win: Window, doc: Document) => (render: (win: Window, doc: Document) => void) => {
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