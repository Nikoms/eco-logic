import { PowerConsumption } from '../entity/PowerConsumption';

export class PowerConsumptionStore {
  private consumptions: PowerConsumption[] = [];

  add(powerConsumption: PowerConsumption) {
    this.consumptions.push(powerConsumption);
  }

  getAll() {
    return this.consumptions.slice();
  }
}
