import { v4 } from 'uuid';
import { Car, CarRepositoryInterface } from '../../../eco/domain';
import { TravelingApi } from './TravelingApi';

export class CarFakeApiRepository implements CarRepositoryInterface {
  constructor(private api: TravelingApi) {
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

  get(carId: string): Promise<Car | undefined> {
    return this.api.getCar(carId);
  }

  update(car: Car): Promise<void> {
    return this.api.updateCar(car);
  }
}
