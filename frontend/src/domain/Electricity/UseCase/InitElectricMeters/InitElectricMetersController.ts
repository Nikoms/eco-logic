import { InitElectricMetersRequest } from '@/domain/Electricity/UseCase/InitElectricMeters/InitElectricMetersRequest';
import { InitElectricsMeter } from '@/domain/Electricity/UseCase/InitElectricMeters/InitElectricsMeter';

export class InitElectricMetersController {
  constructor(private initUseCase: InitElectricsMeter) {

  }

  init(request: InitElectricMetersRequest) {
    this.initUseCase.execute(request);
  }
}
