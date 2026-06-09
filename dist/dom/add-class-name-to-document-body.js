import { removeClassNameOfDocumentBody } from "./remove-class-name-of-document-body";
/**
 * Adds a class name to the document body. Returns a cleanup function.
 * @param className - The class name to add
 * @returns A cleanup function that removes the class name
 * @example
 * const removeClass = addClassNameToDocumentBody('dark-mode');
 * // Later: removeClass();
 */
export const addClassNameToDocumentBody = (className) => {
    document.body.classList.add(className);
    return () => removeClassNameOfDocumentBody(className);
};
