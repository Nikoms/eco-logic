import { AddConsumptionResponse } from '@eco/domain/src/Water/UseCase/AddConsumption/AddConsumptionResponse';

export interface AddConsumptionPresenterInterface {
  presentAddConsumption(response: AddConsumptionResponse): void;
}
