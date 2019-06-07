import { GetElectricMeters } from '@eco/domain/src/Electricity/UseCase/GetElectricMeters/GetElectricMeters';
import { InitElectricsMeter } from '@eco/domain/src/Electricity/UseCase/InitElectricMeters/InitElectricsMeter';
import { InitElectricMetersRequest } from '@eco/domain/src/Electricity/UseCase/InitElectricMeters/InitElectricMetersRequest';
import { UpdatePowerConsumption } from '@eco/domain/src/Electricity/UseCase/UpdatePowerConsumption/UpdatePowerConsumption';
import { UpdatePowerConsumptionRequest } from '@eco/domain/src/Electricity/UseCase/UpdatePowerConsumption/UpdatePowerConsumptionRequest';

export class ElectricityController {
  constructor(
    private getElectricMeters: GetElectricMeters,
    private initUseCase: InitElectricsMeter,
    private updateUseCase: UpdatePowerConsumption) {
  }

  refreshMeters() {
    this.getElectricMeters.execute();
  }

  initializeMeters(request: InitElectricMetersRequest) {
    this.initUseCase.execute(request);
  }

  async updatePowerConsumption(request: UpdatePowerConsumptionRequest) {
    return this.updateUseCase.execute(request);
  }
}
