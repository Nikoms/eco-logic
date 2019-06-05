import { ElectricMeter } from '@eco/core-electricity/src/entity/ElectricMeter';

export interface InitElectricMetersPresenterInterface {
  electricMetersInitialized(electricMeters: ElectricMeter[]): void;
}
