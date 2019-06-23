import { UpdateOdometerResponse } from '@eco/domain/src/Traveling/UseCase/UpdateOdometer/UpdateOdometerResponse';

export interface UpdateOdometerPresenterInterface {
  presentUpdateOdometer(response: UpdateOdometerResponse): void;
}
