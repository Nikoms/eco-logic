import { AddCarRequest } from '@eco/domain/src/Traveling/UseCase/AddCar/AddCarRequest';
import { AddCarPresenterInterface } from '@eco/domain/src/Traveling/UseCase/AddCar/AddCarPresenterInterface';
import { AddCarResponse } from '@eco/domain/src/Traveling/UseCase/AddCar/AddCarResponse';
import { CarRepositoryInterface } from '@eco/domain/src/Traveling/UseCase/CarRepositoryInterface';
import { Car, Engine } from '@eco/core-travel/src/entity/Car';

export class AddCar {

  constructor(private repository: CarRepositoryInterface) {

  }

  async execute(request: AddCarRequest, presenter: AddCarPresenterInterface) {
    const response = new AddCarResponse();
    let hasError = false;
    if (request.name.trim().length === 0) {
      hasError = true;
      response.isNameEmpty = true;
    }
    if (isNaN(parseFloat(request.consumption)) || parseFloat(request.consumption) < 0) {
      hasError = true;
      response.isConsumptionInvalid = true;
    }
    if (isNaN(parseFloat(request.km))) {
      hasError = true;
      response.isKmInvalid = true;
    }
    if (request.engine === '') {
      hasError = true;
      response.isEngineInvalid = true;
    }

    if (!hasError) {
      const id = await this.repository.nextIdentity();
      const car = new Car(id, request.name, parseFloat(request.consumption), request.engine as Engine, new Date(), parseFloat(request.km));
      await this.repository.add(car);
      response.newCar = car;
    }

    presenter.presentAddCar(response);
  }
}
