import { OrderFuelOilRepositoryInterface } from '@eco/domain/src/HouseHeating/OrderFuelOilRepositoryInterface';
import { FuelOilOrder } from '@eco/core-fuel-oil/src/entity/FuelOilOrder';
import { Api } from '@eco/domain/src/Temp/Api';

export class OrderFuelOilFakeApiRepository implements OrderFuelOilRepositoryInterface {
  constructor(private api: Api) {

  }

  async add(order: FuelOilOrder): Promise<void> {
    await this.api.orderFuelOil(order.liters);
  }

  async getLast(): Promise<FuelOilOrder[]> {
    return this.api.getLastFuelOilOrders();
  }

  async getTotal(): Promise<number> {
    return this.api.getTotalFuelOilOrder();
  }

}
