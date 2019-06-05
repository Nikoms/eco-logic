import { InitElectricMetersRequest } from '@eco/domain/src/Electricity/UseCase/InitElectricMeters/InitElectricMetersRequest';
import { InitElectricsMeter } from '@eco/domain/src/Electricity/UseCase/InitElectricMeters/InitElectricsMeter';

export class InitElectricMetersController {
  constructor(private initUseCase: InitElectricsMeter) {

  }

  init(request: InitElectricMetersRequest) {
    this.initUseCase.execute(request);
  }
}
