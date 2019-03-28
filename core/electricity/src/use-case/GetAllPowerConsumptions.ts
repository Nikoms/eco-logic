import { PowerConsumptionRepository } from '../repository/PowerConsumptionRepository';

export class GetAllPowerConsumptions {
  constructor(private powerConsumptionStore: PowerConsumptionRepository) {
  }

  execute() {
    return this.powerConsumptionStore.getAll();
  }
}
