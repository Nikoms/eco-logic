import { Api } from '@eco/domain/src/Temp/Api';
import { GetElectricMetersPresenterInterface } from '@eco/domain/src/Electricity/UseCase/GetElectricMeters/GetElectricMetersPresenterInterface';
import { GetElectricMetersResponse } from '@eco/domain/src/Electricity/UseCase/GetElectricMeters/GetElectricMetersResponse';

export class GetElectricMeters {
  constructor(private api: Api) {

  }

  async execute(presenter: GetElectricMetersPresenterInterface) {
    const response = new GetElectricMetersResponse();
    response.electricMeters = await this.api.getElectricMeters();
    presenter.presentGetElectricMeters(response);
  }
}
