/**
 * Copies text to the clipboard.
 * @param val - The text to copy
 * @returns A Promise that resolves when the text is copied, or rejects on error
 * @example
 * await copyToClipboard('Hello World');
 */
export const copyToClipboard = async (val: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(val);
  } catch (error) {
    throw new Error(`Failed to copy to clipboard: ${error instanceof Error ? error.message : String(error)}`);
  }
};
