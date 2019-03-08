import { fxCommonUtil } from '@water102/fx-common';
import fxDomHelper from './fx.dom-helper';

class FxRequest {
    loadStyles() {
        const linkEls = document.querySelectorAll('link[data-href]');
        linkEls.forEach(el => {
            const url = fxDomHelper.getDataAttbute(el, 'href');
            const elId = fxCommonUtil.hashCode(url);
            styleEl.id = elId;
            styleEl.href = url;
        });
    }

    getStyle(url) {
        return new Promise((resolve, reject) => {
            const elId = fxCommonUtil.hashCode(url);
            let styleEl = document.getElementById(elId);
            if (styleEl !== null) {
                resolve();
                return;
            }
            styleEl = document.createElement('link');
            styleEl.id = elId;
            styleEl.rel = 'stylesheet';
            styleEl.type = 'text/css';
            styleEl.media = 'all';
            styleEl.onload = resolve;
            styleEl.href = url;
            fxDomHelper.setDataAttbute(styleEl, 'url', url);

            document
                .head
                .appendChild(styleEl);
        });
    }

    getScript(url) {
        return new Promise((resolve, reject) => {
            const elId = fxCommonUtil.hashCode(url);
            let scriptEl = document.getElementById(elId);
            if (scriptEl !== null) {
                resolve();
                return;
            }
            scriptEl = document.createElement('script');
            scriptEl.id = elId;
            scriptEl.type = 'text/javascript';
            scriptEl.onload = resolve;
            scriptEl.src = url;
            fxDomHelper.setDataAttbute(scriptEl, 'url', url);

            document
                .head
                .appendChild(scriptEl);
        });
    }
}
export const fxRequest = new FxRequest();