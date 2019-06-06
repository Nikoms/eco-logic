import { HomeViewModel } from '@eco/domain/src/HouseHeating/UseCase/Home/HomeViewModel';
import { GetLastFuelOilOrdersResponse } from '@eco/domain/src/HouseHeating/UseCase/GetLastFuelOilOrder/GetLastFuelOilOrdersResponse';
import { GetTotalFuelOilOrderResponse } from '@eco/domain/src/HouseHeating/UseCase/GetTotalFuelOilOrder/GetTotalFuelOilOrderResponse';

export interface HomePresenterInterface {
  getHomeViewModel(): HomeViewModel;

  presentGetLastFuelOilOrders(response: GetLastFuelOilOrdersResponse): void;

  presentGetTotalFuelOilOrder(response: GetTotalFuelOilOrderResponse): void;

  showAddFuelOilOrder(): void;
}
