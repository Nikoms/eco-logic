import { GetConsumptionsResponse } from './GetConsumptionsResponse';

export interface GetConsumptionsPresenterInterface {
  presentGetConsumptionsResponse(response: GetConsumptionsResponse): void;
}
