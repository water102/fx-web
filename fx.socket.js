import { fxLogger, fxCommonUtil } from '@water102/fx-common';

import fxAuth from './fx.auth';

class FxSocket {
    constructor() {
        this.socket = undefined;
        this.onUnauthorized = this.onUnauthorized.bind(this);
    }

    onConnect() {
    }

    async requireLibs() {
        const lib = await import('socket.io-client');
        return lib.default || lib;
    }

    async connect(socketServer) {
        const io = await this.requireLibs();
        const token = fxAuth.getToken();

        const options = {
            query: 'token=' + token,
            secure: /^https/i.test(socketServer)
        };

        const socket = this.socket = io.connect(socketServer, options);

        socket.on('unauthorized', this.onUnauthorized);
    }

    onUnauthorized(error, callback) {
        if (error.data.type == 'UnauthorizedError' || error.data.code == 'invalid_token') {
            fxAuth.signout();
            // redirect user to login page perhaps or execute callback:
            if (callback) {
                callback();
            } else {
                document.location.href = fxAuth.getLoginUrl();
            }
            fxLogger.info('User\'s token has expired');
        }
    }
}

export const fxSocket = new FxSocket();