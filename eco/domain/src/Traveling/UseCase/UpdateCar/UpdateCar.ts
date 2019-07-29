import { CarRepositoryInterface } from '../CarRepositoryInterface';
import { UpdateCarRequest } from './UpdateCarRequest';
import { UpdateCarResponse } from './UpdateCarResponse';
import { UpdateCarPresenterInterface } from './UpdateCarPresenterInterface';

export class UpdateCar {
  constructor(private repository: CarRepositoryInterface) {

  }

  async execute(request: UpdateCarRequest, presenter: UpdateCarPresenterInterface) {
    const response = new UpdateCarResponse();
    await this.repository.update(request.car);
    response.updatedCar = request.car;

    presenter.presentUpdateCar(response);
  }
}
