import { AddFlightRequest } from '@eco/domain/src/Traveling/UseCase/AddFlight/AddFlightRequest';
import { Api } from '@eco/domain/src/Temp/Api';
import { AddFlightPresenterInterface } from '@eco/domain/src/Traveling/UseCase/AddFlight/AddFlightPresenterInterface';
import { AddFlightResponse } from '@eco/domain/src/Traveling/UseCase/AddFlight/AddFlightResponse';


export class AddFlight {
  constructor(private api: Api) {
  }

  async execute(request: AddFlightRequest, presenter: AddFlightPresenterInterface) {
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
      response.newFlight = await this.api.addPlaneTravel(request.seat, parseFloat(request.km), request.description || '');
    }

    presenter.presentAddFlight(response);
  }
}
