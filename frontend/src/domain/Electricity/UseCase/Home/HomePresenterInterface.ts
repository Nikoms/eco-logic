import { ElectricMeter } from '@eco/core-electricity/src/entity/ElectricMeter';

export interface HomePresenterInterface {
  showUpdatePowerConsumption(electricMeter: ElectricMeter): void;
}
