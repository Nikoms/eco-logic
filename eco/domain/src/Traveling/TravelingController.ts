import { AddCar } from '@eco/domain/src/Traveling/UseCase/AddCar/AddCar';
import { AddCarRequest } from '@eco/domain/src/Traveling/UseCase/AddCar/AddCarRequest';
import { AddFlight } from '@eco/domain/src/Traveling/UseCase/AddFlight/AddFlight';
import { AddFlightRequest } from '@eco/domain/src/Traveling/UseCase/AddFlight/AddFlightRequest';
import { GetCars } from '@eco/domain/src/Traveling/UseCase/GetCars/GetCars';
import { RefreshFlights } from '@eco/domain/src/Traveling/UseCase/RefreshFlights';
import { UpdateOdometer } from '@eco/domain/src/Traveling/UseCase/UpdateOdometer/UpdateOdometer';
import { UpdateOdometerRequest } from '@eco/domain/src/Traveling/UseCase/UpdateOdometer/UpdateOdometerRequest';

export class TravelingController {
  constructor(
    private addCarUseCase: AddCar,
    private addFlightUseCase: AddFlight,
    private getCars: GetCars,
    private refreshFlights: RefreshFlights,
    private updateOdometerUseCase: UpdateOdometer) {
  }

  addCar(request: AddCarRequest) {
    this.addCarUseCase.execute(request);
  }

  addFlight(request: AddFlightRequest) {
    this.addFlightUseCase.execute(request);
  }

  refreshSummary() {
    this.getCars.execute();
    this.refreshFlights.execute();
  }

  updateOdometer(request: UpdateOdometerRequest) {
    this.updateOdometerUseCase.execute(request);
  }
}
