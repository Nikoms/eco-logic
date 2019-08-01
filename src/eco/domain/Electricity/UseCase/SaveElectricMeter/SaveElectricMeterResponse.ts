import { ElectricMeter } from '../../Entity/ElectricMeter';

export class SaveElectricMeterResponse {
  public meter?: ElectricMeter;
  public hasValidName = true;

  constructor() {
  }
}
