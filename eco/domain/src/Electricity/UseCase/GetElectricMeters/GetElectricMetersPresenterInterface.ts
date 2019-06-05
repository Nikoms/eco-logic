import { ElectricMeter } from '@eco/core-electricity/src/entity/ElectricMeter';
import { GetElectricMetersViewModel } from '@eco/domain/src/Electricity/UseCase/GetElectricMeters/GetElectricMetersViewModel';

export interface GetElectricMetersPresenterInterface {
  getGetElectricMetersViewModel(): GetElectricMetersViewModel;

  setElectricMeters(electricMeters: ElectricMeter[]): void;
}
