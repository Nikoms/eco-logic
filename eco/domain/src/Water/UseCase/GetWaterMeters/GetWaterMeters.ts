import { GetWaterMetersPresenterInterface } from '@eco/domain/src/Water/UseCase/GetWaterMeters/GetWaterMetersPresenterInterface';
import { Api } from '@eco/domain/src/Temp/Api';
import { GetWaterMetersResponse } from '@eco/domain/src/Water/UseCase/GetWaterMeters/GetWaterMetersResponse';

export class GetWaterMeters {
  constructor(private api: Api) {
  }

  async execute(presenter: GetWaterMetersPresenterInterface) {
    const response = new GetWaterMetersResponse();
    response.meters = await this.api.getWaterMeters();
    presenter.presentGetWaterMeters(response);
  }
}
