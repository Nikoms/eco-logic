import { AddCar } from '@eco/domain/src/Traveling/UseCase/AddCar/AddCar';
import { AddCarRequest } from '@eco/domain/src/Traveling/UseCase/AddCar/AddCarRequest';

export class AddCarController {
  constructor(private addCarUseCase: AddCar) {
  }

  addCar(request: AddCarRequest) {
    this.addCarUseCase.execute(request);
  }
}
