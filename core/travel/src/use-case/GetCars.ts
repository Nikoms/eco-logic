import { CarRepository } from '../repository/CarRepository';

export class GetCars {
  constructor(private cars: CarRepository) {
  }

  execute() {
    return this.cars.getAll();
  }
}
