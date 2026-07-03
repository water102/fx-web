export const blobToImage = (blob: Blob): Promise<HTMLImageElement | null> =>
  new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(blob);
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(null);
    };
    img.src = url;
  });

export const imageToPngBlob = (
  source: HTMLImageElement | HTMLCanvasElement,
): Promise<Blob | null> =>
  new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const w =
      source instanceof HTMLImageElement ? source.naturalWidth : source.width;
    const h =
      source instanceof HTMLImageElement ? source.naturalHeight : source.height;
    if (w <= 0 || h <= 0) {
      resolve(null);
      return;
    }
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      resolve(null);
      return;
    }
    ctx.drawImage(source, 0, 0);
    canvas.toBlob((blob) => resolve(blob), 'image/png');
  });

/** Remove transparent margins so `<img>` placement matches visible pixels. */
export const trimTransparentCanvas = (
  source: HTMLCanvasElement,
): HTMLCanvasElement => {
  const ctx = source.getContext('2d');
  if (!ctx) {
    return source;
  }
  const { width, height } = source;
  const { data } = ctx.getImageData(0, 0, width, height);
  let minX = width;
  let minY = height;
  let maxX = -1;
  let maxY = -1;
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      if (data[(y * width + x) * 4 + 3]! > 0) {
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      }
    }
  }
  if (maxX < minX || maxY < minY) {
    return source;
  }
  const w = maxX - minX + 1;
  const h = maxY - minY + 1;
  const out = document.createElement('canvas');
  out.width = w;
  out.height = h;
  out.getContext('2d')?.drawImage(source, minX, minY, w, h, 0, 0, w, h);
  return out;
};

export const canvasToObjectUrl = async (
  canvas: HTMLCanvasElement,
): Promise<string | null> => {
  const blob = await imageToPngBlob(canvas);
  return blob ? URL.createObjectURL(blob) : null;
};
