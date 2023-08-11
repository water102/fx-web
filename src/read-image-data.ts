export function readImageData(file: File) {
  return new Promise((resolve, _reject) => {
    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      resolve(e?.target?.result ?? '');
    };

    reader.readAsDataURL(file);
  });
}
