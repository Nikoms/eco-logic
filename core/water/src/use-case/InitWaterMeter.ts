import { WaterMeterRepository } from '../repository/WaterMeterRepository';
import { WaterMeter } from '../entity/WaterMeter';

export class InitWaterMeterRequest {
  constructor(public readonly id: string, public readonly name: string) {
  }
}


export class InitWaterMeter {
  constructor(private store: WaterMeterRepository) {
  }

  async execute(request: InitWaterMeterRequest) {
    const waterMeter = new WaterMeter(request.id, request.name);
    await this.store.add(waterMeter);
  }
}
