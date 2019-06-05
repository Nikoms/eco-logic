import { HomePresenterInterface } from '@eco/domain/src/Traveling/UseCase/Home/HomePresenterInterface';
import { api } from '@eco/domain/src/Temp/Api';
import { GetCarsResponse } from '@eco/domain/src/Traveling/UseCase/GetCars/GetCarsResponse';

export class GetCars {
  constructor(private presenter: HomePresenterInterface) {

  }

  async execute() {
    const response = new GetCarsResponse();
    response.cars = await api.getCars();
    this.presenter.presentGetCars(response);
  }
}
