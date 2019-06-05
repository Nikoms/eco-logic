import { api as defaultApi, Api } from '@eco/domain/src/Temp/Api';
import { HomePresenterInterface } from '@eco/domain/src/HouseHeating/UseCase/Home/HomePresenterInterface';

export class GetLastFuelOilOrders {
  constructor(private presenter: HomePresenterInterface, private api: Api = defaultApi) {
  }

  async execute(){
    this.presenter.setLastFuelOilOrders(await this.api.getLastFuelOilOrders())
  }
}
