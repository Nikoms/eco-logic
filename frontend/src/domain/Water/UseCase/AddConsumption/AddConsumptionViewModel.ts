import { WaterMeter } from '@eco/core-water/src/entity/WaterMeter';

export class AddConsumptionViewModel {
  meters: WaterMeter[] = [];
  hasMeters = false;
  errorMessage: string = '';
  displayed: boolean = false;
}
