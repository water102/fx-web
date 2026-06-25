import { copyToClipboard } from './copy-to-clipboard';

describe('copyToClipboard', () => {
  const writeText = jest.fn();

  beforeEach(() => {
    writeText.mockReset();
    Object.assign(navigator, {
      clipboard: { writeText },
    });
  });

  test('uses Clipboard API when available', async () => {
    writeText.mockResolvedValue(undefined);
    await expect(copyToClipboard('hello')).resolves.toBe(true);
    expect(writeText).toHaveBeenCalledWith('hello');
  });

  test('falls back to execCommand when Clipboard API fails', async () => {
    writeText.mockRejectedValue(new Error('denied'));
    const execCommand = jest.fn(() => true);
    Object.assign(document, { execCommand });

    await expect(copyToClipboard('fallback')).resolves.toBe(true);
    expect(execCommand).toHaveBeenCalledWith('copy');
  });

  test('returns false when fallback is disabled and Clipboard API fails', async () => {
    writeText.mockRejectedValue(new Error('denied'));

    await expect(copyToClipboard('no-fallback', { fallback: false })).resolves.toBe(
      false,
    );
  });
});
