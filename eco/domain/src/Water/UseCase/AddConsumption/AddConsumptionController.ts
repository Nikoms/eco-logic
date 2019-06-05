import { AddConsumption } from '@eco/domain/src/Water/UseCase/AddConsumption/AddConsumption';
import { AddConsumptionRequest } from '@eco/domain/src/Water/UseCase/AddConsumption/AddConsumptionRequest';

export class AddConsumptionController {
  constructor(private addConsumptionUseCase: AddConsumption) {

  }

  addConsumption(requests: AddConsumptionRequest[]) {
    this.addConsumptionUseCase.execute(requests);
  }

}
