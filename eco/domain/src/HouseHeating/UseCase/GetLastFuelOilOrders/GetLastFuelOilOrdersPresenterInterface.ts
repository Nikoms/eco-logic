import { GetLastFuelOilOrdersResponse } from '@eco/domain/src/HouseHeating/UseCase/GetLastFuelOilOrders/GetLastFuelOilOrdersResponse';
import { GetLastFuelOilOrdersViewModel } from '@eco/domain/src/HouseHeating/UseCase/GetLastFuelOilOrders/GetLastFuelOilOrdersViewModel';

export interface GetLastFuelOilOrdersPresenterInterface {
  getGetLastFuelOilOrdersViewModel(): GetLastFuelOilOrdersViewModel;

  presentGetLastFuelOilOrders(response: GetLastFuelOilOrdersResponse): void;
}
