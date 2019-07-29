import { WaterMeter } from '../Entity/WaterMeter';

export interface WaterMeterRepositoryInterface {

  getAll(): Promise<WaterMeter[]>;

  nextIdentity(): Promise<string>;

  add(meter: WaterMeter): Promise<void>;
}
