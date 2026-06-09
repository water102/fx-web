/**
 * Adds a class name to the document body. Returns a cleanup function.
 * @param className - The class name to add
 * @returns A cleanup function that removes the class name
 * @example
 * const removeClass = addClassNameToDocumentBody('dark-mode');
 * // Later: removeClass();
 */
export declare const addClassNameToDocumentBody: (className: string) => (() => void);
//# sourceMappingURL=add-class-name-to-document-body.d.ts.map