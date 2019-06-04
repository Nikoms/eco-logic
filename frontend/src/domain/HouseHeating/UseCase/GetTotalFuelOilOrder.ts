import { HomePresenterInterface } from '@/domain/HouseHeating/UseCase/Home/HomePresenterInterface';
import { api as defaultApi, Api } from '../../../../../api/frontend/src/Api';

export class GetTotalFuelOilOrder {
  constructor(private presenter: HomePresenterInterface, private api: Api = defaultApi) {
  }

  async execute() {
    this.presenter.setTotalFuelOilOrder(await this.api.getTotalFuelOilOrder());
  }
}
