import { GetFlightsResponse } from './GetFlightsResponse';

export interface GetFlightsPresenterInterface {
  presentGetFlights(response: GetFlightsResponse): void;
}
