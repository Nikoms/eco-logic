import { ElectricMeterRepository } from '../repository/ElectricMeterRepository';

export class GetElectricMeters {
  constructor(private store: ElectricMeterRepository) {
  }

  execute() {
    return this.store.getAll();
  }
}
