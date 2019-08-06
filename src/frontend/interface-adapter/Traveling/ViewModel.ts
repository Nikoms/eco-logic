import { AddCarViewModel } from './AddCarViewModel';
import { AddFlightViewModel } from './AddFlightViewModel';
import { UpdateOdometerViewModel } from './UpdateOdometerViewModel';

export class FlightViewModel {
  constructor(public readonly date: string, public readonly distance: string, public readonly description: string) {

  }
}

export class CarViewModel {
  constructor(public readonly id: string, public readonly name: string, public readonly distance: string) {

  }
}

type EventCallback = (
  viewModel: ViewModel,
  path: 'updateOdometerView' | 'addCarView' | 'addFlightView' | null,
  newValues: Partial<ViewModel | AddCarViewModel | AddFlightViewModel | UpdateOdometerViewModel>,
  methodName: string,
) => any;

export class ViewModel {
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

  updateCars(cars: CarViewModel[]) {
    this.cars = cars;
    this.observers.forEach(cb => cb(this, null, { cars }, 'travel.updateCars'));
  }

  updateFlights(flights: FlightViewModel[]) {
    this.flights = flights;
    this.observers.forEach(cb => cb(this, null, { flights }, 'travel.updateFlights'));
  }

  setSelectedCar(selectedCar?: CarViewModel) {
    this.updateOdometerView.selectedCar = selectedCar;
    this.observers.forEach(cb => cb(this, 'updateOdometerView', { selectedCar }, 'travel.setSelectedCar'));
  }

  setDisplayUpdateOdometer(displayed: boolean) {
    this.updateOdometerView.displayed = displayed;
    this.observers.forEach(cb => cb(this, 'updateOdometerView', { displayed }, 'travel.setDisplayUpdateOdometer'));
  }

  setDisplayAddCar(displayed: boolean) {
    this.addCarView.displayed = displayed;
    this.observers.forEach(cb => cb(this, 'addCarView', { displayed }, 'travel.setDisplayAddCar'));
  }

  setDisplayAddFlight(displayed: boolean) {
    this.addFlightView.displayed = displayed;
    this.observers.forEach(cb => cb(this, 'addFlightView', { displayed }, 'travel.setDisplayAddFlight'));
  }
}
