import { InitWaterMeterRequest } from '@eco/domain/src/Water/UseCase/InitWaterMeter/InitWaterMeterRequest';
import { Api } from '@eco/domain/src/Temp/Api';
import { GetWaterMetersPresenterInterface } from '@eco/domain/src/Water/UseCase/GetWaterMeters/GetWaterMetersPresenterInterface';
import { GetWaterMetersResponse } from '@eco/domain/src/Water/UseCase/GetWaterMeters/GetWaterMetersResponse';

export class InitWaterMeter {
  constructor(private api: Api) {

  }

  async execute(request: InitWaterMeterRequest, presenter: GetWaterMetersPresenterInterface) {
    const response = new GetWaterMetersResponse();
    response.meters = await this.api.initWaterMeter(request.hasColdAndHotMeter);
    presenter.presentGetWaterMeters(response);
  }
}
