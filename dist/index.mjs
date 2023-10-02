const setItem = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};
const getItem = (key) => {
    const json = localStorage.getItem(key);
    if (json)
        return JSON.parse(json);
    return null;
};

const bootstrap = (win, doc) => (render) => {
    switch (doc.readyState) {
        case 'loading': {
            const domContentLoaded = 'DOMContentLoaded';
            const _domReadyHandler = () => {
                doc.removeEventListener(domContentLoaded, _domReadyHandler, false);
                render(win, doc);
            };
            doc.addEventListener(domContentLoaded, _domReadyHandler, false);
            break;
        }
        case 'interactive':
        case 'complete':
        default:
            render(win, doc);
    }
};

const copyToClipboard = (val) => {
    navigator.clipboard.writeText(val);
};

const exportAsCsv = (fileName) => (data) => {
    const encodedUri = 'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURIComponent(data);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', fileName);
    link.click();
    link.remove();
};

function getBrowserZoomLevel() {
    return window.devicePixelRatio;
}

const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
};

function listenEvent(owner, eventName, handler) {
    owner.addEventListener(eventName, handler);
    return () => owner.removeEventListener(eventName, handler);
}

function updateQueryString(uri, key, value) {
    const re = new RegExp('([?&])' + key + '=.*?(&|#|$)', 'i');
    if (value === undefined) {
        if (uri.match(re)) {
            return uri.replace(re, '$1$2');
        }
        else {
            return uri;
        }
    }
    else {
        if (uri.match(re)) {
            return uri.replace(re, '$1' + key + '=' + value + '$2');
        }
        else {
            let hash = '';
            if (uri.indexOf('#') !== -1) {
                hash = uri.replace(/.*#/, '#');
                uri = uri.replace(/#.*/, '');
            }
            const separator = uri.indexOf('?') !== -1 ? '&' : '?';
            return uri + separator + key + '=' + value + hash;
        }
    }
}
function getQueryString(name, defaultVal = '') {
    const regexS = '[\\?&]' + name + '=([^&#]*)', regex = new RegExp(regexS, 'i'), results = regex.exec(window.location.search);
    if (results == null) {
        return defaultVal;
    }
    else {
        return decodeURIComponent(results[1].replace(/\+/g, ' '));
    }
}

function readImageData(file) {
    return new Promise((resolve, _reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            var _a, _b;
            const imageData = (_b = (_a = e === null || e === void 0 ? void 0 : e.target) === null || _a === void 0 ? void 0 : _a.result) !== null && _b !== void 0 ? _b : '';
            resolve(imageData);
        };
        reader.readAsDataURL(file);
    });
}

function showPopup(url, title, w, h) {
    const left = screen.width / 2 - w / 2;
    const top = screen.height / 2 - h / 2;
    return window.open(url, title, `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${+h}, top=${top}, left=${left}`);
}

export { bootstrap, copyToClipboard, exportAsCsv, getBrowserZoomLevel, getItem, getQueryString, getWindowDimensions, listenEvent, readImageData, setItem, showPopup, updateQueryString };
//# sourceMappingURL=index.mjs.map
