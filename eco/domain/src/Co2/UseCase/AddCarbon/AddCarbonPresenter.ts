import { AddCarbonResponse } from './AddCarbonResponse';

export interface AddCarbonPresenter {
  presentAddCarbon(response: AddCarbonResponse): void;
}
