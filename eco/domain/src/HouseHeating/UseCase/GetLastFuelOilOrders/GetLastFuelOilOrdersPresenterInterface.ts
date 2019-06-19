import { GetLastFuelOilOrdersResponse } from '@eco/domain/src/HouseHeating/UseCase/GetLastFuelOilOrders/GetLastFuelOilOrdersResponse';

export interface GetLastFuelOilOrdersPresenterInterface {
  presentGetLastFuelOilOrders(response: GetLastFuelOilOrdersResponse): void;
}
