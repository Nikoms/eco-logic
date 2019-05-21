import { Car } from '@eco/core-travel/src/entity/Car';
import { AddCarViewModel } from '@/domain/Traveling/UseCase/AddCar/AddCarViewModel';

export interface AddCarPresenterInterface {
  addedCar(car: Car): void;

  cancelAddCar(): void;

  nameIsEmpty(): void;

  kmIsNaN(): void;

  engineInvalid(): void;

  consumptionInvalid(): void;

  getAddCarViewModel(): AddCarViewModel;

  showAddCar(): void;
}
