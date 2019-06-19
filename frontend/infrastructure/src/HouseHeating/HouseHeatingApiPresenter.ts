import { GetTotalFuelOilOrderPresenterInterface } from '@eco/domain/src/HouseHeating/UseCase/GetTotalFuelOilOrder/GetTotalFuelOilOrderPresenterInterface';
import { GetLastFuelOilOrdersPresenterInterface } from '@eco/domain/src/HouseHeating/UseCase/GetLastFuelOilOrders/GetLastFuelOilOrdersPresenterInterface';
import { AddFuelOilOrderPresenterInterface } from '@eco/domain/src/HouseHeating/UseCase/AddFuelOilOrder/AddFuelOilOrderPresenterInterface';
import { AddFuelOilOrderResponse } from '@eco/domain/src/HouseHeating/UseCase/AddFuelOilOrder/AddFuelOilOrderResponse';
import { GetLastFuelOilOrdersResponse } from '@eco/domain/src/HouseHeating/UseCase/GetLastFuelOilOrders/GetLastFuelOilOrdersResponse';
import { GetTotalFuelOilOrderResponse } from '@eco/domain/src/HouseHeating/UseCase/GetTotalFuelOilOrder/GetTotalFuelOilOrderResponse';

export class HouseHeatingApiPresenter implements GetTotalFuelOilOrderPresenterInterface,
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
}
