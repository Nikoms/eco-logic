import { GetElectricMeters } from '@eco/domain/src/Electricity/UseCase/GetElectricMeters/GetElectricMeters';
import { AddElectricMeter } from '@eco/domain/src/Electricity/UseCase/AddElectricMeter/AddElectricMeter';
import { UpdatePowerConsumption } from '@eco/domain/src/Electricity/UseCase/UpdatePowerConsumption/UpdatePowerConsumption';
import { UpdatePowerConsumptionRequest } from '@eco/domain/src/Electricity/UseCase/UpdatePowerConsumption/UpdatePowerConsumptionRequest';
import { GetElectricMetersPresenterInterface } from '@eco/domain/src/Electricity/UseCase/GetElectricMeters/GetElectricMetersPresenterInterface';
import { AddElectricMeterPresenterInterface } from '@eco/domain/src/Electricity/UseCase/AddElectricMeter/AddElectricMeterPresenterInterface';
import { UpdatePowerConsumptionPresenterInterface } from '@eco/domain/src/Electricity/UseCase/UpdatePowerConsumption/UpdatePowerConsumptionPresenterInterface';
import { AddElectricMeterRequest } from '@eco/domain/src/Electricity/UseCase/AddElectricMeter/AddElectricMeterRequest';

export class ElectricityController {
  constructor(
    private getPresenter: GetElectricMetersPresenterInterface,
    private initPresenter: AddElectricMeterPresenterInterface,
    private updatePresenter: UpdatePowerConsumptionPresenterInterface,
    private getElectricMeters: GetElectricMeters,
    private initUseCase: AddElectricMeter,
    private updateUseCase: UpdatePowerConsumption) {
  }

  refreshMeters() {
    this.getElectricMeters.execute(this.getPresenter);
  }

  initializeMeters(hasDayAndNightMeter: boolean) {
    const meters: string[] = [];
    if (hasDayAndNightMeter) {
      meters.push('Day meter');
      meters.push('Night meter');
    } else {
      meters.push('Electric meter');
    }

    for (const meter of meters) {
      this.initUseCase.execute(new AddElectricMeterRequest(meter), this.initPresenter);
    }
  }

  async updatePowerConsumption(request: UpdatePowerConsumptionRequest) {
    return this.updateUseCase.execute(request, this.updatePresenter);
  }
}
