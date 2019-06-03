import { v4 } from 'uuid';
import { WaterMeterRepository } from '../repository/WaterMeterRepository';
import { WaterMeter } from '../entity/WaterMeter';

export class InitWaterMeterRequest {
  constructor(public readonly hasHotAndColdMeter: boolean) {
  }
}


export class InitWaterMeter {
  constructor(private store: WaterMeterRepository) {
  }

  async execute(request: InitWaterMeterRequest) {
    const waterMeters: WaterMeter[] = [];
    if (request.hasHotAndColdMeter) {
      waterMeters.push(new WaterMeter(v4(), 'Cold meter'));
      waterMeters.push(new WaterMeter(v4(), 'Hot meter'));
    } else {
      waterMeters.push(new WaterMeter(v4(), 'Water meter'));
    }
    for (const waterMeter of waterMeters) {
      await this.store.add(waterMeter);
    }
    return waterMeters;
  }
}
