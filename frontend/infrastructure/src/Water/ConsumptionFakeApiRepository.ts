import { ConsumptionRepositoryInterface } from '@eco/domain/src/Water/UseCase/ConsumptionRepositoryInterface';
import { Api } from '@eco/frontend-infrastructure/src/Api';
import { v4 } from 'uuid';
import { WaterConsumption } from '@eco/domain/src/Water/Entity/WaterConsumption';

export class ConsumptionFakeApiRepository implements ConsumptionRepositoryInterface {
  constructor(private api: Api) {

  }

  async add(waterConsumption: WaterConsumption): Promise<void> {
    await this.api.addWaterConsumption(waterConsumption);
  }

  getAll(): Promise<WaterConsumption[]> {
    return this.api.getAllWaterConsumptions();
  }


  async nextIdentity(): Promise<string> {
    return v4();
  }
}
