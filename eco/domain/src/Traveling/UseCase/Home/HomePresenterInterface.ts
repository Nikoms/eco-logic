import { Car } from '@eco/core-travel/src/entity/Car';
import { PlaneTravel } from '@eco/core-travel/src/entity/PlaneTravel';
import { HomeViewModel } from '@eco/domain/src/Traveling/UseCase/Home/HomeViewModel';

export interface HomePresenterInterface {
  setCars(cars: Car[]): void;

  setFlights(flights: PlaneTravel[]): void;

  getHomeViewModel(): HomeViewModel;
}