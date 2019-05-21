import { AddCarRequest } from '@/domain/Traveling/UseCase/AddCar/AddCarRequest';
import { api } from '../../../../../../api/frontend/src/Api';
import { AddCarPresenterInterface } from '@/domain/Traveling/UseCase/AddCar/AddCarPresenterInterface';

export class AddCar {

  constructor(private presenter: AddCarPresenterInterface) {

  }

  async execute(request: AddCarRequest) {
    let hasError = false;
    if (request.name.trim().length === 0) {
      hasError = true;
      this.presenter.nameIsEmpty();
    }
    if (isNaN(parseFloat(request.consumption)) || parseFloat(request.consumption) < 0) {
      hasError = true;
      this.presenter.consumptionInvalid();
    }
    if (isNaN(parseFloat(request.km))) {
      hasError = true;
      this.presenter.kmIsNaN();
    }
    if (request.engine === '') {
      hasError = true;
      this.presenter.engineInvalid();
    }

    if (hasError) {
      return;
    }

    const car = await api.addCar(request.name, parseFloat(request.consumption), request.engine, parseFloat(request.km));

    this.presenter.addedCar(car);
  }
}
