export interface EventDispatcher {
  emit(eventName: string, event: any): any;

  addListener(eventName: string, callback: () => any): any;

  removeListener(eventName: string, callback: () => any): any;
}
