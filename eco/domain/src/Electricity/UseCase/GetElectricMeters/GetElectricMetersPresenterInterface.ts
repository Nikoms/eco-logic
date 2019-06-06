import { GetElectricMetersViewModel } from '@eco/domain/src/Electricity/UseCase/GetElectricMeters/GetElectricMetersViewModel';
import { GetElectricMetersResponse } from '@eco/domain/src/Electricity/UseCase/GetElectricMeters/GetElectricMetersResponse';

export interface GetElectricMetersPresenterInterface {
  getGetElectricMetersViewModel(): GetElectricMetersViewModel;

  presentGetElectricMeters(response: GetElectricMetersResponse): void;
}
