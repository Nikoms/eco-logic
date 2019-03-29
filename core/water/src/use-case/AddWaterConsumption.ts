import { v4 } from 'uuid';
import { WaterConsumption } from '../entity/WaterConsumption';
import { WaterConsumptionRepository } from '../repository/WaterConsumptionRepository';

export class AddWaterConsumptionRequest {
  public readonly waterConsumption: WaterConsumption;

  constructor(readonly m3: number, waterMeterId: string) {
    if (!m3) {
      throw new Error('"m3" empty');
    }
    this.waterConsumption = new WaterConsumption(v4(), m3, waterMeterId, new Date());
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
