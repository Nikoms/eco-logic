import { WaterMeter } from '@eco/domain/src/Water/Entity/WaterMeter';

export class AddWaterMeterResponse {
  meter?: WaterMeter;
  isNameInvalid = false;
}
