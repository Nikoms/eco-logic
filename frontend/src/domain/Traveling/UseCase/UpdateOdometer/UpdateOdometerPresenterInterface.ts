import { Odometer } from '@eco/core-travel/src/entity/Odometer';
import { UpdateOdometerCarViewModel, UpdateOdometerViewModel } from '@/domain/Traveling/UseCase/UpdateOdometer/UpdateOdometerViewModel';
import { Car } from '@eco/core-travel/src/entity/Car';

export interface UpdateOdometerPresenterInterface {
  kmIsEmpty(): void;

  updatedOdometer(odometer: Odometer): void;

  cancelOdometer(): void;

  carNotSelected(): void;

  kmIsNaN(): void;

  getUpdateOdometerViewModel(): UpdateOdometerViewModel;

  showUpdateOdometer(car: UpdateOdometerCarViewModel): void;
}
