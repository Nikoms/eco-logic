import { HomePresenterInterface } from '@eco/domain/src/HouseHeating/UseCase/Home/HomePresenterInterface';
import { api as defaultApi, Api } from '@eco/domain/src/Temp/Api';

export class GetTotalFuelOilOrder {
  constructor(private presenter: HomePresenterInterface, private api: Api = defaultApi) {
  }

  async execute() {
    this.presenter.setTotalFuelOilOrder(await this.api.getTotalFuelOilOrder());
  }
}
