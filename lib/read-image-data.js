export function readImageData(file) {
    return new Promise((resolve, _reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const imageData = e?.target?.result ?? '';
            resolve(imageData);
        };
        reader.readAsDataURL(file);
    });
}
