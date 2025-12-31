/**
 * Gets the current window dimensions.
 * @returns An object with width and height of the window
 * @example
 * const { width, height } = getWindowDimensions();
 * console.log(`Window: ${width}x${height}`);
 */
export const getWindowDimensions = (): { width: number; height: number } => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
};
