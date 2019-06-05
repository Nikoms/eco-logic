import { AddFlightRequest } from '@eco/domain/src/Traveling/UseCase/AddFlight/AddFlightRequest';
import { api } from '@eco/domain/src/Temp/Api';
import { AddFlightPresenterInterface } from '@eco/domain/src/Traveling/UseCase/AddFlight/AddFlightPresenterInterface';
import { AddFlightResponse } from './AddFlightResponse';


export class AddFlight {
  constructor(private presenter: AddFlightPresenterInterface) {
  }

  async execute(request: AddFlightRequest) {
    const response = new AddFlightResponse();
    let hasError = false;
    if (isNaN(parseFloat(request.km))) {
      hasError = true;
      response.isInvalidKm = true;
    }
    if (request.seat === '') {
      hasError = true;
      response.isInvalidSeat = true;
    }

    if (!hasError) {
      const flight = await api.addPlaneTravel(request.seat, parseFloat(request.km), request.description || '');
      response.newFlight = flight;
    }

    this.presenter.presentAddFlight(response);
  }
}
