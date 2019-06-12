import { WaterMeter } from '@eco/core-water/src/entity/WaterMeter';

export interface WaterMeterRepositoryInterface {

  getAll(): Promise<WaterMeter[]>;

  nextIdentity(): Promise<string>;

  add(meter: WaterMeter): Promise<void>;
}
