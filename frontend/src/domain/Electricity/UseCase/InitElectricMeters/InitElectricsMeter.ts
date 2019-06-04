import { InitElectricMetersRequest } from '@/domain/Electricity/UseCase/InitElectricMeters/InitElectricMetersRequest';
import { InitElectricMetersPresenterInterface } from '@/domain/Electricity/UseCase/InitElectricMeters/InitElectricMetersPresenterInterface';
import { api as defaultApi, Api } from '../../../../../../api/frontend/src/Api';

export class InitElectricsMeter {
  constructor(private presenter: InitElectricMetersPresenterInterface, private api: Api = defaultApi) {

  }

  async execute(request: InitElectricMetersRequest) {
    const meters = await this.api.initElectricMeter(request.hasDayAndNightMeter);
    this.presenter.electricMetersInitialized(meters);
  }
}
