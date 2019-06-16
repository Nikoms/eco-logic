import { AddFlightRequest } from '@eco/domain/src/Traveling/UseCase/AddFlight/AddFlightRequest';
import { AddFlightPresenterInterface } from '@eco/domain/src/Traveling/UseCase/AddFlight/AddFlightPresenterInterface';
import { AddFlightResponse } from '@eco/domain/src/Traveling/UseCase/AddFlight/AddFlightResponse';
import { FlightRepositoryInterface } from '@eco/domain/src/Traveling/UseCase/FlightRepositoryInterface';
import { EventDispatcher } from '@eco/core-shared-kernel/src/event/EventDispatcher';
import { PlaneTravel, Seat } from '@eco/domain/src/Traveling/Entity/PlaneTravel';
import { PlaneTravelAdded } from '@eco/domain/src/Traveling/Event/PlaneTravelAdded';

export class AddFlight {
  constructor(private repository: FlightRepositoryInterface, private eventDispatcher: EventDispatcher) {
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
      const id = request.id || await this.repository.nextIdentity();
      const date = request.date || new Date();
      const flight = new PlaneTravel(id, request.seat as Seat, parseFloat(request.km), request.description || '', date);
      await this.repository.add(flight);
      response.newFlight = flight;

      this.eventDispatcher.emit(new PlaneTravelAdded(flight));
    }

    presenter.presentAddFlight(response);
  }
}
