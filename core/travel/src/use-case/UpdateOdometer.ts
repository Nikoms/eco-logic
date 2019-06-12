import { v4 } from 'uuid';
import { OdometerRepository } from '../repository/OdometerRepository';
import { Odometer } from '../entity/Odometer';
import { EventDispatcher } from '@eco/core-shared-kernel/src/event/EventDispatcher';
import { OdometerUpdated } from '../event/OdometerUpdated';
import { CarRepository } from '../repository/CarRepository';
import { DateRange } from '@eco/core-shared-kernel/src/model/DateRange';

export class UpdateOdometerRequest {
  public readonly odometer: Odometer;

  constructor(id: string, carId: string, km: number, date: Date) {
    this.odometer = new Odometer(id || v4(), carId, km, date);
  }
}

export class UpdateOdometer {
  constructor(private odometers: OdometerRepository, private cars: CarRepository, private eventDispatcher: EventDispatcher) {

  }

  async execute(request: UpdateOdometerRequest) {
    const car = await this.cars.getCar(request.odometer.carId);
    if (car === undefined) {
      throw new Error('Unknown car');
    }
    const lastKm = car.km;
    const lastDate = car.lastKmUpdate;
    car.updateKm(request.odometer.km);
    await this.odometers.add(request.odometer);
    await this.cars.update(car);
    const kmTraveled = car.km - lastKm;
    const periodOfTime = new DateRange(lastDate, car.lastKmUpdate);
    this.eventDispatcher.emit(new OdometerUpdated(request.odometer.id, kmTraveled, periodOfTime, car, request.odometer.date));
    return request.odometer;
  }
}
