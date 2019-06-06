import { ListConsumptionsViewModel } from '@eco/domain/src/Water/UseCase/ListConsumptions/ListConsumptionsViewModel';
import { ListConsumptionsResponse } from '@eco/domain/src/Water/UseCase/ListConsumptions/ListConsumptionsResponse';

export interface ListConsumptionsPresenterInterface {
  getViewModel(): ListConsumptionsViewModel;

  presentListConsumptionsResponse(response: ListConsumptionsResponse): void;
}
