import { GetElectricMeters } from '@eco/domain/src/Electricity/UseCase/GetElectricMeters/GetElectricMeters';

export class HomeController {
  constructor(private initListUseCase: GetElectricMeters) {
  }

  initList() {
    this.initListUseCase.execute();
  }
}
