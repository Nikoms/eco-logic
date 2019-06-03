import { WaterMeter } from '@eco/core-water/src/entity/WaterMeter';

export class HomeViewModel {
  hasMeter = false;
  addWaterConsumptionDisplayed = false;
  meters: WaterMeter[] = [];
}
