import { AddFuelOilOrder } from '@/domain/HouseHeating/UseCase/AddFuelOilOrder/AddFuelOilOrder';
import { AddFuelOilOrderRequest } from '@/domain/HouseHeating/UseCase/AddFuelOilOrder/AddFuelOilOrderRequest';

export class AddFuelOilOrderController {
  constructor(private addUseCase: AddFuelOilOrder) {

  }

  add(request: AddFuelOilOrderRequest) {
    return this.addUseCase.execute(request);
  }
}
