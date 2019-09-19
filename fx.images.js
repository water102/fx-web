import defaultImg from './default-images/default-image.svg';
import noImg from './default-images/no-image.svg';

class FxImages {
  getDefaultImg() {
    return defaultImg;
  }

  getNoImg() {
    return noImg;
  }

  get(imageName) {
    switch (imageName) {
      case 'alert':
        return import('./default-images/alert_32x32.png');
      case 'success':
        return import('./default-images/success_32x32.png');
      case 'error':
        return import('./default-images/error_32x32.png');
      case 'warning':
        return import('./default-images/warning_32x32.png');
      case 'info':
        return import('./default-images/info_32x32.png');
      default:
        return import('./default-images/default-image.svg');
    }
  }

  getUrl(imageName) {
    switch (imageName) {
      case 'alert':
        return '/assets/default-images/alert_32x32.png';
      case 'success':
        return '/assets/default-images/success_32x32.png';
      case 'error':
        return '/assets/default-images/error_32x32.png';
      case 'warning':
        return '/assets/default-images/warning_32x32.png';
      case 'info':
        return '/assets/default-images/info_32x32.png';
      default:
        return '/assets/default-images/default-image.svg';
    }
  }
}
export const fxImages = new FxImages();
