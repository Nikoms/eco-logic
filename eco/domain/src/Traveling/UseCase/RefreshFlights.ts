import { HomePresenterInterface } from '@eco/domain/src/Traveling/UseCase/Home/HomePresenterInterface';
import { FlightRepositoryInterface } from '@eco/domain/src/Traveling/UseCase/FlightRepositoryInterface';

export class RefreshFlights {
  constructor(private repository: FlightRepositoryInterface) {

  }

  async execute(presenter: HomePresenterInterface) {
    const flights = await this.repository.getAll();
    presenter.setFlights(flights);
  }
}
