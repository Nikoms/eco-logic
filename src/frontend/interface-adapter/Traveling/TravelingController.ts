import {
  AddCar,
  AddCarPresenterInterface,
  AddCarRequest,
  AddFlight,
  AddFlightPresenterInterface,
  AddFlightRequest,
  GetCars,
  GetCarsPresenterInterface,
  GetFlights,
  GetFlightsPresenterInterface,
  UpdateOdometer,
  UpdateOdometerPresenterInterface,
  UpdateOdometerRequest,
} from '../../../eco/domain';

export class TravelingController {
  constructor(
    private addCarPresenter: AddCarPresenterInterface,
    private addFlightPresenter: AddFlightPresenterInterface,
    private getFlightsPresenter: GetFlightsPresenterInterface,
    private getCarsPresenter: GetCarsPresenterInterface,
    private updateOdometerPresenter: UpdateOdometerPresenterInterface,
    private addCarUseCase: AddCar,
    private addFlightUseCase: AddFlight,
    private getCars: GetCars,
    private getFlights: GetFlights,
    private updateOdometerUseCase: UpdateOdometer) {
  }

  addCar(name: string, consumption: string, engine: string, km: string) {
    const request = new AddCarRequest(name, consumption, engine, km);
    this.addCarUseCase.execute(request, this.addCarPresenter);
  }

  addFlight(request: AddFlightRequest) {
    this.addFlightUseCase.execute(request, this.addFlightPresenter);
  }

  refreshSummary() {
    this.getCars.execute(this.getCarsPresenter);
    this.getFlights.execute(this.getFlightsPresenter);
  }

  updateOdometer(carId: string, km: string) {
    const request = new UpdateOdometerRequest(carId, km);
    this.updateOdometerUseCase.execute(request, this.updateOdometerPresenter);
  }
}
