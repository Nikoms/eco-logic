import { AddFlightResponse } from '@eco/domain/src/Traveling/UseCase/AddFlight/AddFlightResponse';

export interface AddFlightPresenterInterface {
  presentAddFlight(response: AddFlightResponse): void;
}
