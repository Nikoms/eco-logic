import { WaterConsumptionRepository } from '../repository/WaterConsumptionRepository';

export class GetAllWaterConsumptions {
  constructor(private waterConsumptionStore: WaterConsumptionRepository) {
  }

  execute() {
    return this.waterConsumptionStore.getAll();
  }
}
