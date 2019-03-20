import { TravelRepository } from '../repository/TravelRepository';

export class GetTravels {
  constructor() {
  }
}

export class GetTravelsHandler {
  constructor(private store: TravelRepository) {
  }

  handle() {
    return this.store.getAll();
  }
}
