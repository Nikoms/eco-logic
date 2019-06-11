import { ElectricMeterRepository } from '../repository/ElectricMeterRepository';
import { ElectricMeter } from '../entity/ElectricMeter';

export class InitElectricMeterRequest {
  constructor(public meter: ElectricMeter) {
  }
}


export class InitElectricMeter {
  constructor(private store: ElectricMeterRepository) {
  }

  async execute(request: InitElectricMeterRequest) {
    await this.store.add(request.meter);

    return request.meter;
  }
}
