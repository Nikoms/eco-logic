import { GetElectricMeters } from '@eco/domain/src/Electricity/UseCase/GetElectricMeters/GetElectricMeters';
import { SaveElectricMeter } from '@eco/domain/src/Electricity/UseCase/SaveElectricMeter/SaveElectricMeter';
import { UpdatePowerConsumption } from '@eco/domain/src/Electricity/UseCase/UpdatePowerConsumption/UpdatePowerConsumption';
import { UpdatePowerConsumptionRequest } from '@eco/domain/src/Electricity/UseCase/UpdatePowerConsumption/UpdatePowerConsumptionRequest';
import { GetElectricMetersPresenterInterface } from '@eco/domain/src/Electricity/UseCase/GetElectricMeters/GetElectricMetersPresenterInterface';
import { SaveElectricMeterPresenterInterface } from '@eco/domain/src/Electricity/UseCase/SaveElectricMeter/SaveElectricMeterPresenterInterface';
import { UpdatePowerConsumptionPresenterInterface } from '@eco/domain/src/Electricity/UseCase/UpdatePowerConsumption/UpdatePowerConsumptionPresenterInterface';
import { SaveElectricMeterRequest } from '@eco/domain/src/Electricity/UseCase/SaveElectricMeter/SaveElectricMeterRequest';

export class ElectricityController {
  constructor(
    private getPresenter: GetElectricMetersPresenterInterface,
    private initPresenter: SaveElectricMeterPresenterInterface,
    private updatePresenter: UpdatePowerConsumptionPresenterInterface,
    private getElectricMeters: GetElectricMeters,
    private initUseCase: SaveElectricMeter,
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
      this.initUseCase.execute(new SaveElectricMeterRequest(meter), this.initPresenter);
    }
  }

  async updatePowerConsumption(request: UpdatePowerConsumptionRequest) {
    return this.updateUseCase.execute(request, this.updatePresenter);
  }
}
