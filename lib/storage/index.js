export const setItem = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};
export const getItem = (key) => {
    const json = localStorage.getItem(key);
    if (!!json)
        return JSON.parse(json);
    return null;
};
