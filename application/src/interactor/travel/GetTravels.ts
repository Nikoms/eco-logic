import { TravelRepository } from '@eco/domain/src/traveling/repository/TravelRepository';

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
