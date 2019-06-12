import { Car } from '@eco/core-travel/src/entity/Car';

export interface CarRepositoryInterface {
  nextIdentity(): Promise<string>;

  add(car: Car): Promise<void>;

  getAll(): Promise<Car[]>;
}
