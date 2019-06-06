import { HomeViewModel } from '@eco/domain/src/HouseHeating/UseCase/Home/HomeViewModel';
import { GetLastFuelOilOrdersResponse } from '@eco/domain/src/HouseHeating/UseCase/GetLastFuelOilOrder/GetLastFuelOilOrdersResponse';

export interface HomePresenterInterface {
  getHomeViewModel(): HomeViewModel;

  presentGetLastFuelOilOrders(response: GetLastFuelOilOrdersResponse): void;

  setTotalFuelOilOrder(liter: number): void;

  showAddFuelOilOrder(): void;
}
