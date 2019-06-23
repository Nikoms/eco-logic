import { AddCarResponse } from '@eco/domain/src/Traveling/UseCase/AddCar/AddCarResponse';

export interface AddCarPresenterInterface {
  presentAddCar(response: AddCarResponse): void;
}
