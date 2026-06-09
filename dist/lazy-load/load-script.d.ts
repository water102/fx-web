/**
 * Options for loading a script
 */
type Options = {
    src: string;
    integrity?: string;
    crossOrigin?: string;
    referrerPolicy?: string;
};
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
export declare const loadScript: (options: Options) => Promise<void>;
export {};
//# sourceMappingURL=load-script.d.ts.map