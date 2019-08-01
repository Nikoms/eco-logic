import { GetCarResponse } from './GetCarResponse';

export interface GetCarPresenterInterface {
  presentGetCar(response: GetCarResponse): void;
}
