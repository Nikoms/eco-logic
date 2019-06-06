import { UpdatePowerConsumptionRequest } from '@eco/domain/src/Electricity/UseCase/UpdatePowerConsumption/UpdatePowerConsumptionRequest';
import { Api, api as defaultApi } from '@eco/domain/src/Temp/Api';
import { UpdatePowerConsumptionPresenterInterface } from '@eco/domain/src/Electricity/UseCase/UpdatePowerConsumption/UpdatePowerConsumptionPresenterInterface';
import { UpdatePowerConsumptionResponse } from '@eco/domain/src/Electricity/UseCase/UpdatePowerConsumption/UpdatePowerConsumptionResponse';

export class UpdatePowerConsumption {
  constructor(private presenter: UpdatePowerConsumptionPresenterInterface, private api: Api = defaultApi) {

  }

  async execute(request: UpdatePowerConsumptionRequest) {
    const response = new UpdatePowerConsumptionResponse();
    let hasError = false;
    if (request.electricMeterId.length === 0) {
      hasError = true;
      response.isElectricMeterUnknown = true;
    }
    if (request.kWh.length === 0) {
      hasError = true;
      response.iskWhEmpty = true;
    }
    if (isNaN(parseFloat(request.kWh))) {
      hasError = true;
      response.isKwhInvalid = true;
    }

    if (!hasError) {
      response.newPowerConsumption = await this.api.addPowerConsumption(parseFloat(request.kWh), request.electricMeterId);
    }
    this.presenter.presentUpdatePowerConsumption(response);
  }
}
