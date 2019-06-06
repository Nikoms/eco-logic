import { HomePresenterInterface } from '@eco/domain/src/HouseHeating/UseCase/Home/HomePresenterInterface';
import { api as defaultApi, Api } from '@eco/domain/src/Temp/Api';
import { GetTotalFuelOilOrderResponse } from '@eco/domain/src/HouseHeating/GetTotalFuelOilOrder/GetTotalFuelOilOrderResponse';

export class GetTotalFuelOilOrder {
  constructor(private presenter: HomePresenterInterface, private api: Api = defaultApi) {
  }

  async execute() {
    const response = new GetTotalFuelOilOrderResponse();
    response.totalFuelOilOrder = await this.api.getTotalFuelOilOrder();
    this.presenter.presentGetTotalFuelOilOrder(response);
  }
}
