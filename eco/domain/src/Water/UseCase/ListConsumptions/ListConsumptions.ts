import { Api } from '@eco/domain/src/Temp/Api';
import { ListConsumptionsPresenterInterface } from '@eco/domain/src/Water/UseCase/ListConsumptions/ListConsumptionsPresenterInterface';
import { ListConsumptionsResponse } from '@eco/domain/src/Water/UseCase/ListConsumptions/ListConsumptionsResponse';

export class ListConsumptions {
  constructor(private api: Api) {
  }

  async execute(presenter: ListConsumptionsPresenterInterface) {
    const response = new ListConsumptionsResponse();
    response.consumptions = await this.api.getAllWaterConsumptions();
    presenter.presentListConsumptionsResponse(response);
  }
}
