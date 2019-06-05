import { WaterMeter } from '@eco/core-water/src/entity/WaterMeter';

export interface GetWaterMeterPresenterInterface {
  setMeters(meters: WaterMeter[]): void;
}
