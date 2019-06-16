import { UpdateOdometerViewModel } from '@eco/domain/src/Traveling/UseCase/UpdateOdometer/UpdateOdometerViewModel';
import { UpdateOdometerResponse } from '@eco/domain/src/Traveling/UseCase/UpdateOdometer/UpdateOdometerResponse';

export interface UpdateOdometerPresenterInterface {
  getUpdateOdometerViewModel(): UpdateOdometerViewModel;

  presentUpdateOdometer(response: UpdateOdometerResponse): void;
}
