import { Engine } from '../../../eco/domain';

type EventCallback = (payload: any, eventName: string) => any;
type SpecificEventCallback = (payload: any) => any;

export class AddCarViewModel {
  // Don't use enum with react...
  public static events = Object.freeze({
    displayChanged: 'travel.addCar.displayChanged' as 'travel.addCar.displayChanged',
  });

  displayed = false;
  engines = [Engine.gasoline, Engine.diesel, Engine.CNG, Engine.LPG];
  titleLabel = 'Add a car';
  cancelLabel = 'Cancel';
  saveLabel = 'Save';
  consumptionLabel = 'Consumption';
  engineLabel = 'Engine';
  consumptionSuffix = 'l/100';
  nameLabel = 'Name of the car';
  kmLabel = 'Km initial';
  private observers: (EventCallback)[] = [];


  setDisplayed(displayed: boolean) {
    this.displayed = displayed;
    this.observers.forEach(cb => cb({ displayed }, AddCarViewModel.events.displayChanged));
  }

  on(type: string, callback: SpecificEventCallback) {
    this.observers.push((payload, eventName) => {
      if (eventName === type) {
        callback(payload);
      }
    });
  }
}
