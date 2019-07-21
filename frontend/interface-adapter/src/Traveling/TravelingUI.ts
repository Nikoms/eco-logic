import { CarViewModel } from '@eco/frontend-interface-adapter/src/Traveling/ViewModel';

export interface TravelingUI {
  showUpdateOdometer(car: CarViewModel): void;

  hideUpdateOdometer(): void;

  showAddCar(): void;

  hideAddCar(): void;

  showAddFlight(): void;

  cancelAddFlight(): void;
}
