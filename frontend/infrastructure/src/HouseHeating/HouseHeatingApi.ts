import { GetTotalFuelOilOrderPresenterInterface } from '@eco/domain/src/HouseHeating/UseCase/GetTotalFuelOilOrder/GetTotalFuelOilOrderPresenterInterface';
import { GetLastFuelOilOrdersPresenterInterface } from '@eco/domain/src/HouseHeating/UseCase/GetLastFuelOilOrders/GetLastFuelOilOrdersPresenterInterface';
import { AddFuelOilOrderPresenterInterface } from '@eco/domain/src/HouseHeating/UseCase/AddFuelOilOrder/AddFuelOilOrderPresenterInterface';
import { AddFuelOilOrderResponse } from '@eco/domain/src/HouseHeating/UseCase/AddFuelOilOrder/AddFuelOilOrderResponse';
import { GetLastFuelOilOrdersResponse } from '@eco/domain/src/HouseHeating/UseCase/GetLastFuelOilOrders/GetLastFuelOilOrdersResponse';
import { GetTotalFuelOilOrderResponse } from '@eco/domain/src/HouseHeating/UseCase/GetTotalFuelOilOrder/GetTotalFuelOilOrderResponse';
import { addFuelOilOrder, getLastFuelOilOrder, getTotalFuelOilOrder } from '@eco/infrastructure/src/di';
import { AddFuelOilOrderRequest } from '@eco/domain/src/HouseHeating/UseCase/AddFuelOilOrder/AddFuelOilOrderRequest';
import { GetLastFuelOilOrdersRequest } from '@eco/domain/src/HouseHeating/UseCase/GetLastFuelOilOrders/GetLastFuelOilOrdersRequest';

export class HouseHeatingApi implements GetTotalFuelOilOrderPresenterInterface,
  GetLastFuelOilOrdersPresenterInterface,
  AddFuelOilOrderPresenterInterface {

  public addFuelOilOrderResponse?: AddFuelOilOrderResponse;
  public getLastFuelOilOrdersResponse?: GetLastFuelOilOrdersResponse;
  public getTotalFuelOilOrderResponse?: GetTotalFuelOilOrderResponse;

  presentAddFuelOilOrder(response: AddFuelOilOrderResponse): void {
    this.addFuelOilOrderResponse = response;
  }

  presentGetLastFuelOilOrders(response: GetLastFuelOilOrdersResponse): void {
    this.getLastFuelOilOrdersResponse = response;
  }

  presentGetTotalFuelOilOrder(response: GetTotalFuelOilOrderResponse): void {
    this.getTotalFuelOilOrderResponse = response;
  }

  async addFuelOilOrder(liters: number) {
    await addFuelOilOrder.execute(new AddFuelOilOrderRequest(`${liters}`), this);
  }

  async getLastFuelOilOrders(max: number) {
    await getLastFuelOilOrder.execute(new GetLastFuelOilOrdersRequest(max), this);
    return this.getLastFuelOilOrdersResponse!.lastFuelOilOrders;
  }

  async getTotalFuelOilOrder() {
    await getTotalFuelOilOrder.execute(this);
    return this.getTotalFuelOilOrderResponse!.totalFuelOilOrder;
  }
}
