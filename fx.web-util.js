import 'jquery';
import 'block-ui';
//'<p><i class="fa fa-spin fa-spinner"></i> Loading...</p>'
import {
    fxLogger
} from '@water102/fx-common';

import fxCookies from './fx.cookies';

class FxWebUtil {
    blockElement(el, message) {
        message = message || 'processing...';
        const $el = $(el);
        $el.block({
            message: `<div class="lds-ripple"><div></div><div></div></div> <h3>${message}</h3>`,
            css: {
                width: '60%'
            }
        });
        return () => $el.unblock();
    }

    setDefaultLogLever() {
        let qLv = fxWebUtil.getQueryStringParameter('log-level', fxLogger.getLevel());
        let logLevel = fxLogger.logLevelMapping(qLv);
        fxLogger.setLevel(logLevel);
    }

    checkRule(rule) {
        rule = rule.toLocaleLowerCase();
        for (const userRole of userRoles) {
            if (userRole.toLocaleLowerCase().indexOf(rule) != -1) {
                return true;
            }
        }
        return false;
    }

    getCurrentLanguage() {
        const language = fxCookies.getItem('culture') || 'en';
        return language;
    }

    // async switchLanguageForValidation() {
    //     const language = this.getCurrentLanguage();
    //     switch (language) {
    //         case 'vi-VN':
    //             return import ('jquery-validation-language/messages_vi');
    //         default:
    //             return import ('jquery-validation-language/messages_en');
    //     }
    // }

    async isMobile() {
        const is = await import('is_js');
        return is.mobile();
    }

    listenEvent(owner, eventName, handler) {
        owner.addEventListener(eventName, handler);
        return () => owner.removeEventListener(eventName, handler);
    }

    hidePageLoading() {
        document
            .body
            .classList
            .add('loaded');
    }

    getBrowserZoomLevel() {
        return window.devicePixelRatio;
    }

    handleEventChange($event, owner, names) {
        const target = $event.target;
        const value = target.type === 'checkbox' ?
            target.checked :
            target.value;

        this.setByPath(owner.state, names, value);

        owner.setState(owner.state);
    }

    updateQueryStringParameter(uri, key, value) {
        const re = new RegExp('([?&])' + key + '=.*?(&|#|$)', 'i');
        if (value === undefined) {
            if (uri.match(re)) {
                return uri.replace(re, '$1$2');
            } else {
                return uri;
            }
        } else {
            if (uri.match(re)) {
                return uri.replace(re, '$1' + key + '=' + value + '$2');
            } else {
                let hash = '';
                if (uri.indexOf('#') !== -1) {
                    hash = uri.replace(/.*#/, '#');
                    uri = uri.replace(/#.*/, '');
                }
                let separator = uri.indexOf('?') !== -1 ?
                    '&' :
                    '?';
                return uri + separator + key + '=' + value + hash;
            }
        }
    }

    getQueryStringParameter(name, defaultVal = '') {
        const regexS = '[\\?&]' + name + '=([^&#]*)',
            regex = new RegExp(regexS, 'i'),
            results = regex.exec(window.location.search);
        if (results == null) {
            return defaultVal;
        } else {
            return decodeURIComponent(results[1].replace(/\+/g, ' '));
        }
    }

    readImageData(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = e => {
                resolve(e.target.result);
            };

            reader.readAsDataURL(file);
        });
    }

    showPopup(url, title, w, h) {
        const left = (screen.width / 2) - (w / 2);
        const top = (screen.height / 2) - (h / 2);
        return window.open(url, title, `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${+ h}, top=${top}, left=${left}`);
    }
}
export const fxWebUtil = new FxWebUtil();