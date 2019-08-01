import { UpdateOdometerResponse } from './UpdateOdometerResponse';

export interface UpdateOdometerPresenterInterface {
  presentUpdateOdometer(response: UpdateOdometerResponse): void;
}
