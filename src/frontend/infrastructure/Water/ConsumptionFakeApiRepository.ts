import { v4 } from 'uuid';
import { WaterApi } from './WaterApi';
import { ConsumptionRepositoryInterface, WaterConsumption } from '@eco/domain';


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
