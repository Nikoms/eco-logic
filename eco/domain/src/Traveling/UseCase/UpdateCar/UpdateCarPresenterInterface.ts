import { UpdateCarResponse } from './UpdateCarResponse';

export interface UpdateCarPresenterInterface {
  presentUpdateCar(response: UpdateCarResponse): void;
}
