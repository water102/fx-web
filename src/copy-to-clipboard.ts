export type CopyToClipboardOptions = {
  /** Use textarea + execCommand when Clipboard API fails. Default true. */
  fallback?: boolean;
};

/**
 * Copies text to the clipboard.
 * @param val - The text to copy
 * @param options - `fallback` defaults to true (legacy execCommand path)
 * @returns `true` when copy succeeded, otherwise `false`
 */
export async function copyToClipboard(
  val: string,
  options?: CopyToClipboardOptions,
): Promise<boolean> {
  const useFallback = options?.fallback !== false;

  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(val);
      return true;
    } catch {
      if (!useFallback) {
        return false;
      }
    }
  } else if (!useFallback) {
    return false;
  }

  try {
    const textarea = document.createElement('textarea');
    textarea.value = val;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(textarea);
    return ok;
  } catch {
    return false;
  }
}
