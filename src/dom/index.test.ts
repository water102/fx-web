import { qs, qsa, createElement, $setInputValue, $getInputValue, $setValue, $getValue, $id, $name, $tag, addGlobalEventListener } from './index';

describe('DOM Helpers', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('qs', () => {
    test('Finds element by selector', () => {
      document.body.innerHTML = '<div id="test">Hello</div>';
      const result = qs('#test');
      expect(result).toBeTruthy();
      expect(result?.textContent).toBe('Hello');
    });

    test('Returns null when element not found', () => {
      const result = qs('#non-existent');
      expect(result).toBeNull();
    });

    test('Finds element in parent', () => {
      const parent = document.createElement('div');
      parent.innerHTML = '<span class="child">Child</span>';
      const result = qs('.child', parent);
      expect(result?.textContent).toBe('Child');
    });
  });

  describe('qsa', () => {
    test('Finds all elements by selector', () => {
      document.body.innerHTML = '<div class="item">1</div><div class="item">2</div>';
      const result = qsa('.item');
      expect(result).toHaveLength(2);
      expect(result[0].textContent).toBe('1');
      expect(result[1].textContent).toBe('2');
    });

    test('Returns empty array when no elements found', () => {
      const result = qsa('.non-existent');
      expect(result).toEqual([]);
    });
  });

  describe('createElement', () => {
    test('Creates element with text', () => {
      const el = createElement('div', { text: 'Hello World' });
      expect(el.tagName).toBe('DIV');
      expect(el.textContent).toBe('Hello World');
    });

    test('Creates element with class', () => {
      const el = createElement('div', { class: 'test-class' });
      expect(el.classList.contains('test-class')).toBe(true);
    });

    test('Creates element with id', () => {
      const el = createElement('div', { id: 'test-id' });
      expect(el.id).toBe('test-id');
    });

    test('Creates element with dataset', () => {
      const el = createElement('div', { dataset: { userId: '123', role: 'admin' } });
      expect(el.dataset.userId).toBe('123');
      expect(el.dataset.role).toBe('admin');
    });

    test('Creates element with attributes', () => {
      const el = createElement('input', { type: 'text', name: 'username' });
      expect(el.getAttribute('type')).toBe('text');
      expect(el.getAttribute('name')).toBe('username');
    });
  });

  describe('$id', () => {
    test('Finds element by id', () => {
      document.body.innerHTML = '<div id="test-id">Test</div>';
      const result = $id('test-id');
      expect(result).toBeTruthy();
      expect(result?.textContent).toBe('Test');
    });

    test('Returns null when id not found', () => {
      const result = $id('non-existent');
      expect(result).toBeNull();
    });

    test('Returns null for empty id', () => {
      const result = $id('');
      expect(result).toBeNull();
    });
  });

  describe('$name', () => {
    test('Finds elements by name', () => {
      document.body.innerHTML = '<input name="username"><input name="username">';
      const result = $name('username');
      expect(result.length).toBe(2);
    });

    test('Returns empty collection when name not found', () => {
      const result = $name('non-existent');
      expect(result.length).toBe(0);
    });

    test('Returns empty collection for empty name', () => {
      // Test lines 284-286: return [] when isNotNilAndEmpty returns false
      const result = $name('');
      expect(result.length).toBe(0);
    });
  });

  describe('$tag', () => {
    test('Finds elements by tag name', () => {
      document.body.innerHTML = '<div>1</div><div>2</div>';
      const result = $tag('div');
      expect(result.length).toBeGreaterThanOrEqual(2);
    });

    test('Returns empty collection when tag not found', () => {
      const result = $tag('non-existent-tag');
      expect(result.length).toBe(0);
    });

    test('Returns empty collection for empty tag name', () => {
      // Test lines 300-302: return [] when isNotNilAndEmpty returns false
      const result = $tag('');
      expect(result.length).toBe(0);
    });
  });

  describe('addGlobalEventListener', () => {
    test('Adds event listener with event delegation', () => {
      document.body.innerHTML = '<div><button class="test-btn">Click</button></div>';
      const callback = jest.fn();
      
      addGlobalEventListener('click', '.test-btn', callback, false, document);
      
      const button = document.querySelector('.test-btn') as HTMLElement;
      button.click();
      
      expect(callback).toHaveBeenCalledTimes(1);
    });

    test('Does not call callback when selector does not match', () => {
      document.body.innerHTML = '<div><button class="other-btn">Click</button></div>';
      const callback = jest.fn();
      
      addGlobalEventListener('click', '.test-btn', callback, false, document);
      
      const button = document.querySelector('.other-btn') as HTMLElement;
      button.click();
      
      expect(callback).not.toHaveBeenCalled();
    });
  });

  describe('$setInputValue and $getInputValue', () => {
    test('Sets and gets text input value', () => {
      const input = document.createElement('input');
      input.type = 'text';
      $setInputValue(input, 'test value');
      expect($getInputValue(input)).toBe('test value');
    });

    test('Sets and gets hidden input value', () => {
      // Test line 139: hidden case
      const input = document.createElement('input');
      input.type = 'hidden';
      $setInputValue(input, 'hidden value');
      expect($getInputValue(input)).toBe('hidden value');
    });

    test('Sets and gets button value', () => {
      // Test line 139: button case
      const button = document.createElement('input');
      button.type = 'button';
      $setInputValue(button, 'Click me');
      expect($getInputValue(button)).toBe('Click me');
    });

    test('Sets and gets checkbox value', () => {
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      $setInputValue(checkbox, '1');
      expect(checkbox.checked).toBe(true);
      expect($getInputValue(checkbox)).toBe('1');
    });

    test('Gets hidden input value', () => {
      // Test line 182: hidden case in $getInputValue
      const input = document.createElement('input');
      input.type = 'hidden';
      input.value = 'hidden value';
      expect($getInputValue(input)).toBe('hidden value');
    });

    test('Sets and gets radio value', () => {
      const radio = document.createElement('input');
      radio.type = 'radio';
      $setInputValue(radio, '1');
      expect(radio.checked).toBe(true);
    });

    test('Sets and gets select value', () => {
      const select = document.createElement('select');
      const option1 = document.createElement('option');
      option1.value = '1';
      option1.textContent = 'Option 1';
      const option2 = document.createElement('option');
      option2.value = '2';
      option2.textContent = 'Option 2';
      select.appendChild(option1);
      select.appendChild(option2);
      // select.type is read-only, but $setInputValue checks element.type internally
      // We'll test with a select element (default type is 'select-one')
      
      $setInputValue(select, '2');
      expect($getInputValue(select)).toBe('2');
    });

    test('Returns empty array for select-multiple when not HTMLSelectElement', () => {
      // Test line 200: return [] when element is not HTMLSelectElement
      const fakeSelect = {
        type: 'select-multiple',
        length: 0,
      } as any;
      const result = $getInputValue(fakeSelect);
      expect(result).toEqual([]);
    });

    test('Returns empty string for default case in $getInputValue', () => {
      // Test line 202: return '' for default case
      const fakeInput = {
        type: 'unknown-type',
        value: 'test',
      } as any;
      const result = $getInputValue(fakeInput);
      expect(result).toBe('');
    });

    test('Sets value for select-multiple', () => {
      // Test lines 159-167: select-multiple case
      const select = document.createElement('select');
      select.setAttribute('multiple', '');
      const option1 = document.createElement('option');
      option1.value = '1';
      option1.textContent = 'Option 1';
      const option2 = document.createElement('option');
      option2.value = '2';
      option2.textContent = 'Option 2';
      const option3 = document.createElement('option');
      option3.value = '3';
      option3.textContent = 'Option 3';
      select.appendChild(option1);
      select.appendChild(option2);
      select.appendChild(option3);
      
      $setInputValue(select, '2');
      expect(option2.selected).toBe(true);
    });

    test('Gets values for select-multiple', () => {
      // Test lines 191-199: select-multiple case in $getInputValue
      const select = document.createElement('select');
      select.setAttribute('multiple', '');
      const option1 = document.createElement('option');
      option1.value = '1';
      option1.textContent = 'Option 1';
      const option2 = document.createElement('option');
      option2.value = '2';
      option2.textContent = 'Option 2';
      option2.selected = true;
      const option3 = document.createElement('option');
      option3.value = '3';
      option3.textContent = 'Option 3';
      option3.selected = true;
      select.appendChild(option1);
      select.appendChild(option2);
      select.appendChild(option3);
      
      const result = $getInputValue(select);
      expect(Array.isArray(result)).toBe(true);
      expect(result).toContain('2');
      expect(result).toContain('3');
    });

    test('Throws error for unsupported input type', () => {
      // Test line 169: default case throws error
      const fakeInput = {
        type: 'unsupported-type',
      } as any;
      
      expect(() => {
        $setInputValue(fakeInput, 'value');
      }).toThrow('element not input');
    });
  });

  describe('$setValue and $getValue', () => {
    test('Sets and gets text value for div', () => {
      const div = document.createElement('div');
      $setValue(div, 'Hello World');
      expect($getValue(div)).toBe('Hello World');
    });

    test('Sets and gets HTML value for div', () => {
      const div = document.createElement('div');
      $setValue(div, '<strong>Hello</strong>', true);
      expect($getValue(div, true)).toBe('<strong>Hello</strong>');
    });

    test('Sets and gets value for input', () => {
      const input = document.createElement('input');
      input.type = 'text';
      $setValue(input, 'test');
      expect($getValue(input)).toBe('test');
    });
  });
});

