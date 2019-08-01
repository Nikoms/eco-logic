import { v4 } from 'uuid';
import { WaterApi } from './WaterApi';
import { WaterMeter, WaterMeterRepositoryInterface } from '../../../eco/domain';


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
