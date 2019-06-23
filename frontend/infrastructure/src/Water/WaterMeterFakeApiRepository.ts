import { WaterMeterRepositoryInterface } from '@eco/domain/src/Water/UseCase/WaterMeterRepositoryInterface';
import { v4 } from 'uuid';
import { WaterMeter } from '@eco/domain/src/Water/Entity/WaterMeter';
import { WaterApi } from '@eco/frontend-infrastructure/src/Water/WaterApi';

export class WaterMeterFakeApiRepository implements WaterMeterRepositoryInterface {
  constructor(private api: WaterApi) {

  }

  async add(meter: WaterMeter): Promise<void> {
    await this.api.addWaterMeter(meter);
  }

  getAll(): Promise<WaterMeter[]> {
    return this.api.getWaterMeters();
  }

  async nextIdentity(): Promise<string> {
    return v4();
  }

}
