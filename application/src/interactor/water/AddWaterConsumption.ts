import { WaterConsumptionRepository } from '@eco/domain/src/water/repository/WaterConsumptionRepository';
import { WaterConsumption } from '@eco/domain/src/water/entity/WaterConsumption';
import { v4 } from 'uuid';
import { WaterMeter } from "@eco/domain/src/water/entity/WaterMeter";

export class AddWaterConsumption {
  public readonly waterConsumption: WaterConsumption;

  constructor(readonly m3: number, waterMeter: WaterMeter) {
    if (!m3) {
      throw new Error('"m3" empty');
    }
    this.waterConsumption = new WaterConsumption(v4(), m3, waterMeter.id, new Date());
  }
}


export class AddWaterConsumptionHandler {
  constructor(private waterConsumptionStore: WaterConsumptionRepository) {

  }

  async handle(request: AddWaterConsumption) {
    await this.waterConsumptionStore.add(request.waterConsumption);
    return request.waterConsumption;
  }
}
