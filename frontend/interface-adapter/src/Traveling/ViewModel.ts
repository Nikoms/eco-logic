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

  doUpdate(values: Partial<ViewModel>) {
    Object.assign(this, values);
    this.observers.forEach(cb => cb(this, null, values));
  }

  doUpdateOdometerView(values: Partial<UpdateOdometerViewModel>) {
    Object.assign(this.updateOdometerView, values);
    this.observers.forEach(cb => cb(this, 'updateOdometerView', values));
  }

  doUpdateAddCarView(values: Partial<AddCarViewModel>) {
    Object.assign(this.addCarView, values);
    this.observers.forEach(cb => cb(this, 'addCarView', values));
  }

  doUpdateAddFlightView(values: Partial<AddFlightViewModel>) {
    Object.assign(this.addFlightView, values);
    this.observers.forEach(cb => cb(this, 'addFlightView', values));
  }

  onChange(callback: EventCallback) {
    this.observers.push(callback);
  }
}
