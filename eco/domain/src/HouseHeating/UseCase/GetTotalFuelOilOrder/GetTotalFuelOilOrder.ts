import { HomePresenterInterface } from '@eco/domain/src/HouseHeating/UseCase/Home/HomePresenterInterface';
import { Api } from '@eco/domain/src/Temp/Api';
import { GetTotalFuelOilOrderResponse } from '@eco/domain/src/HouseHeating/UseCase/GetTotalFuelOilOrder/GetTotalFuelOilOrderResponse';

export class GetTotalFuelOilOrder {
  constructor(private api: Api) {
  }

  async execute(presenter: HomePresenterInterface) {
    const response = new GetTotalFuelOilOrderResponse();
    response.totalFuelOilOrder = await this.api.getTotalFuelOilOrder();
    presenter.presentGetTotalFuelOilOrder(response);
  }
}
