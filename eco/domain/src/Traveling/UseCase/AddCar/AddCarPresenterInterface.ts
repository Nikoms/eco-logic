import { AddCarResponse } from './AddCarResponse';

export interface AddCarPresenterInterface {
  presentAddCar(response: AddCarResponse): void;
}
