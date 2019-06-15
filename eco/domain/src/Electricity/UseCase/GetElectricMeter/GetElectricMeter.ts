import { ElectricityMeterRepositoryInterface } from '@eco/domain/src/Electricity/Repository/ElectricityMeterRepositoryInterface';
import { GetElectricMeterPresenterInterface } from '@eco/domain/src/Electricity/UseCase/GetElectricMeter/GetElectricMeterPresenterInterface';
import { GetElectricMeterResponse } from '@eco/domain/src/Electricity/UseCase/GetElectricMeter/GetElectricMeterResponse';
import { GetElectricMeterRequest } from '@eco/domain/src/Electricity/UseCase/GetElectricMeter/GetElectricMeterRequest';

export class GetElectricMeter {
  constructor(private repository: ElectricityMeterRepositoryInterface) {

  }

  async execute(request: GetElectricMeterRequest, presenter: GetElectricMeterPresenterInterface) {
    const response = new GetElectricMeterResponse();
    response.electricMeter = await this.repository.get(request.id);
    presenter.presentGetElectricMeter(response);
  }
}
