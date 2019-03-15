import { v4 } from 'uuid';
import { PowerConsumption } from '../entity/PowerConsumption';
import { ElectricMeter } from '../entity/ElectricMeter';
import { PowerConsumptionRepository } from '../repository/PowerConsumptionRepository';
import { CarbonRepository } from '@eco/co2/src/repository/CarbonRepository';
import { Carbon } from '@eco/co2/src/entity/Carbon';

export class AddPowerConsumption {
  public readonly powerConsumption: PowerConsumption;

  constructor(kWh: number, electricMeter: ElectricMeter) {
    if (!kWh) {
      throw new Error('"kWh" empty');
    }
    this.powerConsumption = new PowerConsumption(v4(), kWh, electricMeter.id, new Date());
  }
}


export class AddPowerConsumptionHandler {
  constructor(
    private powerConsumptionStore: PowerConsumptionRepository,
    private carbonStore: CarbonRepository) {
  }

  async handle(request: AddPowerConsumption) {
    await this.powerConsumptionStore.add(request.powerConsumption);

    const consumptionBefore = await this.powerConsumptionStore.getConsumptionBefore(request.powerConsumption.id);
    const kWhConsumed = consumptionBefore ? request.powerConsumption.kWh - consumptionBefore.kWh : 0;
    const carbonConsumed = new Carbon(v4(), kWhConsumed * 100, 'From power...', new Date());
    await this.carbonStore.add(carbonConsumed);

    return request.powerConsumption;
  }
}
