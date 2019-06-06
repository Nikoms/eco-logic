import { GetWaterMetersPresenterInterface } from '@eco/domain/src/Water/UseCase/GetWaterMeters/GetWaterMetersPresenterInterface';
import { Api, api as defaultApi } from '@eco/domain/src/Temp/Api';
import { GetWaterMetersResponse } from '@eco/domain/src/Water/UseCase/GetWaterMeters/GetWaterMetersResponse';

export class GetWaterMeters {
  constructor(private presenter: GetWaterMetersPresenterInterface, private api: Api = defaultApi) {
  }

  async execute() {
    const response = new GetWaterMetersResponse();
    response.meters = await this.api.getWaterMeters();
    this.presenter.presentGetWaterMeters(response);
  }
}
