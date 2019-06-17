import { WaterMeter } from '@eco/domain/src/Water/Entity/WaterMeter';

export class AddConsumptionViewModel {
  meters: WaterMeter[] = [];
  hasMeters = false;
  errorMessage: string = '';
  displayed: boolean = false;
}
