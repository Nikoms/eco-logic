import { GetCarbonsResponse } from '@eco/domain/src/Co2/UseCase/GetCarbons/GetCarbonsResponse';

export interface GetCarbonsPresenter {
  presentGetCarbons(response: GetCarbonsResponse): void;
}
