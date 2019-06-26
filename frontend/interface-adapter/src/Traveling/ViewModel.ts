import { AddCarViewModel } from '@eco/frontend-interface-adapter/src/Traveling/AddCarViewModel';
import { AddFlightViewModel } from '@eco/frontend-interface-adapter/src/Traveling/AddFlightViewModel';
import { UpdateOdometerViewModel } from '@eco/frontend-interface-adapter/src/Traveling/UpdateOdometerViewModel';

export class FlightViewModel {
  constructor(public readonly date: string, public readonly distance: string, public readonly description: string) {

  }
}

export class CarViewModel {
  constructor(public readonly id: string, public readonly name: string, public readonly distance: string) {

  }
}

export class ViewModel {
  carsTitle = 'Cars';
  cars: CarViewModel[] = [];
  flightTitle = 'Flights';
  flights: FlightViewModel[] = [];
  private _addCarView = new AddCarViewModel();
  private _addFlightView = new AddFlightViewModel();
  private _updateOdometerView = new UpdateOdometerViewModel();

  get addCarView() {
    return this._addCarView;
  }

  get addFlightView() {
    return this._addFlightView;
  }

  get updateOdometerView() {
    return this._updateOdometerView;
  }
}
