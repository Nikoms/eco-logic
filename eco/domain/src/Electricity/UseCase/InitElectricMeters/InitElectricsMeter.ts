import { InitElectricMetersRequest } from '@eco/domain/src/Electricity/UseCase/InitElectricMeters/InitElectricMetersRequest';
import { InitElectricMetersPresenterInterface } from '@eco/domain/src/Electricity/UseCase/InitElectricMeters/InitElectricMetersPresenterInterface';
import { api as defaultApi, Api } from '@eco/domain/src/Temp/Api';

export class InitElectricsMeter {
  constructor(private presenter: InitElectricMetersPresenterInterface, private api: Api = defaultApi) {

  }

  async execute(request: InitElectricMetersRequest) {
    const meters = await this.api.initElectricMeter(request.hasDayAndNightMeter);
    this.presenter.electricMetersInitialized(meters);
  }
}
