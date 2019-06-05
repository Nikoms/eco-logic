import { api as defaultApi, Api } from '@eco/domain/src/Temp/Api';
import { GetElectricMetersPresenterInterface } from '@eco/domain/src/Electricity/UseCase/GetElectricMeters/GetElectricMetersPresenterInterface';

export class GetElectricMeters {
  constructor(private presenter: GetElectricMetersPresenterInterface, private api: Api = defaultApi) {

  }

  async execute() {
    const eletricMeters = await this.api.getElectricMeters();
    this.presenter.setElectricMeters(eletricMeters);
  }
}
