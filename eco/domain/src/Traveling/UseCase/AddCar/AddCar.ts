import { AddCarRequest } from '@eco/domain/src/Traveling/UseCase/AddCar/AddCarRequest';
import { api } from '@eco/domain/src/Temp/Api';
import { AddCarPresenterInterface } from '@eco/domain/src/Traveling/UseCase/AddCar/AddCarPresenterInterface';
import { AddCarResponse } from '@eco/domain/src/Traveling/UseCase/AddCar/AddCarResponse';

export class AddCar {

  constructor(private presenter: AddCarPresenterInterface) {

  }

  async execute(request: AddCarRequest) {
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
      const car = await api.addCar(request.name, parseFloat(request.consumption), request.engine, parseFloat(request.km));

      response.newCar = car;
    }

    this.presenter.presentAddCar(response);
  }
}
