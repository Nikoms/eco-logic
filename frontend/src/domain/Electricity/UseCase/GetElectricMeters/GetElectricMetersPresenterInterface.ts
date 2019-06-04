import { ElectricMeter } from '@eco/core-electricity/src/entity/ElectricMeter';
import { GetElectricMetersViewModel } from '@/domain/Electricity/UseCase/GetElectricMeters/GetElectricMetersViewModel';

export interface GetElectricMetersPresenterInterface {
  getGetElectricMetersViewModel(): GetElectricMetersViewModel;

  setElectricMeters(electricMeters: ElectricMeter[]): void;
}
