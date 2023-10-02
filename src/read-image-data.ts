export function readImageData(file: File) {
  return new Promise<string>((resolve, _reject) => {
    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      const imageData = e?.target?.result ?? '';
      resolve(imageData as string);
    };

    reader.readAsDataURL(file);
  });
}
