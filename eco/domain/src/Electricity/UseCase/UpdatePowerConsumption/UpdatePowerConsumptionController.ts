import { UpdatePowerConsumptionRequest } from '@eco/domain/src/Electricity/UseCase/UpdatePowerConsumption/UpdatePowerConsumptionRequest';
import { UpdatePowerConsumption } from '@eco/domain/src/Electricity/UseCase/UpdatePowerConsumption/UpdatePowerConsumption';

export class UpdatePowerConsumptionController {
  constructor(private updateUseCase: UpdatePowerConsumption) {

  }

  async update(request: UpdatePowerConsumptionRequest) {
    return this.updateUseCase.execute(request);
  }
}
