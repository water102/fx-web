/**
 * Dynamically loads a script with support for integrity, CORS, and referrer policy.
 * @param options - Script loading options
 * @returns A Promise that resolves when the script is loaded, or rejects on error
 * @example
 * await loadScript({
 *   src: 'https://example.com/script.js',
 *   integrity: 'sha384-...',
 *   crossOrigin: 'anonymous',
 *   referrerPolicy: 'no-referrer'
 * });
 */
export const loadScript = (options) => {
    return new Promise((resolve, reject) => {
        // Check if the script is already loaded
        const existingScript = document.querySelector(`script[src="${options.src}"]`);
        if (existingScript) {
            resolve(); // Script is already loaded, resolve immediately
            return;
        }
        // Create a new script element
        const scriptEl = document.createElement('script');
        // Set up the onload and onerror callbacks
        scriptEl.onload = () => {
            clear();
            setTimeout(resolve, 0);
        };
        scriptEl.onerror = () => {
            clear();
            reject(new Error(`Failed to load script ${options.src}`)); // Reject the promise if the script fails to load
        };
        scriptEl.type = 'text/javascript';
        scriptEl.async = true;
        options.integrity && (scriptEl.integrity = options.integrity);
        options.crossOrigin && (scriptEl.crossOrigin = options.crossOrigin);
        options.referrerPolicy && (scriptEl.referrerPolicy = options.referrerPolicy);
        scriptEl.src = options.src;
        // Append the script to the document's head
        document.head.appendChild(scriptEl);
        function clear() {
            scriptEl.onload = null;
            scriptEl.onerror = null;
        }
    });
};
