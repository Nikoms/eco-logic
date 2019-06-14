import { ElectricMeter } from '@eco/domain/src/Electricity/Entity/ElectricMeter';

export class GetElectricMetersViewModel {
  public meters: ElectricMeter[] = [];
  public hasMeter = false;
}
