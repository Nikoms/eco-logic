import { GetWaterMeterPresenterInterface } from '@eco/domain/src/Water/UseCase/GetWaterMeters/GetWaterMeterPresenterInterface';
import { Api, api as defaultApi } from '@eco/domain/src/Temp/Api';

export class GetWaterMeters {
  constructor(private presenter: GetWaterMeterPresenterInterface, private api: Api = defaultApi) {
  }

  async execute() {
    const meters = await this.api.getWaterMeters();
    this.presenter.setMeters(meters);
  }
}
