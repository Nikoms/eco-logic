import { ListConsumptionsResponse } from '@eco/domain/src/Water/UseCase/ListConsumptions/ListConsumptionsResponse';

export interface ListConsumptionsPresenterInterface {
  presentListConsumptionsResponse(response: ListConsumptionsResponse): void;
}
