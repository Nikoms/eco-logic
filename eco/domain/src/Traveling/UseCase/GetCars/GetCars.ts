import { CarRepositoryInterface } from '../CarRepositoryInterface';
import { GetCarsPresenterInterface } from './GetCarsPresenterInterface';
import { GetCarsResponse } from './GetCarsResponse';

export class GetCars {
  constructor(private repository: CarRepositoryInterface) {

  }

  async execute(presenter: GetCarsPresenterInterface) {
    const response = new GetCarsResponse();
    response.cars = await this.repository.getAll();
    presenter.presentGetCars(response);
  }
}
