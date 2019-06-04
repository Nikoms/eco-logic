import { GetLastFuelOilOrders } from '@/domain/HouseHeating/UseCase/GetLastFuelOilOrder';
import { GetTotalFuelOilOrder } from '@/domain/HouseHeating/UseCase/GetTotalFuelOilOrder';

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
