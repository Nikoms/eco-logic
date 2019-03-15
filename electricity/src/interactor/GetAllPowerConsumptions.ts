import { PowerConsumptionRepository } from '../repository/PowerConsumptionRepository';

export class GetAllPowerConsumptions {
  constructor() {
  }
}


export class GetAllPowerConsumptionsHandler {
  constructor(private powerConsumptionStore: PowerConsumptionRepository) {
  }

  handle() {
    return this.powerConsumptionStore.getAll();
  }
}
