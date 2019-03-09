class FxDomHelper {
    setDataAttribute(el, name, val) {
        if (el.dataset !== undefined) {
            el.dataset[name] = val;
        } else {
            el.setAttribute('data-' + name, val);
        }
    }

    getDataAttribute(el, name) {
        return el.dataset !== undefined ? el.dataset[name] : el.getAttribute(name);
    }

    removeDataAttribute(el, name) {
        if (el.dataset !== undefined) {
            delete el.dataset[name];
        } else {
            el.removeAttribute('data-' + name);
        }
    }
}
export const fxDomHelper = new FxDomHelper();