import { PlaneTravel } from '@eco/core-travel/src/entity/PlaneTravel';

export class AddFlightResponse {
  public isInvalidKm = false;
  isInvalidSeat = false;
  newFlight?: PlaneTravel;
}
