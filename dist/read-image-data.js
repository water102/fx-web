/**
 * Reads an image file and returns its data URL.
 * @param file - The image file to read
 * @returns A Promise that resolves with the data URL string, or rejects on error
 * @example
 * const imageData = await readImageData(fileInput.files[0]);
 * // Returns: 'data:image/png;base64,...'
 */
export function readImageData(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            reader.onload = null;
            reader.onerror = null;
            const imageData = e?.target?.result ?? '';
            if (imageData) {
                resolve(imageData);
            }
            else {
                reject(new Error('Failed to read image data'));
            }
        };
        reader.onerror = () => {
            reader.onerror = null;
            reader.onload = null;
            reject(new Error('Error reading image file'));
        };
        reader.readAsDataURL(file);
    });
}
