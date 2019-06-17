import { Event } from '@eco/shared-kernel/src/event/Event';

export interface EventDispatcher {
  emit(event: Event): any;

  addListener(eventName: string, callback: (event: Event | any) => any): any;

  removeListener(eventName: string, callback: () => any): any;
}
