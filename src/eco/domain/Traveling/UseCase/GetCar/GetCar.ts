import { CarRepositoryInterface } from '../CarRepositoryInterface';
import { GetCarRequest } from './GetCarRequest';
import { GetCarResponse } from './GetCarResponse';
import { GetCarPresenterInterface } from './GetCarPresenterInterface';

export class GetCar {
  constructor(private repository: CarRepositoryInterface) {

  }

  async execute(request: GetCarRequest, presenter: GetCarPresenterInterface) {
    const response = new GetCarResponse();
    response.car = await this.repository.get(request.carId);
    presenter.presentGetCar(response);
  }
}
