import { UpdateOdometerCarViewModel } from '@eco/frontend-interface-adapter/src/Traveling/UpdateOdometerViewModel';

export interface TravelingUI {
  showUpdateOdometer(car: UpdateOdometerCarViewModel): void;

  hideUpdateOdometer(): void;

  showAddCar(): void;

  hideAddCar(): void;
}
