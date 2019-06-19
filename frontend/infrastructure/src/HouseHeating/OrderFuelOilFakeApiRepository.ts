import { FuelOilOrderRepositoryInterface } from '@eco/domain/src/HouseHeating/FuelOilOrderRepositoryInterface';
import { Api } from '@eco/frontend-infrastructure/src/Api';
import { FuelOilOrder } from '@eco/domain/src/HouseHeating/Entity/FuelOilOrder';

export class OrderFuelOilFakeApiRepository implements FuelOilOrderRepositoryInterface {
  constructor(private api: Api) {

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
