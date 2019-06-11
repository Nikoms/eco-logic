import { Api } from '@eco/domain/src/Temp/Api';
import { PowerConsumptionRepositoryInterface } from '@eco/domain/src/Electricity/Repository/PowerConsumptionRepositoryInterface';
import { PowerConsumption } from '@eco/core-electricity/src/entity/PowerConsumption';

export class PowerConsumptionFakeApiRepository implements PowerConsumptionRepositoryInterface {
  constructor(private api: Api) {

  }

  async add(powerConsumption: PowerConsumption): Promise<void> {
    await this.api.addPowerConsumption(powerConsumption);
  }
}
