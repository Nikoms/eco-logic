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
    const meters: ElectricMeter[] = [];
    if (request.hasNightMeter) {
      meters.push(new ElectricMeter(v4(), 'Day meter', 0, new Date()));
      meters.push(new ElectricMeter(v4(), 'Night meter', 0, new Date()));
    } else {
      meters.push(new ElectricMeter(v4(), 'Electric meter', 0, new Date()));
    }

    for (const meter of meters) {
      await this.store.add(meter);
    }

    return meters;
  }
}
