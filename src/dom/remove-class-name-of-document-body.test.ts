import { removeClassNameOfDocumentBody } from './remove-class-name-of-document-body';

describe('removeClassNameOfDocumentBody', () => {
  beforeEach(() => {
    document.body.className = '';
  });

  afterEach(() => {
    document.body.className = '';
  });

  test('Removes a class name from document body', () => {
    document.body.classList.add('test-class');
    expect(document.body.classList.contains('test-class')).toBe(true);
    
    removeClassNameOfDocumentBody('test-class');
    expect(document.body.classList.contains('test-class')).toBe(false);
  });

  test('Does nothing when class does not exist', () => {
    removeClassNameOfDocumentBody('non-existent');
    expect(document.body.classList.length).toBe(0);
  });

  test('Removes only the specified class', () => {
    document.body.classList.add('class1', 'class2');
    removeClassNameOfDocumentBody('class1');
    expect(document.body.classList.contains('class1')).toBe(false);
    expect(document.body.classList.contains('class2')).toBe(true);
  });
});

