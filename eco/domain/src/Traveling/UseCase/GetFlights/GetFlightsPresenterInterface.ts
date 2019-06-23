import { GetFlightsResponse } from '@eco/domain/src/Traveling/UseCase/GetFlights/GetFlightsResponse';

export interface GetFlightsPresenterInterface {
  presentGetFlights(response: GetFlightsResponse): void;
}
