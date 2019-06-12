import { HomePresenterInterface } from '@eco/domain/src/HouseHeating/UseCase/Home/HomePresenterInterface';
import { GetLastFuelOilOrdersResponse } from '@eco/domain/src/HouseHeating/UseCase/GetLastFuelOilOrder/GetLastFuelOilOrdersResponse';
import { OrderFuelOilRepositoryInterface } from '@eco/domain/src/HouseHeating/OrderFuelOilRepositoryInterface';

export class GetLastFuelOilOrders {
  constructor(private repository: OrderFuelOilRepositoryInterface) {
  }

  async execute(presenter: HomePresenterInterface) {
    const response = new GetLastFuelOilOrdersResponse();
    response.lastFuelOilOrders = await this.repository.getLast();
    presenter.presentGetLastFuelOilOrders(response);
  }
}
