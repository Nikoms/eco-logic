import { HomePresenterInterface } from '@eco/domain/src/Traveling/UseCase/Home/HomePresenterInterface';
import { Api } from '@eco/domain/src/Temp/Api';
import { GetCarsResponse } from '@eco/domain/src/Traveling/UseCase/GetCars/GetCarsResponse';

export class GetCars {
  constructor(private api: Api) {

  }

  async execute(presenter: HomePresenterInterface) {
    const response = new GetCarsResponse();
    response.cars = await this.api.getCars();
    presenter.presentGetCars(response);
  }
}
