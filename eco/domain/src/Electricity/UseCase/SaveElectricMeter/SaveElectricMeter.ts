import { SaveElectricMeterPresenterInterface } from '@eco/domain/src/Electricity/UseCase/SaveElectricMeter/SaveElectricMeterPresenterInterface';
import { SaveElectricMeterResponse } from '@eco/domain/src/Electricity/UseCase/SaveElectricMeter/SaveElectricMeterResponse';
import { SaveElectricMeterRequest } from '@eco/domain/src/Electricity/UseCase/SaveElectricMeter/SaveElectricMeterRequest';
import { ElectricityMeterRepositoryInterface } from '@eco/domain/src/Electricity/Repository/ElectricityMeterRepositoryInterface';
import { ElectricMeter } from '@eco/domain/src/Electricity/Entity/ElectricMeter';

export class SaveElectricMeter {
  constructor(private repository: ElectricityMeterRepositoryInterface) {

  }

  async execute(request: SaveElectricMeterRequest, presenter: SaveElectricMeterPresenterInterface) {
    const id = request.id || await this.repository.nextIdentity();
    const meter = new ElectricMeter(id, request.name, 0, new Date());
    await this.repository.save(meter);
    const response = new SaveElectricMeterResponse(meter);
    presenter.presentAddElectricMeterResponse(response);
  }
}
