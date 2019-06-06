import { api as defaultApi, Api } from '@eco/domain/src/Temp/Api';
import { GetElectricMetersPresenterInterface } from '@eco/domain/src/Electricity/UseCase/GetElectricMeters/GetElectricMetersPresenterInterface';
import { GetElectricMetersResponse } from '@eco/domain/src/Electricity/UseCase/GetElectricMeters/GetElectricMetersResponse';

export class GetElectricMeters {
  constructor(private presenter: GetElectricMetersPresenterInterface, private api: Api = defaultApi) {

  }

  async execute() {
    const response = new GetElectricMetersResponse();
    response.electricMeters = await this.api.getElectricMeters();
    this.presenter.presentGetElectricMeters(response);
  }
}
