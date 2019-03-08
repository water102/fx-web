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
}
export const fxDomHelper = new FxDomHelper();