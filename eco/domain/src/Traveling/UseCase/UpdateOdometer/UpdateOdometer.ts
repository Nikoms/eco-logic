import { EventDispatcher } from '@eco/shared-kernel';
import { CarRepositoryInterface } from '../CarRepositoryInterface';
import { UpdateOdometerRequest } from './UpdateOdometerRequest';
import { UpdateOdometerResponse } from './UpdateOdometerResponse';
import { UpdateOdometerPresenterInterface } from './UpdateOdometerPresenterInterface';
import { OdometerUpdated } from '../../Event/OdometerUpdated';

export class UpdateOdometer {
  constructor(private cars: CarRepositoryInterface, private eventDispatcher: EventDispatcher) {
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
      response.isCarUnknown = true;
    }

    if (isNaN(parseFloat(request.km))) {
      hasError = true;
      response.isKmInvalid = true;
    }

    const car = await this.cars.get(request.carId);
    if (car === undefined) {
      hasError = true;
      response.isCarUnknown = true;
    }
    // TODO: Check km is lower

    if (!hasError) {
      car!.updateKm(parseFloat(request.km));
      response.updatedCar = car;
      const lastKm = car!.km;
      await this.cars.update(car!);
      const kmTraveled = car!.km - lastKm;
      this.eventDispatcher.emit(new OdometerUpdated(kmTraveled, car!, new Date()));
    }

    presenter.presentUpdateOdometer(response);
  }
}
