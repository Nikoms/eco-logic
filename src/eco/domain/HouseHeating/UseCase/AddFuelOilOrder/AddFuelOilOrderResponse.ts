import { FuelOilOrder } from '../../Entity/FuelOilOrder';

export class AddFuelOilOrderResponse {
  isLiterEmpty: boolean = false;
  isLiterInvalid: boolean = false;
  newFuelOilOrder?: FuelOilOrder;
}
