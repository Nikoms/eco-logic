import { v4 } from 'uuid';
import { ElectricMeterRepository } from '../repository/ElectricMeterRepository';
import { ElectricMeter } from '../entity/ElectricMeter';

export class InitElectricMeterRequest {
  constructor(public readonly hasNightMeter: boolean) {
  }
}


export class InitElectricMeter {
  constructor(private store: ElectricMeterRepository) {
  }

  async execute(request: InitElectricMeterRequest) {
    if (request.hasNightMeter) {
      await this.store.add(new ElectricMeter(v4(), 'Day meter', 0, new Date()));
      await this.store.add(new ElectricMeter(v4(), 'Night meter', 0, new Date()));
    } else {
      await this.store.add(new ElectricMeter(v4(), 'Electric meter', 0, new Date()));
    }
  }
}
