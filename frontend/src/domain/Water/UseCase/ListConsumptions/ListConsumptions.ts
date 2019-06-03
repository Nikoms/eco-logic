import { api as defaultApi, Api } from '../../../../../../api/frontend/src/Api';
import { ListConsumptionsPresenter } from '@/domain/Water/UseCase/ListConsumptions/ListConsumptionsPresenter';

export class ListConsumptions {
  constructor(private presenter: ListConsumptionsPresenter, private api: Api = defaultApi) {
  }

  async execute() {
    const consumptions = await this.api.getAllWaterConsumptions();
    this.presenter.setConsumptions(consumptions);
  }
}
