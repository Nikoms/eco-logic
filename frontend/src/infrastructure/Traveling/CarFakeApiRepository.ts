import { Car } from '@eco/core-travel/src/entity/Car';
import { CarRepositoryInterface } from '@eco/domain/src/Traveling/UseCase/CarRepositoryInterface';
import { Api } from '@/infrastructure/Api';
import { v4 } from 'uuid';

export class CarFakeApiRepository implements CarRepositoryInterface {
  constructor(private api: Api) {

  }

  async add(car: Car): Promise<void> {
    await this.api.addCar(car);
  }

  getAll(): Promise<Car[]> {
    return this.api.getCars();
  }

  async nextIdentity(): Promise<string> {
    return v4();
  }
}
