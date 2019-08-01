import { FlightRepositoryInterface } from '../FlightRepositoryInterface';
import { GetFlightsPresenterInterface } from './GetFlightsPresenterInterface';
import { GetFlightsResponse } from './GetFlightsResponse';

export class GetFlights {
  constructor(private repository: FlightRepositoryInterface) {
  }

  async execute(presenter: GetFlightsPresenterInterface) {
    const flights = await this.repository.getAll();
    const response = new GetFlightsResponse();
    response.flights = flights;
    presenter.presentGetFlights(response);
  }
}
