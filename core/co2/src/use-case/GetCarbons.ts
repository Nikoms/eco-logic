import { CarbonRepository } from '../repository/CarbonRepository';

export class GetCarbons {
  constructor(private store: CarbonRepository) {
  }

  async execute() {
    return await this.store.getAll();
  }
}
