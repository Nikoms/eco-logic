import { ElectricMeter } from '@eco/core-electricity/src/entity/ElectricMeter';

export class AddElectricMeterRequest {
  constructor(public meter: ElectricMeter) {

  }
}
