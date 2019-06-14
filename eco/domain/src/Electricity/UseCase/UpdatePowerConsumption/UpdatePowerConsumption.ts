import { UpdatePowerConsumptionRequest } from '@eco/domain/src/Electricity/UseCase/UpdatePowerConsumption/UpdatePowerConsumptionRequest';
import { UpdatePowerConsumptionPresenterInterface } from '@eco/domain/src/Electricity/UseCase/UpdatePowerConsumption/UpdatePowerConsumptionPresenterInterface';
import { UpdatePowerConsumptionResponse } from '@eco/domain/src/Electricity/UseCase/UpdatePowerConsumption/UpdatePowerConsumptionResponse';
import { PowerConsumption } from '@eco/domain/src/Electricity/Entity/PowerConsumption';
import { ElectricityMeterRepositoryInterface } from '@eco/domain/src/Electricity/Repository/ElectricityMeterRepositoryInterface';
import { EventDispatcher } from '@eco/core-shared-kernel/src/event/EventDispatcher';
import { PowerUpdated } from '@eco/domain/src/Electricity/Event/PowerUpdated';

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

      await this.meterRepository.save(electricMeter!);

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
