import { v4 } from 'uuid';
import { Odometer } from '@eco/domain/src/traveling/entity/Odometer';
import { OdometerRepository } from '@eco/domain/src/traveling/repository/OdoMeterRepository';
import { Car } from '@eco/domain/src/traveling/entity/Car';

export class SaveCurrentOdometer {
  public readonly odometer: Odometer;

  constructor(km: number, car: Car) {
    if (!km) {
      throw new Error('km is required');
    }

    this.odometer = new Odometer(v4(), car.id, km, new Date());
  }
}

export class SaveCurrentOdometerHandler {
  constructor(private store: OdometerRepository) {

  }

  async handle(request: SaveCurrentOdometer) {
    const last = await this.store.getLast(request.odometer.carId);
    if (last && last.km > request.odometer.km) {
      throw new Error('You can not set a lower km. The last one was: ' + last.km);
    }
    await this.store.add(request.odometer);
    return request.odometer;
  }
}
