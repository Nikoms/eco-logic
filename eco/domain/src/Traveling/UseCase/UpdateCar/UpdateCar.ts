import { UpdateCarPresenterInterface } from '@eco/domain/src/Traveling/UseCase/UpdateCar/UpdateCarPresenterInterface';
import { UpdateCarResponse } from '@eco/domain/src/Traveling/UseCase/UpdateCar/UpdateCarResponse';
import { CarRepositoryInterface } from '@eco/domain/src/Traveling/UseCase/CarRepositoryInterface';
import { UpdateCarRequest } from '@eco/domain/src/Traveling/UseCase/UpdateCar/UpdateCarRequest';

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
