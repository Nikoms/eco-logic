import { v4 } from 'uuid';
import { WaterMeterRepository } from '../repository/WaterMeterRepository';
import { WaterMeter } from '../entity/WaterMeter';

export class InitWaterMeterRequest {
  constructor(public readonly hasHotMeter: boolean) {
  }
}


export class InitWaterMeter {
  constructor(private store: WaterMeterRepository) {
  }

  async execute(request: InitWaterMeterRequest) {
    if (request.hasHotMeter) {
      await this.store.add(new WaterMeter(v4(), 'Cold meter'));
      await this.store.add(new WaterMeter(v4(), 'Hot meter'));
    } else {
      await this.store.add(new WaterMeter(v4(), 'Water meter'));
    }
  }
}
