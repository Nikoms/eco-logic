import { UpdateOdometerPresenterInterface } from '@eco/domain/src/Traveling/UseCase/UpdateOdometer/UpdateOdometerPresenterInterface';
import { UpdateOdometerRequest } from '@eco/domain/src/Traveling/UseCase/UpdateOdometer/UpdateOdometerRequest';
import { UpdateOdometerResponse } from '@eco/domain/src/Traveling/UseCase/UpdateOdometer/UpdateOdometerResponse';
import { OdometerRepositoryInterface } from '@eco/domain/src/Traveling/UseCase/OdometerRepositoryInterface';
import { Odometer } from '@eco/core-travel/src/entity/Odometer';

export class UpdateOdometer {
  constructor(private repository: OdometerRepositoryInterface) {
  }

  async execute(request: UpdateOdometerRequest, presenter: UpdateOdometerPresenterInterface) {
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
      const id = await this.repository.nextIdentity();
      const odometer = new Odometer(id, request.carId, parseFloat(request.km), new Date());
      await this.repository.add(odometer);
      response.updatedOdometer = odometer;
    }

    presenter.presentUpdateOdometer(response);
  }
}
