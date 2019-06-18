import { GetElectricMetersResponse } from '@eco/domain/src/Electricity/UseCase/GetElectricMeters/GetElectricMetersResponse';

export interface GetElectricMetersPresenterInterface {
  presentGetElectricMeters(response: GetElectricMetersResponse): void;
}
