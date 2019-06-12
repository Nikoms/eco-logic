import { HomePresenterInterface } from '@eco/domain/src/Traveling/UseCase/Home/HomePresenterInterface';
import { GetCarsResponse } from '@eco/domain/src/Traveling/UseCase/GetCars/GetCarsResponse';
import { CarRepositoryInterface } from '@eco/domain/src/Traveling/UseCase/CarRepositoryInterface';

export class GetCars {
  constructor(private repository: CarRepositoryInterface) {

  }

  async execute(presenter: HomePresenterInterface) {
    const response = new GetCarsResponse();
    response.cars = await this.repository.getAll();
    presenter.presentGetCars(response);
  }
}
