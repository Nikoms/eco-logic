import { GetWaterMetersPresenterInterface } from '@eco/domain/src/Water/UseCase/GetWaterMeters/GetWaterMetersPresenterInterface';
import { GetWaterMetersResponse } from '@eco/domain/src/Water/UseCase/GetWaterMeters/GetWaterMetersResponse';
import { WaterMeterRepositoryInterface } from '@eco/domain/src/Water/UseCase/WaterMeterRepositoryInterface';

export class GetWaterMeters {
  constructor(private repository: WaterMeterRepositoryInterface) {
  }

  async execute(presenter: GetWaterMetersPresenterInterface) {
    const response = new GetWaterMetersResponse();
    response.meters = await this.repository.getAll();
    presenter.presentGetWaterMeters(response);
  }
}
