import { GetLastFuelOilOrders } from '@eco/domain/src/HouseHeating/UseCase/GetLastFuelOilOrder/GetLastFuelOilOrder';
import { GetTotalFuelOilOrder } from '@eco/domain/src/HouseHeating/UseCase/GetTotalFuelOilOrder/GetTotalFuelOilOrder';

export class HomeController {
  constructor(
    private getLastFuelOilOrders: GetLastFuelOilOrders,
    private getTotalFuelOilOrder: GetTotalFuelOilOrder,
  ) {

  }

  init() {
    this.getLastFuelOilOrders.execute();
    this.getTotalFuelOilOrder.execute();
  }
}
