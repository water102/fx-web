/**
 * Adds an event listener and returns a cleanup function.
 * @param owner - The element or window to attach the event to
 * @param eventName - The event name
 * @param handler - The event handler function
 * @returns A cleanup function that removes the event listener
 * @example
 * const cleanup = listenEvent(window, 'resize', () => {
 *   console.log('Window resized');
 * });
 * // Later: cleanup(); // Removes the event listener
 */
export declare function listenEvent<K extends keyof WindowEventMap>(owner: Window, eventName: K, handler: (event: WindowEventMap[K]) => void): () => void;
export declare function listenEvent<K extends keyof HTMLElementEventMap>(owner: HTMLElement, eventName: K, handler: (event: HTMLElementEventMap[K]) => void): () => void;
//# sourceMappingURL=listen-event.d.ts.map