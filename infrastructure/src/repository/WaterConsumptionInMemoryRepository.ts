import { WaterConsumptionRepository } from '../../../domain/src/water/repository/WaterConsumptionRepository';
import { WaterConsumption } from '../../../domain/src/water/entity/WaterConsumption';

export class WaterConsumptionInMemoryRepository implements WaterConsumptionRepository {
  private consumptions: WaterConsumption[] = [];

  async add(powerConsumption: WaterConsumption) {
    this.consumptions.push(powerConsumption);
  }

  async getAll() {
    // slice, to be sure to return a COPY of the array (to now be able to push/pop)
    return this.consumptions.slice();
  }
}
