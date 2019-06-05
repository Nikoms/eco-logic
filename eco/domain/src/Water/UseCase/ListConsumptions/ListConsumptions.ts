import { ListConsumptionsPresenter } from '@eco/domain/src/Water/UseCase/ListConsumptions/ListConsumptionsPresenter';
import { api as defaultApi, Api } from '@eco/domain/src/Temp/Api';

export class ListConsumptions {
  constructor(private presenter: ListConsumptionsPresenter, private api: Api = defaultApi) {
  }

  async execute() {
    const consumptions = await this.api.getAllWaterConsumptions();
    this.presenter.setConsumptions(consumptions);
  }
}
