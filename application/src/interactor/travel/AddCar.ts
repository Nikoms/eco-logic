import { CarRepository } from '@eco/domain/src/traveling/repository/CarRepository';
import { Car, Engine } from '@eco/domain/src/traveling/entity/Car';
import { v4 } from 'uuid';

export class AddCar {
  public readonly car: Car;

  constructor(readonly name: string, readonly consumption: number, readonly engine: Engine) {
    if (name.trim().length === 0) {
      throw new Error('Name is required');
    }
    if (!consumption) {
      throw new Error('consumption is required');
    }
    if (!engine) {
      throw new Error('Engine is required');
    }
    this.car = new Car(v4(), name, consumption, engine);
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
