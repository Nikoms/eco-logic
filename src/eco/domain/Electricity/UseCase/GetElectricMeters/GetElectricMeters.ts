import { ElectricityMeterRepositoryInterface } from '../../Repository/ElectricityMeterRepositoryInterface';
import { GetElectricMetersPresenterInterface } from './GetElectricMetersPresenterInterface';
import { GetElectricMetersResponse } from './GetElectricMetersResponse';

export class GetElectricMeters {
  constructor(private repository: ElectricityMeterRepositoryInterface) {

  }

  async execute(presenter: GetElectricMetersPresenterInterface) {
    const response = new GetElectricMetersResponse();
    response.electricMeters = await this.repository.getAll();
    presenter.presentGetElectricMeters(response);
  }
}
