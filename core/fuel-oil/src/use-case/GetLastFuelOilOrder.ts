import { FuelOilOrderRepository } from '../repository/FuelOilOrderRepository';

export class GetLastFuelOilOrder {
  constructor(private fuelOilOrders: FuelOilOrderRepository) {
  }

  execute() {
    return this.fuelOilOrders.getLast(5);
  }
}
