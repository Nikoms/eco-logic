import { api as defaultApi, Api } from '@eco/domain/src/Temp/Api';
import { ListConsumptionsPresenterInterface } from '@eco/domain/src/Water/UseCase/ListConsumptions/ListConsumptionsPresenterInterface';
import { ListConsumptionsResponse } from '@eco/domain/src/Water/UseCase/ListConsumptions/ListConsumptionsResponse';

export class ListConsumptions {
  constructor(private presenter: ListConsumptionsPresenterInterface, private api: Api = defaultApi) {
  }

  async execute() {
    const response = new ListConsumptionsResponse();
    response.consumptions = await this.api.getAllWaterConsumptions();
    this.presenter.presentListConsumptionsResponse(response);
  }
}
