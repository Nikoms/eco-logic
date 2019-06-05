import { AddFuelOilOrder } from '@eco/domain/src/HouseHeating/UseCase/AddFuelOilOrder/AddFuelOilOrder';
import { AddFuelOilOrderRequest } from '@eco/domain/src/HouseHeating/UseCase/AddFuelOilOrder/AddFuelOilOrderRequest';

export class AddFuelOilOrderController {
  constructor(private addUseCase: AddFuelOilOrder) {

  }

  add(request: AddFuelOilOrderRequest) {
    return this.addUseCase.execute(request);
  }
}
