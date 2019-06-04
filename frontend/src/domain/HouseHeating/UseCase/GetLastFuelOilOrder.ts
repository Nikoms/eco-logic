import { api as defaultApi, Api } from '../../../../../api/frontend/src/Api';
import { HomePresenterInterface } from '@/domain/HouseHeating/UseCase/Home/HomePresenterInterface';

export class GetLastFuelOilOrders {
  constructor(private presenter: HomePresenterInterface, private api: Api = defaultApi) {
  }

  async execute(){
    this.presenter.setLastFuelOilOrders(await this.api.getLastFuelOilOrders())
  }
}
