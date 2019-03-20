import { Car } from '../entity/Car';

export interface CarRepository {
  add(car: Car): Promise<void>;

  getAll(): Promise<Car[]>;
}
