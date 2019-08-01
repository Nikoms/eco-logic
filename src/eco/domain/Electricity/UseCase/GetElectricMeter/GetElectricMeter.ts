import { ElectricityMeterRepositoryInterface } from '../../Repository/ElectricityMeterRepositoryInterface';
import { GetElectricMeterPresenterInterface } from './GetElectricMeterPresenterInterface';
import { GetElectricMeterRequest } from './GetElectricMeterRequest';
import { GetElectricMeterResponse } from './GetElectricMeterResponse';

export class GetElectricMeter {
  constructor(private repository: ElectricityMeterRepositoryInterface) {

  }

  async execute(request: GetElectricMeterRequest, presenter: GetElectricMeterPresenterInterface) {
    const response = new GetElectricMeterResponse();
    response.electricMeter = await this.repository.get(request.id);
    presenter.presentGetElectricMeter(response);
  }
}
