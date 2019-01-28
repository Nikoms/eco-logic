import { PowerConsumptionRepository } from '../../../../domain/src/electricity/repository/PowerConsumptionRepository';
import { PowerConsumption } from '../../../../domain/src/electricity/entity/PowerConsumption';
import { v4 } from 'uuid';

export class AddPowerConsumption {
  public readonly powerConsumption: PowerConsumption;

  constructor(readonly kWh: number) {
    if (!kWh) {
      throw new Error('"kWh" empty');
    }
    this.powerConsumption = new PowerConsumption(v4(), kWh, new Date());
  }
}


export class AddPowerConsumptionHandler {
  constructor(private powerConsumptionStore: PowerConsumptionRepository) {

  }

  handle(request: AddPowerConsumption) {
    this.powerConsumptionStore.add(request.powerConsumption);
    return request.powerConsumption;
  }
}
