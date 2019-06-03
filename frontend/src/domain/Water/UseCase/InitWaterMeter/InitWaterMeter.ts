import { InitWaterMeterRequest } from '@/domain/Water/UseCase/InitWaterMeter/InitWaterMeterRequest';
import { api as defaultApi, Api } from '../../../../../../api/frontend/src/Api';
import { InitWaterPresenter } from '@/domain/Water/UseCase/InitWaterMeter/InitWaterPresenter';

export class InitWaterMeter {
  constructor(private presenter: InitWaterPresenter, private api: Api = defaultApi) {

  }

  async execute(request: InitWaterMeterRequest) {
    const waterMeters = await this.api.initWaterMeter(request.hasColdAndHotMeter);
    this.presenter.metersInitialized(waterMeters);
  }
}
