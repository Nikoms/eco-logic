import {
  AddFuelOilOrderPresenterInterface,
  AddFuelOilOrderRequest,
  AddFuelOilOrderResponse,
  GetLastFuelOilOrdersPresenterInterface,
  GetLastFuelOilOrdersRequest,
  GetLastFuelOilOrdersResponse,
  GetTotalFuelOilOrderPresenterInterface,
  GetTotalFuelOilOrderResponse,
} from '../../../eco/domain';
import { addFuelOilOrder, getLastFuelOilOrder, getTotalFuelOilOrder } from '../../../infrastructure';

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
