import { WaterMeterRepositoryInterface } from '@eco/domain/src/Water/UseCase/WaterMeterRepositoryInterface';
import { WaterMeter } from '@eco/core-water/src/entity/WaterMeter';
import { Api } from '@/infrastructure/Api';
import { v4 } from 'uuid';

export class WaterMeterFakeApiRepository implements WaterMeterRepositoryInterface {
  constructor(private api: Api) {

  }

  async add(meter: WaterMeter): Promise<void> {
    await this.api.initWaterMeter(meter);
  }

  getAll(): Promise<WaterMeter[]> {
    return this.api.getWaterMeters();
  }

  async nextIdentity(): Promise<string> {
    return v4();
  }

}
