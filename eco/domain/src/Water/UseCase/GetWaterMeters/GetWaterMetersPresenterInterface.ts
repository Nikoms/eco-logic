import { GetWaterMetersResponse } from './GetWaterMetersResponse';

export interface GetWaterMetersPresenterInterface {
  presentGetWaterMeters(response: GetWaterMetersResponse): void;
}
