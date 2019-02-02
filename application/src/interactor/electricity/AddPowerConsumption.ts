import { PowerConsumptionRepository } from '@eco/domain/src/electricity/repository/PowerConsumptionRepository';
import { PowerConsumption } from '@eco/domain/src/electricity/entity/PowerConsumption';
import { v4 } from 'uuid';
import { ElectricMeter } from '@eco/domain/src/electricity/entity/ElectricMeter';
import { EventDispatcher } from '../../event/EventDispatcher';

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
  constructor(private powerConsumptionStore: PowerConsumptionRepository, private eventDispatcher: EventDispatcher) {

  }

  async handle(request: AddPowerConsumption) {
    await this.powerConsumptionStore.add(request.powerConsumption);
    this.eventDispatcher.emit('consumptionAdded', request.powerConsumption);
    return request.powerConsumption;
  }
}
