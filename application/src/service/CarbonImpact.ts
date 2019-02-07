import { PowerConsumptionRepository } from '@eco/domain/src/electricity/repository/PowerConsumptionRepository';
import { PowerConsumption } from '@eco/domain/src/electricity/entity/PowerConsumption';
import { AddCarbon } from '../interactor/co2/AddCarbon';

export class CarbonImpact {
  constructor(private powerStore: PowerConsumptionRepository) {
  }

  async fromPowerConsumption(power: PowerConsumption) {
    const consumptionBefore = await this.powerStore.getConsumptionBefore(power.id);
    const kWhConsumed = consumptionBefore ? power.kWh - consumptionBefore.kWh : 0;
    return AddCarbon.fromPower(kWhConsumed);
  }
}
