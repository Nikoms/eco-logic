import { CarRepositoryInterface } from '@eco/domain/src/Traveling/UseCase/CarRepositoryInterface';
import { v4 } from 'uuid';
import { CarLocalStorageRepository2 } from '@eco/infrastructure/src/local-storage/CarLocalStorageRepository2';
import { Car } from '@eco/domain/src/Traveling/Entity/Car';
import { TravelingApi } from '@eco/frontend-infrastructure/src/Traveling/TravelingApi';

export class CarFakeApiRepository implements CarRepositoryInterface {
  constructor(private api: TravelingApi, private enAttendant: CarLocalStorageRepository2) {
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
    return this.enAttendant.update(car); // TODO: Create a use case
  }
}
