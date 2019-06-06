import { api as defaultApi, Api } from '@eco/domain/src/Temp/Api';
import { HomePresenterInterface } from '@eco/domain/src/HouseHeating/UseCase/Home/HomePresenterInterface';
import { GetLastFuelOilOrdersResponse } from '@eco/domain/src/HouseHeating/UseCase/GetLastFuelOilOrder/GetLastFuelOilOrdersResponse';

export class GetLastFuelOilOrders {
  constructor(private presenter: HomePresenterInterface, private api: Api = defaultApi) {
  }

  async execute() {
    const response = new GetLastFuelOilOrdersResponse();
    response.lastFuelOilOrders = await this.api.getLastFuelOilOrders();
    this.presenter.presentGetLastFuelOilOrders(response);
  }
}
