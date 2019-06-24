import { UpdateCarResponse } from '@eco/domain/src/Traveling/UseCase/UpdateCar/UpdateCarResponse';

export interface UpdateCarPresenterInterface {
  presentUpdateCar(response: UpdateCarResponse): void;
}
