import { AddElectricMeterPresenterInterface } from '@eco/domain/src/Electricity/UseCase/AddElectricMeter/AddElectricMeterPresenterInterface';
import { AddElectricMeterResponse } from '@eco/domain/src/Electricity/UseCase/AddElectricMeter/AddElectricMeterResponse';
import { AddElectricMeterRequest } from '@eco/domain/src/Electricity/UseCase/AddElectricMeter/AddElectricMeterRequest';
import { ElectricityMeterRepositoryInterface } from '@eco/domain/src/Electricity/Repository/ElectricityMeterRepositoryInterface';

export class AddElectricMeter {
  constructor(private repository: ElectricityMeterRepositoryInterface) {

  }

  async execute(request: AddElectricMeterRequest, presenter: AddElectricMeterPresenterInterface) {
    await this.repository.add(request.meter);
    const response = new AddElectricMeterResponse(request.meter);
    presenter.presentAddElectricMeterResponse(response);
  }
}
