import { AddCar } from '@eco/domain/src/Traveling/UseCase/AddCar/AddCar';
import { AddCarRequest } from '@eco/domain/src/Traveling/UseCase/AddCar/AddCarRequest';
import { AddFlight } from '@eco/domain/src/Traveling/UseCase/AddFlight/AddFlight';
import { AddFlightRequest } from '@eco/domain/src/Traveling/UseCase/AddFlight/AddFlightRequest';
import { GetCars } from '@eco/domain/src/Traveling/UseCase/GetCars/GetCars';
import { GetFlights } from '@eco/domain/src/Traveling/UseCase/GetFlights/GetFlights';
import { UpdateOdometer } from '@eco/domain/src/Traveling/UseCase/UpdateOdometer/UpdateOdometer';
import { UpdateOdometerRequest } from '@eco/domain/src/Traveling/UseCase/UpdateOdometer/UpdateOdometerRequest';
import { AddCarPresenterInterface } from '@eco/domain/src/Traveling/UseCase/AddCar/AddCarPresenterInterface';
import { AddFlightPresenterInterface } from '@eco/domain/src/Traveling/UseCase/AddFlight/AddFlightPresenterInterface';
import { UpdateOdometerPresenterInterface } from '@eco/domain/src/Traveling/UseCase/UpdateOdometer/UpdateOdometerPresenterInterface';
import { GetFlightsPresenterInterface } from '@eco/domain/src/Traveling/UseCase/GetFlights/GetFlightsPresenterInterface';
import { GetCarsPresenterInterface } from '@eco/domain/src/Traveling/UseCase/GetCars/GetCarsPresenterInterface';

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

  addCar(request: AddCarRequest) {
    this.addCarUseCase.execute(request, this.addCarPresenter);
  }

  addFlight(request: AddFlightRequest) {
    this.addFlightUseCase.execute(request, this.addFlightPresenter);
  }

  refreshSummary() {
    this.getCars.execute(this.getCarsPresenter);
    this.getFlights.execute(this.getFlightsPresenter);
  }

  updateOdometer(request: UpdateOdometerRequest) {
    this.updateOdometerUseCase.execute(request, this.updateOdometerPresenter);
  }
}
