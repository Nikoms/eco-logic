import { ElectricMeter } from '@eco/domain/src/Electricity/Entity/ElectricMeter';

export interface HomePresenterInterface {
  showUpdatePowerConsumption(electricMeter: ElectricMeter): void;
}
