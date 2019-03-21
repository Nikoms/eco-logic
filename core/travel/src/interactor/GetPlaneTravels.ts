import { TravelRepository } from '../repository/TravelRepository';

export class GetPlaneTravels {
  constructor() {
  }
}

export class GetPlaneTravelsHandler {
  constructor(private store: TravelRepository) {
  }

  handle() {
    return this.store.getAll();
  }
}
