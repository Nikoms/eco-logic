import { ElectricMeterRepository } from '../repository/ElectricMeterRepository';

export class GetElectricMeters {
  constructor() {
  }
}


export class GetElectricMetersHandler {
  constructor(private store: ElectricMeterRepository) {
  }

  handle() {
    return this.store.getAll();
  }
}
