import { ElectricityMeterRepositoryInterface } from '../../Repository/ElectricityMeterRepositoryInterface';
import { UpdatePowerConsumptionPresenterInterface } from './UpdatePowerConsumptionPresenterInterface';
import { UpdatePowerConsumptionRequest } from './UpdatePowerConsumptionRequest';
import { UpdatePowerConsumptionResponse } from './UpdatePowerConsumptionResponse';
import { PowerUpdated } from '../../Event/PowerUpdated';
import { PowerConsumption } from '../../Entity/PowerConsumption';
import { EventDispatcher } from '../../../../shared-kernel';

export class UpdatePowerConsumption {
  constructor(private meterRepository: ElectricityMeterRepositoryInterface,
              private eventDispatcher: EventDispatcher) {

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

    const electricMeter = await this.meterRepository.get(request.electricMeterId);
    if (electricMeter === undefined) {
      hasError = true;
      response.isElectricMeterUnknown = true;
    }

    if (!hasError) {
      const lastKwh = electricMeter!.kWh;
      const fromDate = electricMeter!.lastKWhUpdate;
      electricMeter!.updateKwh(parseFloat(request.kWh), new Date());

      await this.meterRepository.update(electricMeter!);

      const kWhConsumed = electricMeter!.kWh - lastKwh;

      this.eventDispatcher.emit(new PowerUpdated(
        electricMeter!,
        kWhConsumed,
        fromDate,
        electricMeter!.lastKWhUpdate,
      ));

      response.newPowerConsumption = new PowerConsumption(electricMeter!.kWh, electricMeter!.id, electricMeter!.lastKWhUpdate);
    }
    presenter.presentUpdatePowerConsumption(response);
  }
}
