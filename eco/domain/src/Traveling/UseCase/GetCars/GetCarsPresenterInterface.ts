import { GetCarsResponse } from '@eco/domain/src/Traveling/UseCase/GetCars/GetCarsResponse';
import { HomeViewModel } from '@eco/domain/src/Traveling/UseCase/Home/HomeViewModel';

export interface GetCarsPresenterInterface {
  presentGetCars(response: GetCarsResponse): void;

  getGetCarsViewModel(): HomeViewModel;
}
