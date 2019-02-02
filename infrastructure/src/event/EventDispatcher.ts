import { EventDispatcher } from '@eco/application/src/event/EventDispatcher';

export class EventTargetEventDispatcher implements EventDispatcher {
  private listeners: Map<string, Map<any, any>> = new Map();

  constructor(private eventTarget = new EventTarget()) {
  }

  addListener(eventName: string, callback: (eventName: string, event: any) => any): any {
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, new Map());
    }
    const myCallback = (event: Event) => {
      console.log('youpiiie');
      callback(eventName, (<CustomEvent> event).detail);
    };
    this.listeners.get(eventName)!.set(callback, myCallback);
    this.eventTarget.addEventListener(eventName, myCallback);
  }

  removeListener(eventName: string, callback: any): any {
    const myCallback = this.listeners.get(eventName)!.get(callback);
    this.eventTarget.removeEventListener(eventName, myCallback);
    this.listeners.get(eventName)!.delete(callback);
  }

  emit(eventName: string, event: any): any {
    this.eventTarget.dispatchEvent(new CustomEvent(eventName, { detail: event }));
  }
}
