export function listenEvent(owner, eventName, handler) {
    owner.addEventListener(eventName, handler);
    return () => owner.removeEventListener(eventName, handler);
}
