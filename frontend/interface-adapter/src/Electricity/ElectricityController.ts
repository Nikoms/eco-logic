import {
  GetElectricMeters,
  GetElectricMetersPresenterInterface,
  SaveElectricMeter,
  SaveElectricMeterPresenterInterface,
  SaveElectricMeterRequest,
  UpdatePowerConsumption,
  UpdatePowerConsumptionPresenterInterface,
  UpdatePowerConsumptionRequest,
} from '@eco/domain';

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

  async updatePowerConsumption(electricMeterId: string, kWh: string) {
    const request = new UpdatePowerConsumptionRequest(electricMeterId, kWh);
    return this.updateUseCase.execute(request, this.updatePresenter);
  }
}
