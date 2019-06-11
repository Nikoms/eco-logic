import { AddCarRequest } from '@eco/domain/src/Traveling/UseCase/AddCar/AddCarRequest';
import { Api } from '@eco/domain/src/Temp/Api';
import { AddCarPresenterInterface } from '@eco/domain/src/Traveling/UseCase/AddCar/AddCarPresenterInterface';
import { AddCarResponse } from '@eco/domain/src/Traveling/UseCase/AddCar/AddCarResponse';

export class AddCar {

  constructor(private api: Api) {

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
      response.newCar = await this.api.addCar(request.name, parseFloat(request.consumption), request.engine, parseFloat(request.km));
    }

    presenter.presentAddCar(response);
  }
}
