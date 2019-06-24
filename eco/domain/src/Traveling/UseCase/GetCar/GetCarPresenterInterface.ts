import { GetCarResponse } from '@eco/domain/src/Traveling/UseCase/GetCar/GetCarResponse';

export interface GetCarPresenterInterface {
  presentGetCar(response: GetCarResponse): void;
}
