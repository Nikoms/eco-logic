import { WaterMeterRepository } from '../repository/WaterMeterRepository';

export class GetWaterMeters {
  constructor(private store: WaterMeterRepository) {
  }

  execute() {
    return this.store.getAll();
  }
}
