import { PlaneTravel } from '../../Entity/PlaneTravel';

export class AddFlightResponse {
  public isInvalidKm = false;
  isInvalidSeat = false;
  newFlight?: PlaneTravel;
}
