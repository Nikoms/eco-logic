import { AddFlight } from '@/domain/Traveling/UseCase/AddFlight/AddFlight';
import { AddFlightRequest } from '@/domain/Traveling/UseCase/AddFlight/AddFlightRequest';

export class AddFlightController {
  constructor(private addCarUseCase: AddFlight) {
  }

  addFlight(request: AddFlightRequest) {
    this.addCarUseCase.execute(request);
  }
}
