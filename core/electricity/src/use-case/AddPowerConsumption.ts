import { v4 } from 'uuid';
import { PowerConsumption } from '../entity/PowerConsumption';
import { PowerConsumptionRepository } from '../repository/PowerConsumptionRepository';
import { EventDispatcher } from '@eco/core-shared-kernel/src/event/EventDispatcher';
import { PowerUpdated } from '../event/PowerUpdated';
import { ElectricMeterRepository } from '../repository/ElectricMeterRepository';

export class AddPowerConsumptionRequest {
  public readonly powerConsumption: PowerConsumption;

  constructor(public readonly kWh: number,
              public readonly electricMeterId: string,
              public readonly id?: string,
              public readonly date?: Date) {
    this.powerConsumption = new PowerConsumption(id || v4(), kWh, electricMeterId, date || new Date());
  }
}


export class AddPowerConsumption {
  constructor(private powerConsumptions: PowerConsumptionRepository,
              private electricMeters: ElectricMeterRepository,
              private eventDispatcher: EventDispatcher) {

  }

  async execute(request: AddPowerConsumptionRequest) {
    if (!request.electricMeterId) {
      throw new Error('electric meter unknown');
    }
    const electricMeter = await this.electricMeters.getElectricMeter(request.electricMeterId);
    if (!electricMeter) {
      throw new Error('electric meter unknown');
    }
    const lastKwh = electricMeter && electricMeter.kWh || 0;
    electricMeter.updateKwh(request.kWh);

    await this.electricMeters.update(electricMeter);
    await this.powerConsumptions.add(request.powerConsumption);

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
