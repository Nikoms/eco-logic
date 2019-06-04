import { InitWaterMeterRequest } from '@/domain/Water/UseCase/InitWaterMeter/InitWaterMeterRequest';
import { api as defaultApi, Api } from '../../../../../../api/frontend/src/Api';
import { GetWaterMeterPresenterInterface } from '@/domain/Water/UseCase/GetWaterMeters/GetWaterMeterPresenterInterface';

export class InitWaterMeter {
  constructor(private presenter: GetWaterMeterPresenterInterface, private api: Api = defaultApi) {

  }

  async execute(request: InitWaterMeterRequest) {
    const waterMeters = await this.api.initWaterMeter(request.hasColdAndHotMeter);
    this.presenter.setMeters(waterMeters);
  }
}
