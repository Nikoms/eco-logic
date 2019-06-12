import { WaterMeter } from '@eco/core-water/src/entity/WaterMeter';

export class AddWaterMeterResponse {
  meter?: WaterMeter;
  isNameInvalid = false;
}
