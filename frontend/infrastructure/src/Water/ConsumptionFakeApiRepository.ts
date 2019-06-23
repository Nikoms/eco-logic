import { ConsumptionRepositoryInterface } from '@eco/domain/src/Water/UseCase/ConsumptionRepositoryInterface';
import { v4 } from 'uuid';
import { WaterConsumption } from '@eco/domain/src/Water/Entity/WaterConsumption';
import { WaterApi } from '@eco/frontend-infrastructure/src/Water/WaterApi';

export class ConsumptionFakeApiRepository implements ConsumptionRepositoryInterface {
  constructor(private api: WaterApi) {

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
