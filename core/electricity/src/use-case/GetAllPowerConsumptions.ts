import { PowerConsumptionRepository } from '../repository/PowerConsumptionRepository';

export class GetAllPowerConsumptionsRequest {
  constructor() {
  }
}


export class GetAllPowerConsumptions {
  constructor(private powerConsumptionStore: PowerConsumptionRepository) {
  }

  execute() {
    return this.powerConsumptionStore.getAll();
  }
}
