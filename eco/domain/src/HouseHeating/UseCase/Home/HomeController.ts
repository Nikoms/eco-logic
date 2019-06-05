import { GetLastFuelOilOrders } from '@eco/domain/src/HouseHeating/UseCase/GetLastFuelOilOrder';
import { GetTotalFuelOilOrder } from '@eco/domain/src/HouseHeating/UseCase/GetTotalFuelOilOrder';

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
