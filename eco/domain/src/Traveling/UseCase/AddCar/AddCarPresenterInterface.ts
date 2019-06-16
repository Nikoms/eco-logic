import { AddCarViewModel } from '@eco/domain/src/Traveling/UseCase/AddCar/AddCarViewModel';
import { AddCarResponse } from '@eco/domain/src/Traveling/UseCase/AddCar/AddCarResponse';

export interface AddCarPresenterInterface {
  getAddCarViewModel(): AddCarViewModel;

  presentAddCar(response: AddCarResponse): void;
}
