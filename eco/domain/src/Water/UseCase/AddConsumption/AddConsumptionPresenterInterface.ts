import { AddConsumptionResponse } from './AddConsumptionResponse';

export interface AddConsumptionPresenterInterface {
  presentAddConsumption(response: AddConsumptionResponse): void;
}
