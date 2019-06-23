import { AddCarViewModel } from '@eco/frontend-interface-adapter/src/Traveling/AddCarViewModel';
import { AddFlightViewModel } from '@eco/frontend-interface-adapter/src/Traveling/AddFlightViewModel';
import { Car } from '@eco/domain/src/Traveling/Entity/Car';
import { PlaneTravel } from '@eco/domain/src/Traveling/Entity/PlaneTravel';
import { UpdateOdometerViewModel } from '@eco/frontend-interface-adapter/src/Traveling/UpdateOdometerViewModel';

export class ViewModel {
  carsTitle = 'Cars';
  cars: Car[] = []; // { id: string, name: string, km: string }[] = [];
  flightTitle = 'Flights';
  flights: PlaneTravel[] = []; // { date: string, description: string, km: string }[] = [];
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
