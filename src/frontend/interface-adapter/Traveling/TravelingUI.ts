import { CarViewModel } from './ViewModel';

export interface TravelingUI {
  showUpdateOdometer(car: CarViewModel): void;

  hideUpdateOdometer(): void;

  showAddCar(): void;

  hideAddCar(): void;

  showAddFlight(): void;

  cancelAddFlight(): void;
}
