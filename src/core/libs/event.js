export function createCustomEvent(element, eventName, callbackFn, sourceElement) {
   if (!element instanceof HTMLElement)
      throw new ReferenceError('element parameter is not type of HTMLElement');

   const event = new Event(eventName);
   if (_.isElement(sourceElement)) {
      Object.defineProperty(event, 'target', { writable: false, value: sourceElement });
   }

   element.addEventListener(event.type, callbackFn);

   return event;
}
