import { GetElectricMeters } from '@eco/domain/src/Electricity/UseCase/GetElectricMeters/GetElectricMeters';
import { AddElectricMeter } from '@eco/domain/src/Electricity/UseCase/AddElectricMeter/AddElectricMeter';
import { UpdatePowerConsumption } from '@eco/domain/src/Electricity/UseCase/UpdatePowerConsumption/UpdatePowerConsumption';
import { UpdatePowerConsumptionRequest } from '@eco/domain/src/Electricity/UseCase/UpdatePowerConsumption/UpdatePowerConsumptionRequest';
import { GetElectricMetersPresenterInterface } from '@eco/domain/src/Electricity/UseCase/GetElectricMeters/GetElectricMetersPresenterInterface';
import { AddElectricMeterPresenterInterface } from '@eco/domain/src/Electricity/UseCase/AddElectricMeter/AddElectricMeterPresenterInterface';
import { UpdatePowerConsumptionPresenterInterface } from '@eco/domain/src/Electricity/UseCase/UpdatePowerConsumption/UpdatePowerConsumptionPresenterInterface';
import { ElectricMeter } from '@eco/core-electricity/src/entity/ElectricMeter';
import { v4 } from 'uuid';
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
    const meters: ElectricMeter[] = [];
    if (hasDayAndNightMeter) {
      meters.push(new ElectricMeter(v4(), 'Day meter', 0, new Date()));
      meters.push(new ElectricMeter(v4(), 'Night meter', 0, new Date()));
    } else {
      meters.push(new ElectricMeter(v4(), 'Electric meter', 0, new Date()));
    }

    for (const meter of meters) {
      this.initUseCase.execute(new AddElectricMeterRequest(meter), this.initPresenter);
    }
  }

  async updatePowerConsumption(request: UpdatePowerConsumptionRequest) {
    return this.updateUseCase.execute(request, this.updatePresenter);
  }
}
