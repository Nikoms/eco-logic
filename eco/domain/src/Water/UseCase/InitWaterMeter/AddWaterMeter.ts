import { AddWaterMeterRequest } from '@eco/domain/src/Water/UseCase/InitWaterMeter/AddWaterMeterRequest';
import { WaterMeter } from '@eco/core-water/src/entity/WaterMeter';
import { WaterMeterRepositoryInterface } from '@eco/domain/src/Water/UseCase/WaterMeterRepositoryInterface';
import { AddWaterMeterResponse } from '@eco/domain/src/Water/UseCase/InitWaterMeter/AddWaterMeterResponse';
import { AddWaterMeterPresenterInterface } from '@eco/domain/src/Water/UseCase/InitWaterMeter/AddWaterMeterPresenterInterface';

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
