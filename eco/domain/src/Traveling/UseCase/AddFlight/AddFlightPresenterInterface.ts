import { AddFlightViewModel } from '@eco/domain/src/Traveling/UseCase/AddFlight/AddFlightViewModel';
import { AddFlightResponse } from '@eco/domain/src/Traveling/UseCase/AddFlight/AddFlightResponse';

export interface AddFlightPresenterInterface {

  showAddFlight(): void;

  cancelAddFlight(): void;

  getAddFlightViewModel(): AddFlightViewModel;

  presentAddFlight(response: AddFlightResponse): void;
}
