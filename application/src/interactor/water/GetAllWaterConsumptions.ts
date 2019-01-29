import { WaterConsumptionRepository } from '@eco/domain/src/water/repository/WaterConsumptionRepository';

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
