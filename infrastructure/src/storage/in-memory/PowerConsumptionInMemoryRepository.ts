import { PowerConsumption } from '@eco/domain/src/electricity/entity/PowerConsumption';
import { PowerConsumptionRepository } from '@eco/domain/src/electricity/repository/PowerConsumptionRepository';

export class PowerConsumptionInMemoryRepository implements PowerConsumptionRepository {
  private consumptions: PowerConsumption[] = [];

  async add(powerConsumption: PowerConsumption) {
    this.consumptions.push(powerConsumption);
  }

  async getAll() {
    // slice, to be sure to return a COPY of the array (to now be able to push/pop)
    return this.consumptions.slice();
  }
}
