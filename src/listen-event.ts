export function listenEvent(owner: Window | HTMLElement, eventName: string, handler: (...args: any[]) => void) {
  owner.addEventListener(eventName, handler);
  return () => owner.removeEventListener(eventName, handler);
}