import { InitElectricMetersRequest } from '@eco/domain/src/Electricity/UseCase/InitElectricMeters/InitElectricMetersRequest';
import { InitElectricMetersPresenterInterface } from '@eco/domain/src/Electricity/UseCase/InitElectricMeters/InitElectricMetersPresenterInterface';
import { Api } from '@eco/domain/src/Temp/Api';
import { InitElectricMetersResponse } from '@eco/domain/src/Electricity/UseCase/InitElectricMeters/InitElectricMetersResponse';

export class InitElectricsMeter {
  constructor(private api: Api) {

  }

  async execute(request: InitElectricMetersRequest, presenter: InitElectricMetersPresenterInterface) {
    const response = new InitElectricMetersResponse();
    response.meters = await this.api.initElectricMeter(request.hasDayAndNightMeter);
    presenter.presentInitElectricMetersResponse(response);
  }
}
