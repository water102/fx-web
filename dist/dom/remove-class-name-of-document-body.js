/**
 * Removes a class name from the document body.
 * @param className - The class name to remove
 * @example
 * removeClassNameOfDocumentBody('dark-mode');
 */
export const removeClassNameOfDocumentBody = (className) => {
    document.body.classList.remove(className);
};
