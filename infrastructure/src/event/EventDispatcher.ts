import { EventDispatcher } from '@eco/shared-kernel/src/event/EventDispatcher';
import { Event } from '@eco/shared-kernel/src/event/Event';

export class EventTargetEventDispatcher implements EventDispatcher {
  private listeners: Map<string, Map<any, any>> = new Map();

  constructor(private eventTarget = new EventTarget()) {
  }

  addListener(eventName: string, callback: (event: any) => any): any {
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, new Map());
    }
    const myCallback = (event: any) => {
      callback((event as CustomEvent).detail);
    };
    this.listeners.get(eventName)!.set(callback, myCallback);
    this.eventTarget.addEventListener(eventName, myCallback);
  }

  removeListener(eventName: string, callback: any): any {
    const myCallback = this.listeners.get(eventName)!.get(callback);
    this.eventTarget.removeEventListener(eventName, myCallback);
    this.listeners.get(eventName)!.delete(callback);
  }

  emit(event: Event): any {
    this.eventTarget.dispatchEvent(new CustomEvent(event.name, { detail: event }));
  }
}
