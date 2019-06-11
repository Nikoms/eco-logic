import { HomePresenterInterface } from '@eco/domain/src/Traveling/UseCase/Home/HomePresenterInterface';
import { Api } from '@eco/domain/src/Temp/Api';

export class RefreshFlights {
  constructor(private api: Api) {

  }

  async execute(presenter: HomePresenterInterface) {
    const flights = await this.api.getPlaneTravels();
    presenter.setFlights(flights);
  }
}
