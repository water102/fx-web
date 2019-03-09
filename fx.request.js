import { fxCommonUtil } from '@water102/fx-common';
import { fxDomHelper } from './fx.dom-helper';

class FxRequest {
    loadStyles() {
        const linkEls = document.querySelectorAll('link[data-href]');
        linkEls.forEach(el => {
            const url = fxDomHelper.getDataAttribute(el, 'href');
            const elId = fxCommonUtil.hashCode(url);
            el.id = elId;
            el.href = url;
            fxDomHelper.removeDataAttribute(el, 'href');
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

            document
                .head
                .appendChild(scriptEl);
        });
    }
}
export const fxRequest = new FxRequest();