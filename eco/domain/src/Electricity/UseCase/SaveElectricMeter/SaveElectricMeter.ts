import { ElectricityMeterRepositoryInterface } from '../../Repository/ElectricityMeterRepositoryInterface';
import { SaveElectricMeterRequest } from './SaveElectricMeterRequest';
import { SaveElectricMeterPresenterInterface } from './SaveElectricMeterPresenterInterface';
import { ElectricMeter } from '../../Entity/ElectricMeter';
import { SaveElectricMeterResponse } from './SaveElectricMeterResponse';

export class SaveElectricMeter {
  constructor(private repository: ElectricityMeterRepositoryInterface) {

  }

  async execute(request: SaveElectricMeterRequest, presenter: SaveElectricMeterPresenterInterface) {
    const response = new SaveElectricMeterResponse();
    let isValid = false;
    if (!request.name) {
      response.hasValidName = false;
      isValid = false;
    }

    if (isValid) {
      const id = request.id || await this.repository.nextIdentity();
      const meter = new ElectricMeter(id, request.name, 0, new Date());
      await this.repository.add(meter);
      response.meter = meter;
    }

    presenter.presentAddElectricMeterResponse(response);
  }
}
