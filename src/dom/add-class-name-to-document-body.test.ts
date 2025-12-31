import { addClassNameToDocumentBody } from './add-class-name-to-document-body';

describe('addClassNameToDocumentBody', () => {
  beforeEach(() => {
    document.body.className = '';
  });

  afterEach(() => {
    document.body.className = '';
  });

  test('Adds a class name to document body', () => {
    addClassNameToDocumentBody('test-class');
    expect(document.body.classList.contains('test-class')).toBe(true);
  });

  test('Returns a cleanup function', () => {
    const cleanup = addClassNameToDocumentBody('test-class');
    expect(typeof cleanup).toBe('function');
  });

  test('Cleanup function removes the class name', () => {
    const cleanup = addClassNameToDocumentBody('test-class');
    expect(document.body.classList.contains('test-class')).toBe(true);
    
    cleanup();
    expect(document.body.classList.contains('test-class')).toBe(false);
  });

  test('Can add multiple classes', () => {
    addClassNameToDocumentBody('class1');
    addClassNameToDocumentBody('class2');
    expect(document.body.classList.contains('class1')).toBe(true);
    expect(document.body.classList.contains('class2')).toBe(true);
  });
});

