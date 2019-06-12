import { ConsumptionRepositoryInterface } from '@eco/domain/src/Water/UseCase/ConsumptionRepositoryInterface';
import { WaterConsumption } from '@eco/core-water/src/entity/WaterConsumption';
import { Api } from '@/infrastructure/Api';
import { v4 } from 'uuid';

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
