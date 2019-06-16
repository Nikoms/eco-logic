import { UpdateOdometerCarViewModel } from '@eco/domain/src/Traveling/UseCase/UpdateOdometer/UpdateOdometerViewModel';

export interface TravelingUI {
  showUpdateOdometer(car: UpdateOdometerCarViewModel): void;

  hideUpdateOdometer(): void;

  showAddCar(): void;

  hideAddCar(): void;
}
