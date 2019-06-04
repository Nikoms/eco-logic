import { api as defaultApi, Api } from '../../../../../../api/frontend/src/Api';
import { GetElectricMetersPresenterInterface } from '@/domain/Electricity/UseCase/GetElectricMeters/GetElectricMetersPresenterInterface';

export class GetElectricMeters {
  constructor(private presenter: GetElectricMetersPresenterInterface, private api: Api = defaultApi) {

  }

  async execute() {
    const eletricMeters = await this.api.getElectricMeters();
    this.presenter.setElectricMeters(eletricMeters);
  }
}
