export * from './add-class-name-to-document-body';
export * from './remove-class-name-of-document-body';
/**
 * Adds a global event listener with event delegation.
 * @param type - The event type
 * @param selector - The CSS selector to match
 * @param callback - The callback function
 * @param options - Event listener options
 * @param parent - The parent element to attach the listener to
 * @example
 * addGlobalEventListener('click', '.button', (e) => {
 *   console.log('Button clicked');
 * }, {});
 */
export declare function addGlobalEventListener(type: string, selector: string, callback: (e: Event) => void, options?: AddEventListenerOptions | boolean, parent?: HTMLElement | Document): void;
/**
 * Query selector - returns the first element matching the selector.
 * @param selector - The CSS selector
 * @param parent - The parent element or document to search in
 * @returns The first matching element or null
 * @example
 * const element = qs('#myId');
 * const button = qs('button', document.body);
 */
export declare function qs(selector: string, parent?: HTMLElement | Document): Element | null;
/**
 * Query selector all - returns all elements matching the selector as an array.
 * @param selector - The CSS selector
 * @param parent - The parent element or document to search in
 * @returns An array of all matching elements
 * @example
 * const buttons = qsa('button');
 * const items = qsa('.item', container);
 */
export declare function qsa(selector: string, parent?: HTMLElement | Document): Element[];
/**
 * Interface for createElement options
 */
export interface CreateElementOptions {
    class?: string;
    dataset?: Record<string, string | number | boolean>;
    text?: string;
    id?: string;
    [key: string]: string | number | boolean | Record<string, string | number | boolean> | undefined;
}
/**
 * Creates a DOM element with attributes, classes, dataset, and text content.
 * @param type - The element type (e.g., 'div', 'button')
 * @param options - Options object with class, dataset, text, id, and other attributes
 * @returns The created element
 * @example
 * const button = createElement('button', {
 *   class: 'btn btn-primary',
 *   text: 'Click me',
 *   dataset: { id: '123' },
 *   id: 'myButton'
 * });
 */
export declare function createElement(type: string, options?: CreateElementOptions): HTMLElement;
/**
 * Type for input elements that can have their value set
 */
type InputElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
/**
 * Sets the value of an input element (supports text, textarea, checkbox, radio, select).
 * @param element - The input element
 * @param value - The value to set
 * @example
 * $setInputValue(inputElement, 'new value');
 */
export declare function $setInputValue(element: InputElement, value: string): void;
/**
 * Gets the value from an input element.
 * @param element - The input element
 * @returns The value(s) from the input element
 * @example
 * const value = $getInputValue(inputElement);
 */
export declare function $getInputValue(element: InputElement): string | string[];
/**
 * Sets the value of an element (input, textarea, or innerHTML/innerText).
 * @param element - The element to set the value for
 * @param value - The value to set
 * @param isHtml - If true, uses innerHTML; otherwise uses innerText
 * @example
 * $setValue(divElement, 'Hello World');
 * $setValue(divElement, '<strong>Hello</strong>', true); // HTML mode
 */
export declare function $setValue(element: HTMLElement, value: string, isHtml?: boolean): void;
/**
 * Gets the value from an element.
 * @param element - The element to get the value from
 * @param isHtml - If true, returns innerHTML; otherwise returns innerText
 * @returns The value from the element
 * @example
 * const text = $getValue(divElement);
 * const html = $getValue(divElement, true);
 */
export declare function $getValue(element: HTMLElement, isHtml?: boolean): string | string[];
/**
 * Get element by ID.
 * @param id - The element ID
 * @param parent - The document to search in
 * @returns The element with the given ID or null
 * @example
 * const element = $id('myElement');
 */
export declare function $id(id: string, parent?: Document): HTMLElement | null;
/**
 * Get elements by name attribute.
 * @param name - The name attribute value
 * @param parent - The document to search in
 * @returns An HTMLCollection of elements with the given name
 * @example
 * const inputs = $name('username');
 */
export declare function $name(name: string, parent?: Document): NodeListOf<HTMLElement>;
/**
 * Get elements by tag name.
 * @param tagName - The tag name
 * @param parent - The parent element or document to search in
 * @returns An HTMLCollection of elements with the given tag name
 * @example
 * const divs = $tag('div');
 */
export declare function $tag(tagName: string, parent?: HTMLElement | Document): HTMLCollectionOf<HTMLElement>;
//# sourceMappingURL=index.d.ts.map