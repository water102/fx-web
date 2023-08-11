export function readImageData(file) {
    return new Promise((resolve, _reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            resolve(e?.target?.result ?? '');
        };
        reader.readAsDataURL(file);
    });
}
