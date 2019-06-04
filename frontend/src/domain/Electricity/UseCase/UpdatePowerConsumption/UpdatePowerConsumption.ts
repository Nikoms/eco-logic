import { UpdatePowerConsumptionRequest } from '@/domain/Electricity/UseCase/UpdatePowerConsumption/UpdatePowerConsumptionRequest';
import { Api, api as defaultApi } from '../../../../../../api/frontend/src/Api';
import { UpdatePowerConsumptionPresenterInterface } from '@/domain/Electricity/UseCase/UpdatePowerConsumption/UpdatePowerConsumptionPresenterInterface';

export class UpdatePowerConsumption {
  constructor(private presenter: UpdatePowerConsumptionPresenterInterface, private api: Api = defaultApi) {

  }

  async execute(request: UpdatePowerConsumptionRequest) {
    if (request.electricMeterId.length === 0) {
      this.presenter.electricMeterIsUnknown();
      return;
    }
    if (request.kWh.length === 0) {
      this.presenter.kWhIsEmpty();
      return;
    }
    if (isNaN(parseFloat(request.kWh))) {
      this.presenter.kWhIsNotAValidNumber();
      return;

    }
    const powerConsumption = await this.api.addPowerConsumption(parseFloat(request.kWh), request.electricMeterId);

    this.presenter.powerConsumptionSaved(powerConsumption);
  }
}
