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
        return '/asstes/default-images/alert_32x32.png';
      case 'success':
        return '/asstes/default-images/success_32x32.png';
      case 'error':
        return '/asstes/default-images/error_32x32.png';
      case 'warning':
        return '/asstes/default-images/warning_32x32.png';
      case 'info':
        return '/asstes/default-images/info_32x32.png';
      default:
        return '/asstes/default-images/default-image.svg';
    }
  }
}
export const fxImages = new FxImages();
