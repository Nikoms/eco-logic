import { InitWaterMeterRequest } from '@eco/domain/src/Water/UseCase/InitWaterMeter/InitWaterMeterRequest';
import { api as defaultApi, Api } from '@eco/domain/src/Temp/Api';
import { GetWaterMeterPresenterInterface } from '@eco/domain/src/Water/UseCase/GetWaterMeters/GetWaterMeterPresenterInterface';

export class InitWaterMeter {
  constructor(private presenter: GetWaterMeterPresenterInterface, private api: Api = defaultApi) {

  }

  async execute(request: InitWaterMeterRequest) {
    const waterMeters = await this.api.initWaterMeter(request.hasColdAndHotMeter);
    this.presenter.setMeters(waterMeters);
  }
}
