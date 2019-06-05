import { AddCarViewModel } from '@eco/domain/src/Traveling/UseCase/AddCar/AddCarViewModel';
import { AddCarResponse } from './AddCarResponse';

export interface AddCarPresenterInterface {
  cancelAddCar(): void;

  getAddCarViewModel(): AddCarViewModel;

  showAddCar(): void;

  presentAddCar(response: AddCarResponse): void;
}
