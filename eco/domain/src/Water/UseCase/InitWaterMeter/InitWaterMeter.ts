import { InitWaterMeterRequest } from '@eco/domain/src/Water/UseCase/InitWaterMeter/InitWaterMeterRequest';
import { api as defaultApi, Api } from '@eco/domain/src/Temp/Api';
import { GetWaterMetersPresenterInterface } from '@eco/domain/src/Water/UseCase/GetWaterMeters/GetWaterMetersPresenterInterface';
import { GetWaterMetersResponse } from '@eco/domain/src/Water/UseCase/GetWaterMeters/GetWaterMetersResponse';

export class InitWaterMeter {
  constructor(private presenter: GetWaterMetersPresenterInterface, private api: Api = defaultApi) {

  }

  async execute(request: InitWaterMeterRequest) {
    const response = new GetWaterMetersResponse();
    response.meters = await this.api.initWaterMeter(request.hasColdAndHotMeter);
    this.presenter.presentGetWaterMeters(response);
  }
}
