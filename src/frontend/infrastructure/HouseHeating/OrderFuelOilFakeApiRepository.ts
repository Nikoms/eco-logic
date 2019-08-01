import { FuelOilOrder, FuelOilOrderRepositoryInterface } from '../../../eco/domain';
import { HouseHeatingApi } from './HouseHeatingApi';

export class OrderFuelOilFakeApiRepository implements FuelOilOrderRepositoryInterface {
  constructor(private api: HouseHeatingApi) {

  }

  async add(order: FuelOilOrder): Promise<void> {
    await this.api.addFuelOilOrder(order.liters);
  }

  async getLast(max: number): Promise<FuelOilOrder[]> {
    return this.api.getLastFuelOilOrders(max);
  }

  async getTotal(): Promise<number> {
    return this.api.getTotalFuelOilOrder();
  }

}
