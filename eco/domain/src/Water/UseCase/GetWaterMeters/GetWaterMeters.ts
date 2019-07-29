import { WaterMeterRepositoryInterface } from '../WaterMeterRepositoryInterface';
import { GetWaterMetersPresenterInterface } from './GetWaterMetersPresenterInterface';
import { GetWaterMetersResponse } from './GetWaterMetersResponse';

export class GetWaterMeters {
  constructor(private repository: WaterMeterRepositoryInterface) {
  }

  async execute(presenter: GetWaterMetersPresenterInterface) {
    const response = new GetWaterMetersResponse();
    response.meters = await this.repository.getAll();
    presenter.presentGetWaterMeters(response);
  }
}
