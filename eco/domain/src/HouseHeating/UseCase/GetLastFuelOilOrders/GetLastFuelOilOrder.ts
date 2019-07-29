import { FuelOilOrderRepositoryInterface } from '../../FuelOilOrderRepositoryInterface';
import { GetLastFuelOilOrdersPresenterInterface } from './GetLastFuelOilOrdersPresenterInterface';
import { GetLastFuelOilOrdersRequest } from './GetLastFuelOilOrdersRequest';
import { GetLastFuelOilOrdersResponse } from './GetLastFuelOilOrdersResponse';

export class GetLastFuelOilOrders {
  constructor(private repository: FuelOilOrderRepositoryInterface) {
  }

  async execute(request: GetLastFuelOilOrdersRequest, presenter: GetLastFuelOilOrdersPresenterInterface) {
    const response = new GetLastFuelOilOrdersResponse();
    response.lastFuelOilOrders = await this.repository.getLast(request.max);
    presenter.presentGetLastFuelOilOrders(response);
  }
}
