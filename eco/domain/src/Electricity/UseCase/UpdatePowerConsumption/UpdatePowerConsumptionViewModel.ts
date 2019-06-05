import { ElectricMeter } from '@eco/core-electricity/src/entity/ElectricMeter';

export class UpdatePowerConsumptionViewModel {
  displayed = false;
  meterName = '';
  lastKWh = '';
  electricMeterId: string = '';
}
