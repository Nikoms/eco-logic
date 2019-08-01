import { AddFlightResponse } from './AddFlightResponse';

export interface AddFlightPresenterInterface {
  presentAddFlight(response: AddFlightResponse): void;
}
