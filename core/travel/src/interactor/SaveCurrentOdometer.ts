import { v4 } from 'uuid';
import { OdometerRepository } from '../repository/OdometerRepository';
import { Car } from '../entity/Car';
import { Odometer } from '../entity/Odometer';
import { EventDispatcher } from '@eco/core-shared-kernel/src/event/EventDispatcher';
import { OdometerUpdated } from '../event/OdometerUpdated';
import { CarRepository } from '../repository/CarRepository';

export class SaveCurrentOdometer {
  public readonly odometer: Odometer;

  constructor(km: number, car: Car) {
    this.odometer = new Odometer(v4(), car.id, km, new Date());
  }
}

export class SaveCurrentOdometerHandler {
  constructor(private odometers: OdometerRepository, private cars: CarRepository, private eventDispatcher: EventDispatcher) {

  }

  async handle(request: SaveCurrentOdometer) {
    const car = await this.cars.getCar(request.odometer.carId);
    if (car === undefined) {
      throw new Error('Unknown car');
    }
    const last = await this.odometers.getLast(request.odometer.carId);
    const lastKm = last && last.km || 0;
    if (lastKm > request.odometer.km) {
      throw new Error('You can not set a lower km. The last one was: ' + lastKm);
    }
    await this.odometers.add(request.odometer);
    const kmTraveled = request.odometer.km - lastKm;
    this.eventDispatcher.emit(new OdometerUpdated(request.odometer.id, kmTraveled, car, request.odometer.date));
    return request.odometer;
  }
}
