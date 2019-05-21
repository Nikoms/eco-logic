import { AddCar } from '@/domain/Traveling/UseCase/AddCar/AddCar';
import { AddCarRequest } from '@/domain/Traveling/UseCase/AddCar/AddCarRequest';

export class AddCarController {
  constructor(private addCarUseCase: AddCar) {
  }

  addCar(request: AddCarRequest) {
    this.addCarUseCase.execute(request);
  }
}
