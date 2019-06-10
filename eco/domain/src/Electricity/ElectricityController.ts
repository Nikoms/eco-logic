import { GetElectricMeters } from '@eco/domain/src/Electricity/UseCase/GetElectricMeters/GetElectricMeters';
import { InitElectricsMeter } from '@eco/domain/src/Electricity/UseCase/InitElectricMeters/InitElectricsMeter';
import { InitElectricMetersRequest } from '@eco/domain/src/Electricity/UseCase/InitElectricMeters/InitElectricMetersRequest';
import { UpdatePowerConsumption } from '@eco/domain/src/Electricity/UseCase/UpdatePowerConsumption/UpdatePowerConsumption';
import { UpdatePowerConsumptionRequest } from '@eco/domain/src/Electricity/UseCase/UpdatePowerConsumption/UpdatePowerConsumptionRequest';
import { GetElectricMetersPresenterInterface } from '@eco/domain/src/Electricity/UseCase/GetElectricMeters/GetElectricMetersPresenterInterface';
import { InitElectricMetersPresenterInterface } from '@eco/domain/src/Electricity/UseCase/InitElectricMeters/InitElectricMetersPresenterInterface';
import { UpdatePowerConsumptionPresenterInterface } from '@eco/domain/src/Electricity/UseCase/UpdatePowerConsumption/UpdatePowerConsumptionPresenterInterface';

export class ElectricityController {
  constructor(
    private getPresenter: GetElectricMetersPresenterInterface,
    private initPresenter: InitElectricMetersPresenterInterface,
    private updatePresenter: UpdatePowerConsumptionPresenterInterface,
    private getElectricMeters: GetElectricMeters,
    private initUseCase: InitElectricsMeter,
    private updateUseCase: UpdatePowerConsumption) {
  }

  refreshMeters() {
    this.getElectricMeters.execute(this.getPresenter);
  }

  initializeMeters(request: InitElectricMetersRequest) {
    this.initUseCase.execute(request, this.initPresenter);
  }

  async updatePowerConsumption(request: UpdatePowerConsumptionRequest) {
    return this.updateUseCase.execute(request, this.updatePresenter);
  }
}
