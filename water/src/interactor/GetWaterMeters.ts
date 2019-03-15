import { WaterMeterRepository } from '../repository/WaterMeterRepository';

export class GetWaterMeters {
  constructor() {
  }
}


export class GetWaterMetersHandler {
  constructor(private store: WaterMeterRepository) {
  }

  handle() {
    return this.store.getAll();
  }
}
