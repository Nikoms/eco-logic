import { GetElectricMetersResponse } from './GetElectricMetersResponse';

export interface GetElectricMetersPresenterInterface {
  presentGetElectricMeters(response: GetElectricMetersResponse): void;
}
