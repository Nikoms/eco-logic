import { UpdatePowerConsumptionRequest } from '@/domain/Electricity/UseCase/UpdatePowerConsumption/UpdatePowerConsumptionRequest';
import { UpdatePowerConsumption } from '@/domain/Electricity/UseCase/UpdatePowerConsumption/UpdatePowerConsumption';

export class UpdatePowerConsumptionController {
  constructor(private updateUseCase: UpdatePowerConsumption) {

  }

  async update(request: UpdatePowerConsumptionRequest) {
    return this.updateUseCase.execute(request);
  }
}
