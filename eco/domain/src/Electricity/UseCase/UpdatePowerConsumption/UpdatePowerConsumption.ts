import { UpdatePowerConsumptionRequest } from '@eco/domain/src/Electricity/UseCase/UpdatePowerConsumption/UpdatePowerConsumptionRequest';
import { UpdatePowerConsumptionPresenterInterface } from '@eco/domain/src/Electricity/UseCase/UpdatePowerConsumption/UpdatePowerConsumptionPresenterInterface';
import { UpdatePowerConsumptionResponse } from '@eco/domain/src/Electricity/UseCase/UpdatePowerConsumption/UpdatePowerConsumptionResponse';
import { PowerConsumptionRepositoryInterface } from '@eco/domain/src/Electricity/Repository/PowerConsumptionRepositoryInterface';
import { PowerConsumption } from '@eco/core-electricity/src/entity/PowerConsumption';
import { v4 } from 'uuid';

export class UpdatePowerConsumption {
  constructor(private repository: PowerConsumptionRepositoryInterface) {

  }

  async execute(request: UpdatePowerConsumptionRequest, presenter: UpdatePowerConsumptionPresenterInterface) {
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
      const consumption = new PowerConsumption(v4(), parseFloat(request.kWh), request.electricMeterId, new Date());
      await this.repository.add(consumption);
      response.newPowerConsumption = consumption;
    }
    presenter.presentUpdatePowerConsumption(response);
  }
}
