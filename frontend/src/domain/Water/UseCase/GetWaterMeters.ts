import { Api, api } from '../../../../../api/frontend/src/Api';
import { HomePresenter } from '@/domain/Water/UseCase/Home/HomePresenter';

export class GetWaterMeters {
  private api: Api;

  constructor(private presenter: HomePresenter) {
    this.api = api;
  }

  async execute() {
    const meters = await this.api.getWaterMeters();
    this.presenter.setMeters(meters);
  }
}
