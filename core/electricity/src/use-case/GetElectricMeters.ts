import { ElectricMeterRepository } from '../repository/ElectricMeterRepository';

export class GetElectricMetersRequest {
  constructor() {
  }
}


export class GetElectricMeters {
  constructor(private store: ElectricMeterRepository) {
  }

  execute() {
    return this.store.getAll();
  }
}
