import { GetCarsResponse } from './GetCarsResponse';

export interface GetCarsPresenterInterface {
  presentGetCars(response: GetCarsResponse): void;
}
