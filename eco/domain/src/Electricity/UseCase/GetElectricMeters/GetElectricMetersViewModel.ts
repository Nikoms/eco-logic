import { ElectricMeter } from '@eco/core-electricity/src/entity/ElectricMeter';

export class GetElectricMetersViewModel {
  public meters: ElectricMeter[] = [];
  public hasMeter = false;
}
