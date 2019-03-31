import { FuelOilOrderRepository } from '../repository/FuelOilOrderRepository';

export class GetTotalFuelOilOrder {
  constructor(private fuelOilOrders: FuelOilOrderRepository) {
  }

  execute() {
    return this.fuelOilOrders.getTotal();
  }
}
