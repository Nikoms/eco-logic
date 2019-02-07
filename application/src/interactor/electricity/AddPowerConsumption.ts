import { PowerConsumptionRepository } from '@eco/domain/src/electricity/repository/PowerConsumptionRepository';
import { PowerConsumption } from '@eco/domain/src/electricity/entity/PowerConsumption';
import { v4 } from 'uuid';
import { ElectricMeter } from '@eco/domain/src/electricity/entity/ElectricMeter';
import { Carbon } from '@eco/domain/src/co2/entity/Carbon';
import { CarbonRepository } from '@eco/domain/src/co2/repository/CarbonRepository';

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
