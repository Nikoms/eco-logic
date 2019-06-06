import { FuelOilOrder } from '@eco/core-fuel-oil/src/entity/FuelOilOrder';

export class AddFuelOilOrderResponse {
  isLiterEmpty: boolean = false;
  isLiterInvalid: boolean = false;
  newFuelOilOrder?: FuelOilOrder;
}
