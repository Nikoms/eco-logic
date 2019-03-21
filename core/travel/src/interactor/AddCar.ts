import { v4 } from 'uuid';
import { Car, Engine } from '../entity/Car';
import { CarRepository } from '../repository/CarRepository';

export class AddCar {
  public readonly car: Car;

  constructor(readonly name: string, readonly consumption: number, readonly engine: Engine, readonly km: number) {
    if (name.trim().length === 0) {
      throw new Error('Name is required');
    }
    if (!consumption) {
      throw new Error('consumption is required');
    }
    if (!engine) {
      throw new Error('Engine is required');
    }
    this.car = new Car(v4(), name, consumption, engine, new Date(), km);
  }
}

export class AddCarHandler {
  constructor(private store: CarRepository) {

  }

  async handle(request: AddCar) {
    await this.store.add(request.car);
    return request.car;
  }
}
