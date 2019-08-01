import { CarRepositoryInterface } from '../CarRepositoryInterface';
import { AddCarRequest } from './AddCarRequest';
import { AddCarResponse } from './AddCarResponse';
import { AddCarPresenterInterface } from './AddCarPresenterInterface';
import { Car, Engine } from '../../Entity/Car';

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
      const id = request.id || await this.repository.nextIdentity();
      const date = request.date || new Date();
      const car = new Car(id, request.name, parseFloat(request.consumption), request.engine as Engine, date, parseFloat(request.km));
      await this.repository.add(car);
      response.newCar = car;
    }

    presenter.presentAddCar(response);
  }
}
