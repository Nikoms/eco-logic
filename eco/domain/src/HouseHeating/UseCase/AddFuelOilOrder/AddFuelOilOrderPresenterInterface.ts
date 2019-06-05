import { FuelOilOrder } from '@eco/fuel-oil/src/entity/FuelOilOrder';

export interface AddFuelOilOrderPresenterInterface {
  getAddFuelOilOrderViewModel(): void;

  literIsNotANumber(): void;

  literIsEmpty(): void;

  fuelOilOrdered(fuelOilOrder: FuelOilOrder): void;

  addFuelOilOrderCancelled(): void;
}
