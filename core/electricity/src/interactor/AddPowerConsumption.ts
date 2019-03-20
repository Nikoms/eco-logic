import { v4 } from 'uuid';
import { PowerConsumption } from '../entity/PowerConsumption';
import { ElectricMeter } from '../entity/ElectricMeter';
import { PowerConsumptionRepository } from '../repository/PowerConsumptionRepository';
import { EventDispatcher } from '@eco/core-shared-kernel/src/event/EventDispatcher';
import { PowerUpdated } from '../event/PowerUpdated';
import { ElectricMeterRepository } from '../repository/ElectricMeterRepository';

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
  constructor(private powerConsumptionStore: PowerConsumptionRepository,
              private electricMeters: ElectricMeterRepository,
              private eventDispatcher: EventDispatcher) {

  }

  async handle(request: AddPowerConsumption) {
    const electricMeter = await this.electricMeters.getElectricMeter(request.powerConsumption.electricMeterId);

    if (electricMeter === undefined) {
      throw new Error('No electric meter');
    }

    const lastConsumption = await this.powerConsumptionStore.getLastConsumption();
    await this.powerConsumptionStore.add(request.powerConsumption);

    const lastKwh = lastConsumption && lastConsumption.kWh || 0;
    const kWhConsumed = request.powerConsumption.kWh - lastKwh;
    this.eventDispatcher.emit(new PowerUpdated(
      request.powerConsumption.id,
      kWhConsumed,
      request.powerConsumption.kWh,
      electricMeter,
    ));

    return request.powerConsumption;
  }
}
