import { Car } from '@eco/domain/src/Traveling/Entity/Car';

export interface CarRepositoryInterface {
  nextIdentity(): Promise<string>;

  add(car: Car): Promise<void>;

  getAll(): Promise<Car[]>;

  update(car: Car): Promise<void>;

  get(carId: string): Promise<Car | undefined>;
}
