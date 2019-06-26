import { GetConsumptionsResponse } from '@eco/domain/src/Water/UseCase/GetConsumptions/GetConsumptionsResponse';

export interface GetConsumptionsPresenterInterface {
  presentGetConsumptionsResponse(response: GetConsumptionsResponse): void;
}
