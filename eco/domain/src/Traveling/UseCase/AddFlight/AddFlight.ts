import { AddFlightRequest } from '@eco/domain/src/Traveling/UseCase/AddFlight/AddFlightRequest';
import { AddFlightPresenterInterface } from '@eco/domain/src/Traveling/UseCase/AddFlight/AddFlightPresenterInterface';
import { AddFlightResponse } from '@eco/domain/src/Traveling/UseCase/AddFlight/AddFlightResponse';
import { FlightRepositoryInterface } from '@eco/domain/src/Traveling/UseCase/FlightRepositoryInterface';
import { PlaneTravel, Seat } from '@eco/core-travel/src/entity/PlaneTravel';


export class AddFlight {
  constructor(private repository: FlightRepositoryInterface) {
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
      const id = await this.repository.nextIdentity();
      const flight = new PlaneTravel(id, request.seat as Seat, parseFloat(request.km), request.description || '', new Date());
      await this.repository.add(flight);
      response.newFlight = flight;
    }

    presenter.presentAddFlight(response);
  }
}
