import { PlaneTravel } from '@eco/domain/src/Traveling/Entity/PlaneTravel';

export interface GetFlightsPresenterInterface {
  presentGetFlights(flights: PlaneTravel[]): void;
}
