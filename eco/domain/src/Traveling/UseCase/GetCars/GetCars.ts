import { GetCarsResponse } from '@eco/domain/src/Traveling/UseCase/GetCars/GetCarsResponse';
import { CarRepositoryInterface } from '@eco/domain/src/Traveling/UseCase/CarRepositoryInterface';
import { GetCarsPresenterInterface } from '@eco/domain/src/Traveling/UseCase/GetCars/GetCarsPresenterInterface';

export class GetCars {
  constructor(private repository: CarRepositoryInterface) {

  }

  async execute(presenter: GetCarsPresenterInterface) {
    const response = new GetCarsResponse();
    response.cars = await this.repository.getAll();
    presenter.presentGetCars(response);
  }
}
