import { HomePresenterInterface } from '@eco/domain/src/Traveling/UseCase/Home/HomePresenterInterface';
import { api } from '@eco/domain/src/Temp/Api';

export class RefreshFlights {
  constructor(private presenter: HomePresenterInterface) {

  }

  async execute() {
    const flights = await api.getPlaneTravels();
    this.presenter.setFlights(flights);
  }
}
