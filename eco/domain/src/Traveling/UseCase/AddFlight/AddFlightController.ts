import { AddFlight } from '@eco/domain/src/Traveling/UseCase/AddFlight/AddFlight';
import { AddFlightRequest } from '@eco/domain/src/Traveling/UseCase/AddFlight/AddFlightRequest';

export class AddFlightController {
  constructor(private addCarUseCase: AddFlight) {
  }

  addFlight(request: AddFlightRequest) {
    this.addCarUseCase.execute(request);
  }
}
