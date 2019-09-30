import { fxLogger, fxCommonUtil } from '@water102/fx-common';

class FxSocket {
  authService;
  socket;

  constructor() {
    this.onUnauthorized = this.onUnauthorized.bind(this);
  }

  onConnect() {}

  async requireLibs() {
    const lib = await import('socket.io-client');
    return lib.default || lib;
  }

  async connect(socketServer, accessToken, authService) {
    this.authService = authService;
    const io = await this.requireLibs();
    if (fxCommonUtil.isNullOrEmpty(accessToken)) {
      accessToken = this.authService.getToken();
    }

    const options = {
      query: 'token=' + accessToken,
      secure: /^https/i.test(socketServer)
    };

    const socket = (this.socket = io.connect(socketServer, options));

    socket.on('unauthorized', this.onUnauthorized);
  }

  onUnauthorized(error, callback) {
    if (
      error.data.type == 'UnauthorizedError' ||
      error.data.code == 'invalid_token'
    ) {
      this.authService.signout();
      // redirect user to login page perhaps or execute callback:
      if (callback) {
        callback();
      } else {
        document.location.href = this.authService.getLoginUrl();
      }
      fxLogger.info("User's token has expired");
    }
  }
}

export const fxSocket = new FxSocket();
