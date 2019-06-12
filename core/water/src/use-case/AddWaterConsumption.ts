import { WaterConsumption } from '../entity/WaterConsumption';
import { WaterConsumptionRepository } from '../repository/WaterConsumptionRepository';

export class AddWaterConsumptionRequest {
  public readonly waterConsumption: WaterConsumption;

  constructor(id: string, readonly m3: number, waterMeterId: string, date: Date) {
    if (!m3) {
      throw new Error('"m3" empty');
    }
    this.waterConsumption = new WaterConsumption(id, m3, waterMeterId, date);
  }
}


export class AddWaterConsumption {
  constructor(private waterConsumptionStore: WaterConsumptionRepository) {

  }

  async execute(request: AddWaterConsumptionRequest) {
    await this.waterConsumptionStore.add(request.waterConsumption);
    return request.waterConsumption;
  }
}
