import { Api } from '@/infrastructure/Api';
import { PowerConsumptionRepositoryInterface } from '@eco/domain/src/Electricity/Repository/PowerConsumptionRepositoryInterface';
import { PowerConsumption } from '@eco/core-electricity/src/entity/PowerConsumption';
import { v4 } from 'uuid';

export class PowerConsumptionFakeApiRepository implements PowerConsumptionRepositoryInterface {
  constructor(private api: Api) {

  }

  async add(powerConsumption: PowerConsumption): Promise<void> {
    await this.api.addPowerConsumption(powerConsumption);
  }

  async nextIdentity(): Promise<string> {
    return v4();
  }
}
