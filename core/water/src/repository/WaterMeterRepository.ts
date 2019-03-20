import { WaterMeter } from '../entity/WaterMeter';

export interface WaterMeterRepository {
  add(waterMeter: WaterMeter): Promise<void>;

  getAll(): Promise<WaterMeter[]>;
}
