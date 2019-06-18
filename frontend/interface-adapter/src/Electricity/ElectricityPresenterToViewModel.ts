import { GetElectricMetersViewModel } from '@eco/domain/src/Electricity/UseCase/GetElectricMeters/GetElectricMetersViewModel';
import { UpdatePowerConsumptionViewModel } from '@eco/domain/src/Electricity/UseCase/UpdatePowerConsumption/UpdatePowerConsumptionViewModel';

export interface ElectricityPresenterToViewModel {
  getGetElectricMetersViewModel(): GetElectricMetersViewModel;

  getUpdatePowerConsumptionViewModel(): UpdatePowerConsumptionViewModel;
}
