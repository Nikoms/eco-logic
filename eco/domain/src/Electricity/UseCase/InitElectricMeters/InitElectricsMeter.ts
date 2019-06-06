import { InitElectricMetersRequest } from '@eco/domain/src/Electricity/UseCase/InitElectricMeters/InitElectricMetersRequest';
import { InitElectricMetersPresenterInterface } from '@eco/domain/src/Electricity/UseCase/InitElectricMeters/InitElectricMetersPresenterInterface';
import { api as defaultApi, Api } from '@eco/domain/src/Temp/Api';
import { InitElectricMetersResponse } from '@eco/domain/src/Electricity/UseCase/InitElectricMeters/InitElectricMetersResponse';

export class InitElectricsMeter {
  constructor(private presenter: InitElectricMetersPresenterInterface, private api: Api = defaultApi) {

  }

  async execute(request: InitElectricMetersRequest) {
    const response = new InitElectricMetersResponse();
    response.meters = await this.api.initElectricMeter(request.hasDayAndNightMeter);
    this.presenter.presentInitElectricMetersResponse(response);
  }
}
