# @water102/fx-web

A comprehensive TypeScript utility library for web browser operations, DOM manipulation, CSS variables, storage, and more.

## Features

- ✅ **Browser-focused**: Utilities designed specifically for web browser environments
- ✅ **DOM Helpers**: Easy DOM manipulation and querying functions
- ✅ **Storage Management**: LocalStorage helpers with JSON serialization
- ✅ **CSS Variables**: Get and set CSS custom properties
- ✅ **Type-safe**: Full TypeScript support
- ✅ **Well-documented**: Comprehensive API documentation

## Installation

```bash
npm install @water102/fx-web
# or
pnpm install @water102/fx-web
# or
yarn add @water102/fx-web
```

**Note**: This package requires `@water102/fx-common` as a peer dependency.

## Usage

```typescript
import { 
  qs, 
  setCssVar, 
  getCssVar,
  copyToClipboard,
  getWindowDimensions 
} from '@water102/fx-web';
```

## API Documentation

### DOM Manipulation

Utilities for working with the DOM.

#### `qs(selector, parent?)`
Query selector - returns the first element matching the selector.

```typescript
const element = qs('#myId');
const button = qs('button', document.body);
```

#### `qsa(selector, parent?)`
Query selector all - returns all elements matching the selector as an array.

```typescript
const buttons = qsa('button');
const items = qsa('.item', container);
```

#### `$id(id, parent?)`
Get element by ID.

```typescript
const element = $id('myElement');
```

#### `$name(name, parent?)`
Get elements by name attribute.

```typescript
const inputs = $name('username');
```

#### `$tag(tagName, parent?)`
Get elements by tag name.

```typescript
const divs = $tag('div');
```

#### `createElement(type, options?)`
Creates a DOM element with attributes, classes, dataset, and text content.

```typescript
const button = createElement('button', {
  class: 'btn btn-primary',
  text: 'Click me',
  dataset: { id: '123' },
  id: 'myButton'
});
```

#### `addGlobalEventListener(type, selector, callback, options, parent?)`
Adds a global event listener with event delegation.

```typescript
addGlobalEventListener('click', '.button', (e) => {
  console.log('Button clicked');
}, {});
```

#### `$setInputValue(element, value)`
Sets the value of an input element (supports text, textarea, checkbox, radio, select).

```typescript
$setInputValue(inputElement, 'new value');
```

#### `$getInputValue(element)`
Gets the value from an input element.

```typescript
const value = $getInputValue(inputElement);
```

#### `$setValue(element, value, isHtml?)`
Sets the value of an element (input, textarea, or innerHTML/innerText).

```typescript
$setValue(divElement, 'Hello World');
$setValue(divElement, '<strong>Hello</strong>', true); // HTML mode
```

#### `$getValue(element, isHtml?)`
Gets the value from an element.

```typescript
const text = $getValue(divElement);
const html = $getValue(divElement, true);
```

#### `addClassNameToDocumentBody(className)`
Adds a class name to the document body. Returns a cleanup function.

```typescript
const removeClass = addClassNameToDocumentBody('dark-mode');
// Later: removeClass();
```

#### `removeClassNameOfDocumentBody(className)`
Removes a class name from the document body.

```typescript
removeClassNameOfDocumentBody('dark-mode');
```

---

### CSS Variables

Utilities for working with CSS custom properties.

#### `getCssVar(key)`
Gets a CSS custom property value from `:root`.

```typescript
const primaryColor = getCssVar('--primary-color');
```

#### `setCssVar(key, value)`
Sets a CSS custom property value on `:root`.

```typescript
setCssVar('--primary-color', '#ff0000');
setCssVar('--spacing', '16px');
```

---

### Storage

LocalStorage helpers with automatic JSON serialization.

#### `setItem(key, data)`
Stores data in localStorage with JSON serialization.

```typescript
setItem('user', { name: 'John', age: 30 });
setItem('settings', { theme: 'dark' });
```

#### `getItem(key)`
Retrieves data from localStorage with JSON parsing.

```typescript
const user = getItem('user'); // { name: 'John', age: 30 }
const settings = getItem('settings');
```

---

### Cookies

Cookie management helper class.

#### `CookiesHelper`

```typescript
import { CookiesHelper } from '@water102/fx-web';

const cookies = new CookiesHelper();

// Get cookie
const value = cookies.getItem('sessionId');

// Set cookie
cookies.setItem('sessionId', 'abc123', new Date('2024-12-31'), '/', '', false);

// Check if cookie exists
const exists = cookies.hasItem('sessionId');

// Remove cookie
cookies.removeItem('sessionId', '/', '');

// Get all cookie keys
const keys = cookies.keys();
```

---

### Lazy Loading

#### `loadScript(options)`
Dynamically loads a script with support for integrity, CORS, and referrer policy.

```typescript
await loadScript({
  src: 'https://example.com/script.js',
  integrity: 'sha384-...',
  crossOrigin: 'anonymous',
  referrerPolicy: 'no-referrer'
});
```

---

### Bootstrap

#### `bootstrap(win, doc)`
Waits for DOM to be ready before executing a render function.

```typescript
bootstrap(window, document)((win, doc) => {
  // DOM is ready, initialize your app
  console.log('DOM ready!');
});
```

---

### Clipboard

#### `copyToClipboard(val)`
Copies text to the clipboard.

```typescript
copyToClipboard('Hello World');
```

---

### Export

#### `exportAsCsv(fileName)`
Creates a function that exports data as CSV file.

```typescript
const exportCsv = exportAsCsv('data.csv');
exportCsv('Name,Age\nJohn,30\nJane,25');
```

---

### Browser Information

#### `getBrowserZoomLevel()`
Gets the browser zoom level (device pixel ratio).

```typescript
const zoomLevel = getBrowserZoomLevel(); // e.g., 1.5
```

#### `getWindowDimensions()`
Gets the current window dimensions.

```typescript
const { width, height } = getWindowDimensions();
console.log(`Window: ${width}x${height}`);
```

#### `isElementInViewport(el, partiallyVisible?)`
Checks if an element is visible in the viewport.

```typescript
const isVisible = isElementInViewport(element);
const isPartiallyVisible = isElementInViewport(element, true);
```

---

### Events

#### `listenEvent(owner, eventName, handler)`
Adds an event listener and returns a cleanup function.

```typescript
const cleanup = listenEvent(window, 'resize', () => {
  console.log('Window resized');
});

// Later: cleanup(); // Removes the event listener
```

---

### Fullscreen

#### `makeElementFullscreen(el)`
Makes an element fullscreen (cross-browser support).

```typescript
makeElementFullscreen(videoElement);
```

---

### Query String

#### `getQueryString(name, defaultVal?)`
Gets a query string parameter from the current URL.

```typescript
const userId = getQueryString('userId', '0');
const token = getQueryString('token');
```

#### `updateQueryString(uri, key, value)`
Updates or removes a query string parameter in a URI.

```typescript
const newUrl = updateQueryString('/page', 'id', '123');
const removed = updateQueryString('/page', 'id', undefined);
```

---

### Image

#### `readImageData(file)`
Reads an image file and returns its data URL.

```typescript
const imageData = await readImageData(fileInput.files[0]);
// Returns: 'data:image/png;base64,...'
```

---

### Scroll

#### `scrollViewportTo(y)`
Scrolls the viewport to a specific Y position.

```typescript
scrollViewportTo(0); // Scroll to top
scrollViewportTo(500);
```

#### `scrollViewportToElement(el)`
Scrolls the viewport to bring an element into view.

```typescript
scrollViewportToElement(element);
```

---

### Popup

#### `showPopup(url, title, w, h)`
Opens a popup window with specified dimensions.

```typescript
const popup = showPopup('https://example.com', 'Popup', 800, 600);
```

---

### Animation

#### `removeFadeOut(el, millis?)`
Removes an element with a fade-out animation.

```typescript
removeFadeOut(element, 500); // Fades out over 500ms then removes
```

---

## Development

### Build

```bash
npm run build
```

### Test

```bash
npm test
```

### Format

```bash
npm run prettier-format
```

## License

See LICENSE file for details.
