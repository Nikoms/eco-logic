import { WaterMeterRepositoryInterface } from '../WaterMeterRepositoryInterface';
import { AddWaterMeterRequest } from './AddWaterMeterRequest';
import { AddWaterMeterPresenterInterface } from './AddWaterMeterPresenterInterface';
import { AddWaterMeterResponse } from './AddWaterMeterResponse';
import { WaterMeter } from '../../Entity/WaterMeter';

export class AddWaterMeter {
  constructor(private repository: WaterMeterRepositoryInterface) {

  }

  async execute(request: AddWaterMeterRequest, presenter: AddWaterMeterPresenterInterface) {
    const response = new AddWaterMeterResponse();
    let hasError = false;
    if (request.name.trim().length === 0) {
      response.isNameInvalid = true;
      hasError = true;
    }
    if (!hasError) {
      const meter = new WaterMeter(await this.repository.nextIdentity(), request.name);
      await this.repository.add(meter);
      response.meter = meter;
    }
    presenter.presentAddWaterMeter(response);
  }
}
