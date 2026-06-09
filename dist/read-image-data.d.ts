/**
 * Reads an image file and returns its data URL.
 * @param file - The image file to read
 * @returns A Promise that resolves with the data URL string, or rejects on error
 * @example
 * const imageData = await readImageData(fileInput.files[0]);
 * // Returns: 'data:image/png;base64,...'
 */
export declare function readImageData(file: File): Promise<string>;
//# sourceMappingURL=read-image-data.d.ts.map