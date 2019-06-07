import { AddFuelOilOrder } from '@eco/domain/src/HouseHeating/UseCase/AddFuelOilOrder/AddFuelOilOrder';
import { AddFuelOilOrderRequest } from '@eco/domain/src/HouseHeating/UseCase/AddFuelOilOrder/AddFuelOilOrderRequest';
import { GetLastFuelOilOrders } from '@eco/domain/src/HouseHeating/UseCase/GetLastFuelOilOrder/GetLastFuelOilOrder';
import { GetTotalFuelOilOrder } from '@eco/domain/src/HouseHeating/UseCase/GetTotalFuelOilOrder/GetTotalFuelOilOrder';

export class HouseHeatingController {
  constructor(private addUseCase: AddFuelOilOrder,
              private getLastFuelOilOrders: GetLastFuelOilOrders,
              private getTotalFuelOilOrder: GetTotalFuelOilOrder) {

  }

  addFuelOilOrder(request: AddFuelOilOrderRequest) {
    return this.addUseCase.execute(request);
  }

  refreshSummary() {
    this.getLastFuelOilOrders.execute();
    this.getTotalFuelOilOrder.execute();
  }
}
