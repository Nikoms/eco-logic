import { AddCarViewModel } from './AddCarViewModel';
import { AddFlightViewModel } from './AddFlightViewModel';
import { OdometerForm, UpdateOdometerViewModel } from './UpdateOdometerViewModel';

export class FlightViewModel {
  constructor(public readonly date: string, public readonly distance: string, public readonly description: string) {

  }
}

export class CarViewModel {
  constructor(public readonly id: string, public readonly name: string, public readonly distance: string) {

  }
}

type EventCallback = (payload: any, eventName: string) => any;
type SpecificEventCallback = (payload: any) => any;

export class ViewModel {
  // Don't use enum with react...
  public static events = Object.freeze({
    carsUpdated: 'travel.carsUpdated' as 'travel.carsUpdated',
    flightsUpdated: 'travel.flightsUpdated' as 'travel.flightsUpdated',
    formChanged: 'travel.formChanged' as 'travel.formChanged',
    addCarDisplayChanged: 'travel.addCarDisplayChanged' as 'travel.addCarDisplayChanged',
    addFlightDisplayChanged: 'travel.addFlightDisplayChanged' as 'travel.addFlightDisplayChanged',
  });

  carsTitle = 'Cars';
  cars: CarViewModel[] = [];
  flightTitle = 'Flights';
  flights: FlightViewModel[] = [];
  addCarView = new AddCarViewModel();
  addFlightView = new AddFlightViewModel();
  updateOdometerView = new UpdateOdometerViewModel();
  private observers: (EventCallback)[] = [];

  onChange(callback: EventCallback) {
    this.observers.push(callback);
  }

  on(type: string, callback: SpecificEventCallback) {
    this.observers.push((payload, eventName) => {
      if (eventName === type) {
        callback(payload);
      }
    });
  }

  updateCars(cars: CarViewModel[]) {
    this.cars = cars;
    this.observers.forEach(cb => cb({ cars }, ViewModel.events.carsUpdated));
  }

  updateFlights(flights: FlightViewModel[]) {
    this.flights = flights;
    this.observers.forEach(cb => cb({ flights }, ViewModel.events.flightsUpdated));
  }

  setUpdateOdometerForm(form: OdometerForm) {
    this.updateOdometerView.form = form;
    this.observers.forEach(cb => cb(form, ViewModel.events.formChanged));
  }

  setDisplayAddCar(displayed: boolean) {
    this.addCarView.displayed = displayed;
    this.observers.forEach(cb => cb({ displayed }, ViewModel.events.addCarDisplayChanged));
  }

  setDisplayAddFlight(displayed: boolean) {
    this.addFlightView.displayed = displayed;
    this.observers.forEach(cb => cb({ displayed }, ViewModel.events.addFlightDisplayChanged));
  }
}
