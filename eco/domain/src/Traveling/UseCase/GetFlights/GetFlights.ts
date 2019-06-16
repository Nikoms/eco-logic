import { FlightRepositoryInterface } from '@eco/domain/src/Traveling/UseCase/FlightRepositoryInterface';
import { GetFlightsPresenterInterface } from '@eco/domain/src/Traveling/UseCase/GetFlights/GetFlightsPresenterInterface';

export class GetFlights {
  constructor(private repository: FlightRepositoryInterface) {
  }

  async execute(presenter: GetFlightsPresenterInterface) {
    const flights = await this.repository.getAll();
    presenter.presentGetFlights(flights);
  }
}
