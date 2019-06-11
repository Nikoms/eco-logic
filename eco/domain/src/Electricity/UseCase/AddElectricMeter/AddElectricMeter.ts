import { AddElectricMeterPresenterInterface } from '@eco/domain/src/Electricity/UseCase/AddElectricMeter/AddElectricMeterPresenterInterface';
import { Api } from '@eco/domain/src/Temp/Api';
import { AddElectricMeterResponse } from '@eco/domain/src/Electricity/UseCase/AddElectricMeter/AddElectricMeterResponse';
import { AddElectricMeterRequest } from '@eco/domain/src/Electricity/UseCase/AddElectricMeter/AddElectricMeterRequest';

export class AddElectricMeter {
  constructor(private api: Api) {

  }

  async execute(request: AddElectricMeterRequest, presenter: AddElectricMeterPresenterInterface) {
    const response = new AddElectricMeterResponse(await this.api.addElectricMeter(request.meter));
    presenter.presentAddElectricMeterResponse(response);
  }
}
