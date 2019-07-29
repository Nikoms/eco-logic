import { FlightRepositoryInterface } from '../FlightRepositoryInterface';
import { AddFlightPresenterInterface } from './AddFlightPresenterInterface';
import { AddFlightRequest } from './AddFlightRequest';
import { AddFlightResponse } from './AddFlightResponse';
import { EventDispatcher } from '@eco/shared-kernel';
import { PlaneTravel, Seat } from '../../Entity/PlaneTravel';
import { PlaneTravelAdded } from '../../Event/PlaneTravelAdded';

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
