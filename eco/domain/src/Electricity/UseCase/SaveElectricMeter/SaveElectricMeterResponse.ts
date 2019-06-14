import { ElectricMeter } from '@eco/domain/src/Electricity/Entity/ElectricMeter';

export class SaveElectricMeterResponse {
  constructor(public meter: ElectricMeter) {

  }
}
