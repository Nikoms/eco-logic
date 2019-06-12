import { v4 } from 'uuid';
import { Car, Engine } from '../entity/Car';
import { CarRepository } from '../repository/CarRepository';

export class AddCarRequest {
  public readonly car: Car;

  constructor(readonly id: string,
              readonly name: string,
              readonly consumption: number,
              readonly engine: string,
              readonly km: number,
              readonly lastKmDate: Date) {
    if (name.trim().length === 0) {
      throw new Error('Name is required');
    }
    if (!consumption) {
      throw new Error('consumption is required');
    }
    if (!engine) {
      throw new Error('Engine is required');
    }
    const _id = id || v4();
    this.car = new Car(_id, name, consumption, engine as Engine, lastKmDate, km);
  }
}

export class AddCar {
  constructor(private store: CarRepository) {

  }

  async execute(request: AddCarRequest) {
    await this.store.add(request.car);
    return request.car;
  }
}
