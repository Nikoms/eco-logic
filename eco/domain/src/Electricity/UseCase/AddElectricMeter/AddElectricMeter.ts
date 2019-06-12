import { AddElectricMeterPresenterInterface } from '@eco/domain/src/Electricity/UseCase/AddElectricMeter/AddElectricMeterPresenterInterface';
import { AddElectricMeterResponse } from '@eco/domain/src/Electricity/UseCase/AddElectricMeter/AddElectricMeterResponse';
import { AddElectricMeterRequest } from '@eco/domain/src/Electricity/UseCase/AddElectricMeter/AddElectricMeterRequest';
import { ElectricityMeterRepositoryInterface } from '@eco/domain/src/Electricity/Repository/ElectricityMeterRepositoryInterface';
import { ElectricMeter } from '@eco/core-electricity/src/entity/ElectricMeter';

export class AddElectricMeter {
  constructor(private repository: ElectricityMeterRepositoryInterface) {

  }

  async execute(request: AddElectricMeterRequest, presenter: AddElectricMeterPresenterInterface) {
    const meter = new ElectricMeter(await this.repository.nextIdentity(), request.name, 0, new Date());
    await this.repository.add(meter);
    const response = new AddElectricMeterResponse(meter);
    presenter.presentAddElectricMeterResponse(response);
  }
}
