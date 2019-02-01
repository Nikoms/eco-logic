import { WaterMeterRepository } from '@eco/domain/src/water/repository/WaterMeterRepository';
import { WaterMeter } from '@eco/domain/src/water/entity/WaterMeter';
import { v4 } from 'uuid';

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
