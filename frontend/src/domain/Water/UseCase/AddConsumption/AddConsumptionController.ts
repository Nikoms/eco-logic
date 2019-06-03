import { AddConsumption } from '@/domain/Water/UseCase/AddConsumption/AddConsumption';
import { AddConsumptionRequest } from '@/domain/Water/UseCase/AddConsumption/AddConsumptionRequest';

export class AddConsumptionController {
  constructor(private addConsumptionUseCase: AddConsumption) {

  }

  addConsumption(requests: AddConsumptionRequest[]) {
    this.addConsumptionUseCase.execute(requests);
  }

}
