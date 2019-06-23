import { GetCarsResponse } from '@eco/domain/src/Traveling/UseCase/GetCars/GetCarsResponse';

export interface GetCarsPresenterInterface {
  presentGetCars(response: GetCarsResponse): void;
}
