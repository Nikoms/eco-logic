import { Api } from '@eco/domain/src/Temp/Api';
import { HomePresenterInterface } from '@eco/domain/src/HouseHeating/UseCase/Home/HomePresenterInterface';
import { GetLastFuelOilOrdersResponse } from '@eco/domain/src/HouseHeating/UseCase/GetLastFuelOilOrder/GetLastFuelOilOrdersResponse';

export class GetLastFuelOilOrders {
  constructor(private api: Api) {
  }

  async execute(presenter: HomePresenterInterface) {
    const response = new GetLastFuelOilOrdersResponse();
    response.lastFuelOilOrders = await this.api.getLastFuelOilOrders();
    presenter.presentGetLastFuelOilOrders(response);
  }
}
