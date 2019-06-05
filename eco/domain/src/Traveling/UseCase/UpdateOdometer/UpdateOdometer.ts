import { UpdateOdometerPresenterInterface } from '@eco/domain/src/Traveling/UseCase/UpdateOdometer/UpdateOdometerPresenterInterface';
import { api } from '@eco/domain/src/Temp/Api';
import { UpdateOdometerRequest } from '@eco/domain/src/Traveling/UseCase/UpdateOdometer/UpdateOdometerRequest';

export class UpdateOdometer {
  constructor(private presenter: UpdateOdometerPresenterInterface) {
  }

  async execute(request: UpdateOdometerRequest) {
    let hasError = false;
    if (request.km.trim().length === 0) {
      hasError = true;
      this.presenter.kmIsEmpty();
    }
    if (request.carId.trim().length === 0) {
      hasError = true;
      this.presenter.carNotSelected();
    }
    if (isNaN(parseFloat(request.km))) {
      hasError = true;
      this.presenter.kmIsNaN();
    }
    if (hasError) {
      return;
    }
    const odometer = await api.updateOdometer(request.carId, parseFloat(request.km));
    this.presenter.updatedOdometer(odometer);
  }
}
