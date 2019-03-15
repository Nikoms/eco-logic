import { WaterConsumptionRepository } from '../repository/WaterConsumptionRepository';

export class GetAllWaterConsumptions {
  constructor() {
  }
}


export class GetAllWaterConsumptionsHandler {
  constructor(private waterConsumptionStore: WaterConsumptionRepository) {
  }

  handle() {
    return this.waterConsumptionStore.getAll();
  }
}
