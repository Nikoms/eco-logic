import { TravelRepository } from '../repository/TravelRepository';

export class GetPlaneTravels {
  constructor(private store: TravelRepository) {
  }

  execute() {
    return this.store.getAll();
  }
}
