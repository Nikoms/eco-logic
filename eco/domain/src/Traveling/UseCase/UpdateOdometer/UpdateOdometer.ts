import { UpdateOdometerPresenterInterface } from '@eco/domain/src/Traveling/UseCase/UpdateOdometer/UpdateOdometerPresenterInterface';
import { api } from '@eco/domain/src/Temp/Api';
import { UpdateOdometerRequest } from '@eco/domain/src/Traveling/UseCase/UpdateOdometer/UpdateOdometerRequest';
import { UpdateOdometerResponse } from '@eco/domain/src/Traveling/UseCase/UpdateOdometer/UpdateOdometerResponse';

export class UpdateOdometer {
  constructor(private presenter: UpdateOdometerPresenterInterface) {
  }

  async execute(request: UpdateOdometerRequest) {
    const response = new UpdateOdometerResponse();
    let hasError = false;
    if (request.km.trim().length === 0) {
      hasError = true;
      response.isKmEmpty = true;
    }
    if (request.carId.trim().length === 0) {
      hasError = true;
      response.isCarEmpty = true;
    }
    if (isNaN(parseFloat(request.km))) {
      hasError = true;
      response.isKmInvalid = true;
    }
    if (!hasError) {
      response.updatedOdometer = await api.updateOdometer(request.carId, parseFloat(request.km));
    }

    this.presenter.presentUpdateOdometer(response);
  }
}
