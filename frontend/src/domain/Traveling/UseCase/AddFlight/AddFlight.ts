import { AddFlightRequest } from '@/domain/Traveling/UseCase/AddFlight/AddFlightRequest';
import { api } from '../../../../../../api/frontend/src/Api';
import { AddFlightPresenterInterface } from '@/domain/Traveling/UseCase/AddFlight/AddFlightPresenterInterface';


export class AddFlight {
  constructor(private presenter: AddFlightPresenterInterface) {
  }

  async execute(request: AddFlightRequest) {
    let hasError = false;
    if (isNaN(parseFloat(request.km))) {
      hasError = true;
      this.presenter.invalidKm();
    }
    if (request.seat === '') {
      hasError = true;
      this.presenter.invalidSeat();
    }

    if (hasError) {
      return;
    }

    const flight = await api.addPlaneTravel(request.seat, parseFloat(request.km), request.description || '');

    this.presenter.addedFlight(flight);
  }
}
