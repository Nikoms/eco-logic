import { FlightRepositoryInterface } from '@eco/domain/src/Traveling/UseCase/FlightRepositoryInterface';
import { GetFlightsPresenterInterface } from '@eco/domain/src/Traveling/UseCase/GetFlights/GetFlightsPresenterInterface';
import { GetFlightsResponse } from '@eco/domain/src/Traveling/UseCase/GetFlights/GetFlightsResponse';

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
