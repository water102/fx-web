import { fxCommonUtil } from '@water102/fx-common';
import { fxImages } from './fx.images';

class FxNotification {
  constructor() {
    this.timeout = 5000;
    this.notificationPermission;

    this.requestPermission();
  }

  async requireLibs() {
    const libs = await Promise.all([
      import('noty'),
      import('noty/lib/themes/bootstrap-v4.css')
    ]);
    window.Noty = libs[0].default || libs[0];
    Noty.overrideDefaults({
      type: 'success',
      layout: 'topRight',
      timeout: this.timeout,
      theme: 'bootstrap-v4',
      closeWith: ['click', 'button']
    });
  }

  async requireNoty(text, type) {
    if (this.notificationPermission === 'granted') {
      this.spawnNotification(text, type);
    } else {
      if (fxCommonUtil.isNullOrUndefined(window.Noty)) {
        await this.requireLibs();
      }
      new Noty({
        text,
        type
      }).show();
    }
  }

  requestPermission(cb) {
    if (!('Notification' in window)) return;
    this.notificationPermission = Notification.permission;
    if (
      Notification.permission !== 'granted' &&
      Notification.permission !== 'denied'
    ) {
      Notification.requestPermission(permission => {
        this.notificationPermission = permission;
      });
    }
  }

  spawnNotification(title, body, type = 'alert') {
    const options = {
      icon: fxImages.getUrl(type),
      body
    };
    if (fxCommonUtil.isNullOrEmpty(title)) {
      title = fxCommonUtil.capitalizeFirstLetter(title) + ' message.';
    }
    const notification = new Notification(title, options);
    setTimeout(() => {
      notification.close();
    }, this.timeout);
  }

  async confirm(body, yesFunc, noFunc) {
    await this.requireLibs();
    const noty = new Noty({
      text: body,
      buttons: [
        Noty.button(
          'Ok',
          'btn btn-success',
          function() {
            if (!yesFunc) return;
            yesFunc();
          },
          { 'data-status': 'ok' }
        ),

        Noty.button(
          'Cancel',
          'btn btn-warning',
          function() {
            noty.close();
            if (!noFunc) return;
            noFunc();
          },
          { 'data-status': 'cancel' }
        )
      ],
      timeout: 60 * 1000
    });
    noty.show();
  }

  alert(title, body) {
    this.requireNoty(title, body, 'alert');
  }

  success(title, body) {
    this.requireNoty(title, body, 'success');
  }

  error(title, body) {
    this.requireNoty(title, body, 'error');
  }

  warning(title, body) {
    this.requireNoty(title, body, 'warning');
  }

  info(title, body) {
    this.requireNoty(title, body, 'info');
  }
}
export const fxNotification = new FxNotification();
