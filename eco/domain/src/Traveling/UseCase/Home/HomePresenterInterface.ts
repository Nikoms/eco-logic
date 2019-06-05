import { PlaneTravel } from '@eco/core-travel/src/entity/PlaneTravel';
import { HomeViewModel } from '@eco/domain/src/Traveling/UseCase/Home/HomeViewModel';
import { GetCarsResponse } from '@eco/domain/src/Traveling/UseCase/GetCars/GetCarsResponse';

export interface HomePresenterInterface {
  setFlights(flights: PlaneTravel[]): void;

  getHomeViewModel(): HomeViewModel;

  presentGetCars(response: GetCarsResponse): void;
}
