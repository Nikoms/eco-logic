import { GetLastFuelOilOrdersResponse } from '@eco/domain/src/HouseHeating/UseCase/GetLastFuelOilOrders/GetLastFuelOilOrdersResponse';
import { FuelOilOrderRepositoryInterface } from '@eco/domain/src/HouseHeating/FuelOilOrderRepositoryInterface';
import { GetLastFuelOilOrdersRequest } from '@eco/domain/src/HouseHeating/UseCase/GetLastFuelOilOrders/GetLastFuelOilOrdersRequest';
import { GetLastFuelOilOrdersPresenterInterface } from '@eco/domain/src/HouseHeating/UseCase/GetLastFuelOilOrders/GetLastFuelOilOrdersPresenterInterface';

export class GetLastFuelOilOrders {
  constructor(private repository: FuelOilOrderRepositoryInterface) {
  }

  async execute(request: GetLastFuelOilOrdersRequest, presenter: GetLastFuelOilOrdersPresenterInterface) {
    const response = new GetLastFuelOilOrdersResponse();
    response.lastFuelOilOrders = await this.repository.getLast(request.max);
    presenter.presentGetLastFuelOilOrders(response);
  }
}
