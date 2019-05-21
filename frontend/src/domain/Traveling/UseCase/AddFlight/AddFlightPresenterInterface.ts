import { PlaneTravel } from '@eco/core-travel/src/entity/PlaneTravel';
import { AddFlightViewModel } from '@/domain/Traveling/UseCase/AddFlight/AddFlightViewModel';

export interface AddFlightPresenterInterface {

  showAddFlight(): void;

  cancelAddFlight(): void;

  invalidKm(): void;

  invalidSeat(): void;

  addedFlight(flight: PlaneTravel): void;

  getAddFlightViewModel(): AddFlightViewModel;
}
