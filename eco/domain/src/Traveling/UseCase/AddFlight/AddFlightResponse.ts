import { PlaneTravel } from '@eco/domain/src/Traveling/Entity/PlaneTravel';

export class AddFlightResponse {
  public isInvalidKm = false;
  isInvalidSeat = false;
  newFlight?: PlaneTravel;
}
