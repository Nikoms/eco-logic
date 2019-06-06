import { GetWaterMetersResponse } from '@eco/domain/src/Water/UseCase/GetWaterMeters/GetWaterMetersResponse';

export interface GetWaterMetersPresenterInterface {
  presentGetWaterMeters(response: GetWaterMetersResponse): void;
}
