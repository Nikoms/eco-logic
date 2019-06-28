import { AddCarbonResponse } from '@eco/domain/src/Co2/UseCase/AddCarbon/AddCarbonResponse';

export interface AddCarbonPresenter {
  presentAddCarbon(response: AddCarbonResponse): void;
}
