import { CarRepository } from '../repository/CarRepository';

export class GetCars {
  constructor() {
  }
}

export class GetCarsHandler {
  constructor(private cars: CarRepository) {
  }

  handle() {
    return this.cars.getAll();
  }
}
