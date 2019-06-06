import {
  UpdateOdometerCarViewModel,
  UpdateOdometerViewModel,
} from '@eco/domain/src/Traveling/UseCase/UpdateOdometer/UpdateOdometerViewModel';
import { UpdateOdometerResponse } from '@eco/domain/src/Traveling/UseCase/UpdateOdometer/UpdateOdometerResponse';

export interface UpdateOdometerPresenterInterface {
  cancelOdometer(): void;

  getUpdateOdometerViewModel(): UpdateOdometerViewModel;

  showUpdateOdometer(car: UpdateOdometerCarViewModel): void;

  presentUpdateOdometer(response: UpdateOdometerResponse): void;
}
