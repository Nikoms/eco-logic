import { FuelOilOrder } from '@eco/domain/src/HouseHeating/Entity/FuelOilOrder';

export class AddFuelOilOrderResponse {
  isLiterEmpty: boolean = false;
  isLiterInvalid: boolean = false;
  newFuelOilOrder?: FuelOilOrder;
}
