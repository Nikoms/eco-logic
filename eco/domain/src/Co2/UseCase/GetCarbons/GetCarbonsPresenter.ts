import { GetCarbonsResponse } from './GetCarbonsResponse';

export interface GetCarbonsPresenter {
  presentGetCarbons(response: GetCarbonsResponse): void;
}
