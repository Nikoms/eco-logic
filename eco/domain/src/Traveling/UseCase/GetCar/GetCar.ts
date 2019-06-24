import { CarRepositoryInterface } from '@eco/domain/src/Traveling/UseCase/CarRepositoryInterface';
import { GetCarRequest } from '@eco/domain/src/Traveling/UseCase/GetCar/GetCarRequest';
import { GetCarResponse } from '@eco/domain/src/Traveling/UseCase/GetCar/GetCarResponse';
import { GetCarPresenterInterface } from '@eco/domain/src/Traveling/UseCase/GetCar/GetCarPresenterInterface';

export class GetCar {
  constructor(private repository: CarRepositoryInterface) {

  }

  async execute(request: GetCarRequest, presenter: GetCarPresenterInterface) {
    const response = new GetCarResponse();
    response.car = await this.repository.get(request.carId);
    presenter.presentGetCar(response);
  }
}
