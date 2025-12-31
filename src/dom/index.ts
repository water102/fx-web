import {
  isNilOrEmpty,
  isNotNilAndEmpty,
  trim,
} from "@water102/fx-common";
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
export function addGlobalEventListener(
  type: string,
  selector: string,
  callback: (e: Event) => void,
  options: AddEventListenerOptions | boolean = false,
  parent: HTMLElement | Document = document
): void {
  parent.addEventListener(
    type,
    e => {
      const target = (e.target as HTMLElement | null);
      if (target?.matches?.(selector)) {
        callback(e);
      }
    },
    options
  );
}

/**
 * Query selector - returns the first element matching the selector.
 * @param selector - The CSS selector
 * @param parent - The parent element or document to search in
 * @returns The first matching element or null
 * @example
 * const element = qs('#myId');
 * const button = qs('button', document.body);
 */
export function qs(selector: string, parent: HTMLElement | Document = document): Element | null {
  return parent.querySelector(selector);
}

/**
 * Query selector all - returns all elements matching the selector as an array.
 * @param selector - The CSS selector
 * @param parent - The parent element or document to search in
 * @returns An array of all matching elements
 * @example
 * const buttons = qsa('button');
 * const items = qsa('.item', container);
 */
export function qsa(selector: string, parent: HTMLElement | Document = document): Element[] {
  return [...parent.querySelectorAll(selector)];
}

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
export function createElement(type: string, options: CreateElementOptions = {}): HTMLElement {
  const element = document.createElement(type);
  Object.entries(options).forEach(([key, value]) => {
    if (key === "class") {
      if (typeof value === 'string') {
        element.classList.add(value);
      }
      return;
    }

    if (key === "dataset") {
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        Object.entries(value).forEach(([dataKey, dataValue]) => {
          element.dataset[dataKey] = String(dataValue);
        });
      }
      return;
    }

    if (key === "text") {
      if (typeof value === 'string') {
        element.textContent = value;
      }
      return;
    }

    if (value !== undefined) {
      element.setAttribute(key, String(value));
    }
  });
  return element;
}

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
export function $setInputValue(element: InputElement, value: string): void {
  (element as any).hasChanged = false;
  (element as any).originalValue = value;
  switch (element.type) {
    case "hidden":
    case "text":
    case "textarea":
    case "select-one":
    case "button":
      element.value = value;
      break;
    case "checkbox":
      if (element instanceof HTMLInputElement) {
        element.checked = value != "0";
        element.value = value;
      }
      break;
    case "radio":
      if (element instanceof HTMLInputElement) {
        element.checked = value != "0";
        element.value = value;
      }
      break;
    case "select-multiple":
      if (element instanceof HTMLSelectElement) {
        for (let i = 0; i < element.length; i++) {
          const option = element[i];
          if (option instanceof HTMLOptionElement && trim(option.value) === trim(value)) {
            option.selected = true;
          }
        }
      }
      break;
    default:
      throw new Error("element not input");
  }
}

/**
 * Gets the value from an input element.
 * @param element - The input element
 * @returns The value(s) from the input element
 * @example
 * const value = $getInputValue(inputElement);
 */
export function $getInputValue(element: InputElement): string | string[] {
  switch (element.type) {
    case "hidden":
    case "text":
    case "textarea":
    case "button":
    case "checkbox":
    case "radio":
    case "select-one":
      return trim(element.value);
    case "select-multiple":
      if (element instanceof HTMLSelectElement) {
        const values: string[] = [];
        for (let i = 0; i < element.length; i++) {
          const option = element[i];
          if (option instanceof HTMLOptionElement && option.selected) {
            values.push(trim(option.value));
          }
        }
        return values;
      }
      return [];
    default:
      return '';
  }
}

/**
 * Sets the value of an element (input, textarea, or innerHTML/innerText).
 * @param element - The element to set the value for
 * @param value - The value to set
 * @param isHtml - If true, uses innerHTML; otherwise uses innerText
 * @example
 * $setValue(divElement, 'Hello World');
 * $setValue(divElement, '<strong>Hello</strong>', true); // HTML mode
 */
export function $setValue(element: HTMLElement, value: string, isHtml = false): void {
  value = trim(value.toString());
  switch (element.tagName) {
    case "INPUT":
    case "TEXTAREA":
      $setInputValue(element as InputElement, value);
      break;
    default:
      if (isHtml) {
        element.innerHTML = value;
      }
      else {
        element.innerText = value;
      }
      break;
  }
}

/**
 * Gets the value from an element.
 * @param element - The element to get the value from
 * @param isHtml - If true, returns innerHTML; otherwise returns innerText
 * @returns The value from the element
 * @example
 * const text = $getValue(divElement);
 * const html = $getValue(divElement, true);
 */
export function $getValue(element: HTMLElement, isHtml = false): string | string[] {
  switch (element.tagName) {
    case "INPUT":
    case "TEXTAREA":
      return $getInputValue(element as InputElement);
    default:
      if (isHtml) {
        return element.innerHTML;
      }

      return element.innerText;
  }
}

/**
 * Get element by ID.
 * @param id - The element ID
 * @param parent - The document to search in
 * @returns The element with the given ID or null
 * @example
 * const element = $id('myElement');
 */
export function $id(id: string, parent: Document = document): HTMLElement | null {
  if (isNilOrEmpty(id)) {
    return null;
  }

  return parent.getElementById(id);
}

/**
 * Get elements by name attribute.
 * @param name - The name attribute value
 * @param parent - The document to search in
 * @returns An HTMLCollection of elements with the given name
 * @example
 * const inputs = $name('username');
 */
export function $name(name: string, parent: Document = document): NodeListOf<HTMLElement> {
  if (isNotNilAndEmpty(name)) {
    return parent.getElementsByName(name) as NodeListOf<HTMLElement>;
  }

  return [] as unknown as NodeListOf<HTMLElement>;
}

/**
 * Get elements by tag name.
 * @param tagName - The tag name
 * @param parent - The parent element or document to search in
 * @returns An HTMLCollection of elements with the given tag name
 * @example
 * const divs = $tag('div');
 */
export function $tag(tagName: string, parent: HTMLElement | Document = document): HTMLCollectionOf<HTMLElement> {
  if (isNotNilAndEmpty(tagName)) {
    return parent.getElementsByTagName(tagName) as HTMLCollectionOf<HTMLElement>;
  }

  return [] as unknown as HTMLCollectionOf<HTMLElement>;
}