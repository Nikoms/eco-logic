import { v4 } from 'uuid';
import { WaterMeterRepository } from '../repository/WaterMeterRepository';
import { WaterMeter } from '../entity/WaterMeter';

export class InitWaterMeter {
  constructor(public readonly hasHotMeter: boolean) {
  }
}


export class InitWaterMeterHandler {
  constructor(private store: WaterMeterRepository) {
  }

  async handle(request: InitWaterMeter) {
    if (request.hasHotMeter) {
      await this.store.add(new WaterMeter(v4(), 'Cold meter'));
      await this.store.add(new WaterMeter(v4(), 'Hot meter'));
    } else {
      await this.store.add(new WaterMeter(v4(), 'Water meter'));
    }
  }
}
