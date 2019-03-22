import { v4 } from 'uuid';
import { PowerConsumption } from '../entity/PowerConsumption';
import { ElectricMeter } from '../entity/ElectricMeter';
import { PowerConsumptionRepository } from '../repository/PowerConsumptionRepository';
import { EventDispatcher } from '@eco/core-shared-kernel/src/event/EventDispatcher';
import { PowerUpdated } from '../event/PowerUpdated';
import { ElectricMeterRepository } from '../repository/ElectricMeterRepository';

export class AddPowerConsumption {
  public readonly powerConsumption: PowerConsumption;

  constructor(public readonly kWh: number, public readonly electricMeter: ElectricMeter) {
    if (!electricMeter) {
      throw new Error('electric meter unknown');
    }
    this.powerConsumption = new PowerConsumption(v4(), kWh, electricMeter.id, new Date());
  }
}


export class AddPowerConsumptionHandler {
  constructor(private powerConsumptions: PowerConsumptionRepository,
              private electricMeters: ElectricMeterRepository,
              private eventDispatcher: EventDispatcher) {

  }

  async handle(request: AddPowerConsumption) {
    const lastKwh = request.electricMeter && request.electricMeter.kWh || 0;
    request.electricMeter.updateKwh(request.kWh);

    await this.electricMeters.update(request.electricMeter);
    await this.powerConsumptions.add(request.powerConsumption);

    const kWhConsumed = request.powerConsumption.kWh - lastKwh;

    this.eventDispatcher.emit(new PowerUpdated(
      request.powerConsumption.id,
      kWhConsumed,
      request.powerConsumption.kWh,
      request.electricMeter,
    ));

    return request.powerConsumption;
  }
}
