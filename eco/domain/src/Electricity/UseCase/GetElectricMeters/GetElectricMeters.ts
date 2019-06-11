import { GetElectricMetersPresenterInterface } from '@eco/domain/src/Electricity/UseCase/GetElectricMeters/GetElectricMetersPresenterInterface';
import { GetElectricMetersResponse } from '@eco/domain/src/Electricity/UseCase/GetElectricMeters/GetElectricMetersResponse';
import { ElectricityMeterRepositoryInterface } from '@eco/domain/src/Electricity/Repository/ElectricityMeterRepositoryInterface';

export class GetElectricMeters {
  constructor(private repository: ElectricityMeterRepositoryInterface) {

  }

  async execute(presenter: GetElectricMetersPresenterInterface) {
    const response = new GetElectricMetersResponse();
    response.electricMeters = await this.repository.getAll();
    presenter.presentGetElectricMeters(response);
  }
}
